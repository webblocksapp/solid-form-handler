import { CommonObject, FormField, SetFieldValueOptions, ValidationResult } from '@interfaces';
import { FormErrorsException, flattenObject, get, removeBrackets } from '@utils';
import { createStore } from 'solid-js/store';
import { SchemaOf, ValidationError } from 'yup';

export const useFormHandler = <T extends CommonObject>(yupSchema: SchemaOf<T>) => {
  const [formData, setFormData] = createStore<CommonObject>({});
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
    return removeBrackets(path).split('.') as [];
  };

  /**
   * Validates a single field of the form.
   */
  const validateField = async (path: string) => {
    try {
      await yupSchema.validateAt(path, formData);
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
    return parseValue(get(formData, path));
  };

  /**
   * Gets the form data object.
   */
  const getFormData = () => {
    return formData as T;
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
    if (!path) return;

    setFormData(...buildFormDataPath(path), parseValue(value));

    let isInvalid = false;

    try {
      await yupSchema.validateAt(path, formData);
    } catch (_) {
      isInvalid = true;
    }

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
    setFormField(path, formData[path]);
  };

  /**
   * Fills the default state of the form.
   */
  const fillForm = (defaultData: Partial<T>, options: { validate?: boolean } = { validate: true }) => {
    const data = { ...defaultData } as T;
    setFormData(data);

    Object.keys(flattenObject(data)).forEach((path) => {
      setFormField(path, parseValue(get(data, path)));
    });

    options?.validate && validate();
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
      if (JSON.stringify(formData[path]) !== JSON.stringify(field.initialValue)) {
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
    fillForm(yupSchema.getDefaultFromShape() as T, { validate: false });
  };

  /**
   * Form is filled before mounted.
   */
  fillForm(yupSchema.getDefaultFromShape() as T, { validate: false });

  return {
    fillForm,
    formHasChanges,
    getFieldError,
    getFieldValue,
    getFormData,
    getFormErrors,
    getFormFields,
    isFormInvalid,
    refreshFormField,
    resetForm,
    setFieldValue,
    setFormField,
    validateField,
    validateForm,
  };
};
