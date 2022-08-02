import { Flatten, FormState, FieldState, SetFieldValueOptions, ValidationResult } from '@interfaces';
import { FormErrorsException, flattenObject, get, formatObjectPath, buildDefault, reorderArray, set } from '@utils';
import { createStore } from 'solid-js/store';
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
    path: string,
    value: any,
    options: SetFieldValueOptions = { touch: true, dirty: true, validate: true }
  ) => {
    const fieldState = getFieldState(path);

    if (fieldState === undefined) {
      return;
    }

    /**
     * fieldState.__state is undefined when it's a nested object.
     */
    if (fieldState.__state === undefined) {
      const data = get(formData.data, path);
      const promises: Promise<void>[] = [];
      Object.keys(flattenObject(data)).forEach((key) => {
        const finalPath = `${path}.${key}`;
        promises.push(setFieldValue(finalPath, get(value, key), options));
      });
      await Promise.all(promises);
    } else {
      setFieldData(path, value);
      options?.htmlElement && fieldHtmlElement(path, options.htmlElement);
      options?.touch && touchField(path);
      options?.dirty && dirtyField(path);
      options?.validate && (await validateField(path));
    }
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
   * Validates the whole form data. It receives as options:
   * catchError: throws an error exception if form is invalid.
   */
  const validateForm = async (options?: { catchError: boolean }) => {
    return validate({ throwException: options?.catchError });
  };

  /**
   * Validates the whole form data.
   */
  const validate = async (options?: { throwException?: boolean }) => {
    const promises: Promise<void>[] = [];
    Object.keys(flattenObject(formData.data)).forEach((path) => {
      promises.push(validateField(path));
    });

    await Promise.all(promises);

    if (options?.throwException && isFormInvalid()) {
      throw new FormErrorsException(getFormErrors());
    }

    return !isFormInvalid();
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
  const getFieldError = (path: string): string => {
    return findErrorMessages(path).join(', ').replace(/,$/, '').replace(/^,/, '');
  };

  /**
   * Finds the error message if the field is a nested object or a primitive
   */
  const findErrorMessages = (path: string, errorMessages: string[] = []) => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return errorMessages;
    if (fieldState.__state === undefined) {
      Object.keys(fieldState).forEach((key) => {
        errorMessages = findErrorMessages(`${path}.${key}`, errorMessages);
      });
    } else {
      errorMessages.push(fieldState.errorMessage);
    }

    return errorMessages;
  };

  /**
   * Returns a boolean flag to check if the field has an error text.
   */
  const fieldHasError = (path: string) => {
    return Boolean(getFieldError(path));
  };

  /**
   * Gets all the form fields errors
   */
  const getFormErrors = () => {
    const errors: ValidationResult[] = [];

    for (let path in flattenObject(formData.data)) {
      getFieldError(path) && errors.push({ path, errorMessage: getFieldError(path) });
    }

    return errors;
  };

  /**
   * Generates the whole form state object metadata
   */
  const generateFormState = async (options?: { validateFields?: boolean; reset?: boolean }) => {
    const flattenedObject = flattenObject(formData.data);
    const state = Array.isArray(formData.data) ? [] : {};

    Object.keys(flattenedObject).forEach((path) => {
      path = valueIsArrayOfPrimitives(path) ? prevPath(path) : path;
      set(state, path, { ...buildFieldState(path, options?.reset) });
    });

    setFormState('data', state);

    if (options?.validateFields) {
      const promises: Promise<void>[] = [];
      Object.keys(flattenedObject).forEach((path) => {
        path = valueIsArrayOfPrimitives(path) ? prevPath(path) : path;
        promises.push(validateField(path));
      });

      await Promise.all(promises);
    }
  };

  /**
   * Checks if the field value is an array of primitives
   */
  const valueIsArrayOfPrimitives = (path: string) => {
    return Array.isArray(getFieldValue(prevPath(path))) && getFieldValue(path) !== 'object';
  };

  /**
   * Gets field previous path
   */
  const prevPath = (path: string) => {
    const prevPathArr = path.split('.');
    prevPathArr.pop();
    return prevPathArr.join('.');
  };

  /**
   * Initializes a default or existing state of a field.
   */
  const buildFieldState = (path: string, reset: boolean = false) => {
    return {
      __state: true,
      isInvalid: reset ? true : getFieldState(path)?.isInvalid || true,
      errorMessage: reset ? '' : getFieldState(path)?.errorMessage || '',
      initialValue: parseValue(get(formData.data, path)),
      touched: reset ? false : getFieldState(path)?.touched || false,
      dirty: reset ? false : getFieldState(path)?.dirty || false,
    };
  };

  /**
   * Retrieves a boolean flag for the given field path if the field is invalid.
   */
  const isFieldInvalid = (path: string) => {
    return findInvalidFlags(path).includes(true);
  };

  /**
   * Finds the invalid flag if the field is a nested object or a primitive
   */
  const findInvalidFlags = (path: string, invalidFlags: boolean[] = []) => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return invalidFlags;
    if (fieldState.__state === undefined) {
      Object.keys(fieldState).forEach((key) => {
        invalidFlags = findInvalidFlags(`${path}.${key}`, invalidFlags);
      });
    } else {
      invalidFlags.push(fieldState.isInvalid);
    }

    return invalidFlags;
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
  const refreshFormField = async (path: string) => {
    const fieldState = getFieldState(path);
    await setFieldValue(path, get(formData.data, path), { validate: true });
    fieldState?.touched === false && setFieldState(path, { ...fieldState, errorMessage: '' });
  };

  /**
   * Fills the state of the form.
   */
  const fillForm = async (data: Partial<T>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (data === undefined) return;
        setFormData('data', data as T);
        await generateFormState({ validateFields: data ? true : false });
        resolve(undefined);
      });
    });
  };

  /**
   * Returns the state of an specific form field
   */
  const getFieldState = (path: string) => {
    return get<FieldState | undefined>(formState.data, path);
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
   * Stores the html element at form state
   */
  const fieldHtmlElement = (path: string, htmlElement: HTMLElement) => {
    setFieldState(path, (fieldState: FieldState) => ({ ...fieldState, htmlElement }));
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
    const fieldState = getFieldState(path);

    if (fieldState === undefined) return;

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
    for (let key in flattenObject(formData.data)) {
      const fieldState = getFieldState(key);
      if (fieldState && fieldState.dirty) {
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
    generateFormState({ reset: true });
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
      validateFields && validateField(path);
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
   * Moves the fieldset position inside the formData store.
   */
  const moveFieldset = (oldIndex?: number, newIndex?: number, basePath?: string) => {
    if (oldIndex === undefined || newIndex === undefined) return;
    setFieldData(
      basePath,
      reorderArray(get<Flatten<T>[]>(formData, basePath ? `data.${basePath}` : 'data'), oldIndex, newIndex)
    );
    moveFieldsetState(oldIndex, newIndex, basePath);
  };

  /**
   * Moves the fieldset state position inside the formState store
   */
  const moveFieldsetState = (oldIndex?: number, newIndex?: number, basePath?: string) => {
    if (oldIndex === undefined || newIndex === undefined) return;
    setFieldState(
      basePath,
      reorderArray(get<FormState[]>(formState, basePath ? `data.${basePath}` : 'data'), oldIndex, newIndex)
    );
  };

  /**
   * Generates the form state metadata before the component is mounted.
   */
  generateFormState();

  return {
    addFieldset,
    fillForm,
    fieldHasError,
    formHasChanges,
    getFieldError,
    getFieldValue,
    formData: getFormData,
    getFormErrors,
    getFormState,
    isFieldInvalid,
    isFormInvalid,
    moveFieldset,
    refreshFormField,
    removeFieldset,
    resetForm,
    setFieldValue,
    validateField,
    validateForm,
    _: {
      addFieldsetState,
      buildFieldState,
      dirtyField,
      findInvalidFlags,
      findErrorMessages,
      generateFormState,
      getFieldState,
      isFieldFromSchema,
      moveFieldsetState,
      parseValue,
      removeFieldsetState,
      setFieldData,
      setFieldState,
      touchField,
      validate,
    },
  };
};
