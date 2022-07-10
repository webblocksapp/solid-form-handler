import { Flatten, FormState, FieldState, SetFieldValueOptions, ValidationResult } from '@interfaces';
import { FormErrorsException, flattenObject, get, formatObjectPath, buildDefault, reorderArray, set } from '@utils';
import { createStore, reconcile } from 'solid-js/store';
import { SchemaOf, ValidationError, reach } from 'yup';

/**
 * Creates a reactive formHandler object that simplifies forms manipulation.
 * It uses as parameter a yup schema.
 */
export const useFormHandler = <T>(yupSchema: SchemaOf<T>) => {
  const [formData, setFormData] = createStore<{ data: T }>({ data: buildDefault(yupSchema) as T });
  const [formState, setFormState] = createStore<{ data: FormState | FormState[] }>({
    data: buildDefault(yupSchema),
  });

  /**
   * Sets the field value inside the form data store.
   */
  const setFieldData = <T>(path: string = '', value: T) => {
    path = path ? `data.${path}` : 'data';
    setFormData(...(formatObjectPath(path).split('.') as []), value);
  };

  /**
   * Sets the field value inside the formData store,
   * updates the field state at formState store and
   * validates the field.
   */
  const setFieldValue = async (
    path: string = '',
    value: any,
    options: SetFieldValueOptions = { touch: true, dirty: true, validate: true }
  ) => {
    if (!path) {
      return;
    }

    setFieldData(path, value);
    options?.touch && touchField(path);
    options?.dirty && dirtyField(path);
    options?.validate && (await validateField(path));
  };

  /**
   * Sets the field state inside the formState store.
   */
  const setFieldState = <T>(path: string = '', value: T) => {
    path = path ? `data.${path}` : 'data';
    setFormState(...(formatObjectPath(path).split('.') as []), value);
  };

  /**
   * Validates a single field of the form.
   */
  const validateField = async (path: string) => {
    if (!isFieldFromSchema(path)) return;

    try {
      await yupSchema.validateAt(path, formData.data);
      setFieldState(path, (fieldState: FieldState) => ({
        ...fieldState,
        isInvalid: false,
        errorMessage: '',
      }));
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.message;
        setFieldState(path, (fieldState: FieldState) => ({
          ...fieldState,
          isInvalid: true,
          errorMessage: message,
        }));
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
    Object.keys(flattenObject(formData.data)).forEach((path) => {
      promises.push(validateField(path));
    });

    await Promise.all(promises);

    if (options?.throwException && isFormInvalid()) {
      throw new FormErrorsException(getFormErrors());
    }
  };

  /**
   * Gets the field value from formData store.
   */
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
   * Gets the form state object.
   */
  const getFormState = () => {
    return formState.data;
  };

  /**
   * Extracts the error message from the fieldState according to the given path.
   */
  const getFieldError = (path: string = ''): string => {
    return getFieldState(path)?.errorMessage || '';
  };

  /**
   * Gets all the form fields errors
   */
  const getFormErrors = () => {
    const errors: ValidationResult[] = [];

    for (let path in formState) {
      getFieldError(path) && errors.push({ path, errorMessage: getFieldError(path) });
    }

    return errors;
  };

  /**
   * Sets the default state of a form field.
   * By default the field is initialized as invalid.
   * You can pass an HTMLElement captured from the DOM.
   */
  const setFormField = async (path: string = '', value: any, field?: HTMLElement) => {
    if (!path || !isFieldFromSchema(path)) return;

    setFieldData(path, parseValue(value));
    const isInvalid = await checkIsFieldInvalid(path);

    setFieldState(path, (fieldState: FieldState) => ({
      ...buildFieldState(path),
      field: field ?? fieldState?.field,
      isInvalid,
    }));
  };

  /**
   * Generates the whole form state object metadata
   */
  const generateFormState = (validateFields: boolean = false) => {
    const flattenedObject = flattenObject(formData.data);
    const state = Array.isArray(formData.data) ? [] : {};

    Object.keys(flattenedObject).forEach((path) => {
      set(state, path, { ...buildFieldState(path) });
    });

    setFormState('data', reconcile(state));

    if (validateFields) {
      Object.keys(flattenedObject).forEach((path) => {
        setFieldIsInvalidState(path);
      });
    }
  };

  /**
   * Initializes a default or existing state of a field.
   */
  const buildFieldState = (path: string) => {
    return {
      isInvalid: getFieldState(path)?.isInvalid || true,
      errorMessage: getFieldState(path)?.errorMessage || '',
      initialValue: parseValue(get(formData.data, path)),
      touched: getFieldState(path)?.touched || false,
      dirty: getFieldState(path)?.dirty || false,
    };
  };

  /**
   * Updates only the isInvalid state of a field
   * by triggering a yup validation.
   */
  const setFieldIsInvalidState = (path: string) => {
    checkIsFieldInvalid(path).then((isInvalid) => {
      setFieldState(path, (fieldState: FieldState) => ({
        ...fieldState,
        isInvalid,
      }));
    });
  };

  /**
   * Check if the field is valid or invalid by
   * running yup schema validateAt method and returns a boolean flag.
   */
  const checkIsFieldInvalid = async (path: string) => {
    let isInvalid = false;

    try {
      await yupSchema.validateAt(path, formData.data);
    } catch (_) {
      isInvalid = true;
    }

    return isInvalid;
  };

  /**
   * Retrieves a boolean flag for the given field path if the field contains an error.
   */
  const fieldHasError = (path: string) => {
    return Boolean(getFieldError(path));
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
      generateFormState(data ? true : false);
    });
  };

  /**
   * Returns the state of an specific form field
   */
  const getFieldState = (path: string) => {
    return get<FieldState>(formState.data, path);
  };

  /**
   * Checks on all the fields if there is an invalidated field.
   * If yes the form is invalid.
   */
  const isFormInvalid = () => {
    for (let key in flattenObject(formData.data)) {
      if (getFieldState(key)?.isInvalid) {
        return true;
      }
    }

    return false;
  };

  /**
   * Marks a field as touched when the user interacted with it.
   */
  const touchField = (path: string) => {
    setFieldState(path, (fieldState: FieldState) => ({ ...fieldState, touched: true }));
  };

  /**
   * Marks a field as dirty if initial value is different from current value.
   */
  const dirtyField = (path: string) => {
    setFieldState(path, (fieldState: FieldState) => {
      if (JSON.stringify(get(formData.data, path)) !== JSON.stringify(fieldState.initialValue)) {
        return { ...fieldState, dirty: true };
      }

      return { ...fieldState, dirty: false };
    });
  };

  /**
   * Checks if the form has changes when is found a dirty field.
   */
  const formHasChanges = () => {
    for (let key in flattenObject(formState.data)) {
      if (getFieldState(key).dirty) {
        return true;
      }
    }

    return false;
  };

  /**
   * Resets the form data
   */
  const resetForm = () => {
    setFormData('data', buildDefault(yupSchema) as T);
    generateFormState();
  };

  /**
   * Adds a fieldset.
   * Use path for adding a fieldset inside a nested array from an object.
   */
  const addFieldset = <K>(options?: { data?: Partial<K>; basePath?: string }) => {
    const builtPath = options?.basePath || String(get<Flatten<T>[]>(formData, 'data').length);
    let defaultData = Array.isArray(buildDefault(yupSchema)) ? buildDefault(yupSchema)[0] : buildDefault(yupSchema);
    defaultData = options?.data || defaultData;
    setFieldData(builtPath, parseValue(defaultData));
    addFieldsetState(builtPath, defaultData, options?.data ? true : false);
  };

  /**
   * Initializes the fieldset state at formState store.
   */
  const addFieldsetState = (basePath: string, defaultData: any, validateFields: boolean = false) => {
    const flattenedObject = flattenObject(defaultData);
    setFieldState(basePath, {});
    Object.keys(flattenedObject).forEach((key) => {
      const path = `${basePath}.${key}`;
      setFieldState(path, { ...buildFieldState(path), initialValue: flattenedObject[key] });
      validateFields && setFieldIsInvalidState(path);
    });
  };

  /**
   * Remove fieldset
   * Use path for removing a fieldset inside a nested array from an object.
   */
  const removeFieldset = (index: number, basePath?: string) => {
    setFieldData(basePath, (items: Flatten<T>[]) => items.filter((_, i) => i !== index));
    removeFieldsetState(index, basePath);
  };

  /**
   * Remove fieldset state
   * Use path for removing a fieldset inside a nested array from an object.
   */
  const removeFieldsetState = (index: number, basePath?: string) => {
    setFieldState(basePath, (items: FormState[]) => items.filter((_, i) => i !== index));
  };

  /**
   * Moves the fieldset position inside the formData array.
   */
  const moveFieldset = (oldIndex?: number, newIndex?: number, basePath?: string) => {
    if (oldIndex === undefined || newIndex === undefined) return;
    setFieldData(
      basePath,
      reorderArray(get<Flatten<T>[]>(formData, basePath ? `data.${basePath}` : 'data'), oldIndex, newIndex)
    );
    generateFormState();
  };

  /**
   * Generates the form state metadata before the component is mounted.
   */
  generateFormState();

  return {
    addFieldset,
    fillForm,
    formData: getFormData,
    formHasChanges,
    getFieldError,
    getFieldValue,
    getFormErrors,
    getFormState,
    fieldHasError,
    isFormInvalid,
    moveFieldset,
    refreshFormField,
    removeFieldset,
    removeFieldsetState,
    resetForm,
    setFieldValue,
    setFormField,
    validateField,
    validateForm,
  };
};
