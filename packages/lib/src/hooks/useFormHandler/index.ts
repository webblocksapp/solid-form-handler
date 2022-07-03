import { CommonObject, Flatten, FormField, SetFieldValueOptions, ValidationResult } from '@interfaces';
import { FormErrorsException, flattenObject, get, formatObjectPath, buildDefault, reorderArray } from '@utils';
import { createStore, reconcile } from 'solid-js/store';
import { SchemaOf, ValidationError, reach } from 'yup';

/**
 * Creates a reactive formHandler object that simplifies forms manipulation.
 * It uses as parameter a yup schema.
 */
export const useFormHandler = <T>(yupSchema: SchemaOf<T>) => {
  const [formData, setFormData] = createStore<{ data: T }>({ data: buildDefault(yupSchema) as T });
  const [formFields, setFormFields] = createStore<{ [x: string]: FormField }>({});

  /**
   * Sets an specific field value of the form data according to the given path.
   */
  const setFieldValue = async (
    path: string = '',
    value: any,
    options: SetFieldValueOptions = { touch: true, dirty: true, validate: true }
  ) => {
    if (!path) {
      return;
    }

    setFormData(...buildFormDataPath(path), value);
    options?.touch && touchField(path);
    options?.dirty && dirtyField(path);
    options?.validate && (await validateField(path));
  };

  /**
   * Converts the field path into an array for getting or setting a value
   * at formData store.
   */
  const buildFormDataPath = (path: string) => {
    return formatObjectPath(`data.${path}`).split('.') as [];
  };

  /**
   * Validates a single field of the form.
   */
  const validateField = async (path: string) => {
    if (!isFieldFromSchema(path)) return;

    try {
      await yupSchema.validateAt(path, formData.data);
      setFormFields(path, (formField) => ({ ...formField, isInvalid: false, errorMessage: '' }));
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.message;
        setFormFields(path, (formField) => ({ ...formField, isInvalid: true, errorMessage: message }));
      } else {
        console.error(error);
      }
    }
  };

  /**
   * Validates the whole form data throwing an error exception
   */
  const validateForm = async () => {
    await validate({ throwException: true });
  };

  /**
   * Validates the whole form data.
   */
  const validate = async (options?: { throwException: boolean }) => {
    const promises: Promise<void>[] = [];
    Object.keys(formFields).forEach((path) => {
      promises.push(validateField(path));
    });

    await Promise.all(promises);

    if (options?.throwException && isFormInvalid()) {
      throw new FormErrorsException(getFormErrors());
    }
  };

  const getFieldValue = (path: string = '') => {
    if (!path) return '';
    return parseValue(get(formData.data, path));
  };

  /**
   * Gets the form data object.
   */
  const getFormData = (): T => {
    return formData.data;
  };

  /**
   * Gets the form fields object.
   */
  const getFormFields = () => {
    return formFields;
  };

  /**
   * Extracts the error message from the formField according to the given path.
   */
  const getFieldError = (path: string = ''): string => {
    return formFields[path]?.errorMessage || '';
  };

  /**
   * Gets all the form fields errors
   */
  const getFormErrors = () => {
    const errors: ValidationResult[] = [];

    for (let path in formFields) {
      if (formFields[path].errorMessage) errors.push({ path, errorMessage: formFields[path].errorMessage });
    }

    return errors;
  };

  /**
   * Sets the default state of a field.
   * By default the field is initialized as invalid.
   */
  const setFormField = async (path: string = '', value: any, field?: HTMLElement) => {
    if (!path || !isFieldFromSchema(path)) return;

    setFormData(...buildFormDataPath(path), parseValue(value));
    const isInvalid = await isFormFieldInvalid(path);

    setFormFields(path, (formField) => ({
      ...formField,
      isInvalid,
      errorMessage: '',
      field: field ?? formField?.field,
      initialValue: parseValue(value),
      touched: false,
      dirty: false,
    }));
  };

  /**
   * Generates the whole form fields object metadata
   */
  const generateFormFields = async () => {
    const obj: CommonObject = {};
    const flattenedObject = flattenObject(formData.data);
    const promises: Promise<boolean>[] = [];
    Object.keys(flattenedObject).forEach((path) => {
      promises.push(isFormFieldInvalid(path));
    });

    const validationFlags = await Promise.all(promises);

    Object.keys(flattenedObject).forEach((path, i) => {
      obj[path] = {
        isInvalid: validationFlags[i],
        errorMessage: '',
        initialValue: parseValue(get(formData.data, path)),
        touched: false,
        dirty: false,
      };
    });

    setFormFields(reconcile(obj));
  };

  /**
   * Returns a boolean value to check if the field is valid or invalid
   */
  const isFormFieldInvalid = async (path: string) => {
    let isInvalid = false;

    try {
      await yupSchema.validateAt(path, formData.data);
    } catch (_) {
      isInvalid = true;
    }

    return isInvalid;
  };

  /**
   * Checks if the field is part of the given yup schema.
   * Fields that are not part of the schema are considered as metadata
   * and doesn't require validation. e.g. id, timestamp, foreignId, etc...
   */
  const isFieldFromSchema = (path: string) => {
    let isFromSchema = true;
    try {
      reach(yupSchema, path);
    } catch (_) {
      isFromSchema = false;
    }
    return isFromSchema;
  };

  /**
   * Parses the value according to the scenario
   */
  const parseValue = (value: any) => {
    if (value === undefined) {
      return '';
    } else {
      return value;
    }
  };

  /**
   * Refresh the form field initial state
   */
  const refreshFormField = (path: string) => {
    setFormField(path, get(formData.data, path));
  };

  /**
   * Fills the state of the form.
   */
  const fillForm = (data: Partial<T>) => {
    setTimeout(() => {
      if (data === undefined) return;
      setFormData('data', data as T);
      generateFormFields();
    });
  };

  /**
   * Checks on all the fields if there is an invalidated field.
   * If yes the form is invalid.
   */
  const isFormInvalid = () => {
    for (let key in formFields) {
      if (formFields[key].isInvalid) {
        return true;
      }
    }

    return false;
  };

  /**
   * Marks a field as touched when the user interacted with it.
   */
  const touchField = (path: string) => {
    setFormFields(path, (field) => ({ ...field, touched: true }));
  };

  /**
   * Marks a field as dirty if initial value is different from current value.
   */
  const dirtyField = (path: string) => {
    setFormFields(path, (field) => {
      if (JSON.stringify(get(formData.data, path)) !== JSON.stringify(field.initialValue)) {
        return { ...field, dirty: true };
      }

      return { ...field, dirty: false };
    });
  };

  /**
   * Checks if the form has changes when is found a dirty field.
   */
  const formHasChanges = () => {
    for (let key in formFields) {
      if (formFields[key].dirty) {
        return true;
      }
    }

    return false;
  };

  /**
   * Resets the form data
   */
  const resetForm = () => {
    fillForm(buildDefault(yupSchema) as T);
  };

  /**
   * Adds a fieldset.
   * Use path for adding a fieldset inside a nested array from an object.
   */
  const addFieldset = <K>(options?: { data?: Partial<K>; path?: string }) => {
    const builtPath = buildFormDataPath(options?.path || String((formData.data as unknown as Flatten<T>[]).length));
    const defaultData = Array.isArray(buildDefault(yupSchema)) ? buildDefault(yupSchema)[0] : buildDefault(yupSchema);
    setFormData(...builtPath, options?.data || defaultData);
    generateFormFields();
  };

  /**
   * Remove fieldset
   * Use path for removing a fieldset inside a nested array from an object.
   */
  const removeFieldset = (index: number, path?: string) => {
    const builtPath = path ? buildFormDataPath(path) : (['data'] as unknown as []);
    setFormData(...builtPath, (items) => (items as any).filter((_: any, i: number) => i !== index));
    generateFormFields();
  };

  /**
   * Moves the fieldset position inside the formData array.
   */
  const moveFieldset = (oldIndex?: number, newIndex?: number) => {
    if (oldIndex === undefined || newIndex === undefined) return;
    setFormData('data', reorderArray(formData.data as unknown as Flatten<T>[], oldIndex, newIndex) as unknown as T);
    generateFormFields();
  };

  /**
   * Generates the form fields metadata before the component is mounted.
   */
  generateFormFields();

  return {
    addFieldset,
    fillForm,
    formHasChanges,
    getFieldError,
    getFieldValue,
    getFormData,
    getFormErrors,
    getFormFields,
    isFormInvalid,
    moveFieldset,
    refreshFormField,
    removeFieldset,
    resetForm,
    setFieldValue,
    setFormField,
    validateField,
    validateForm,
  };
};
