import {
  Flatten,
  FormState,
  FieldState,
  SetFieldValueOptions,
  ValidationSchema,
  FormFieldError,
  FormHandlerOptions,
  ValidateFieldOptions,
  CommonObject,
} from '@interfaces';
import {
  buildFieldStatePath,
  buildFormStatePaths,
  createStore,
  equals,
  objectPaths,
  FormErrorsException,
  get,
  isNumber,
  reorderArray,
  set,
  ValidationError,
} from '@utils';
import { createSignal, createUniqueId, untrack } from 'solid-js';

/**
 * Creates a reactive formHandler object that simplifies forms manipulation.
 * It uses as parameter a validation schema.
 */
export const useFormHandler = <T = any>(validationSchema: ValidationSchema<T>, options?: FormHandlerOptions) => {
  /**
   * Form handler main states.
   */
  const formHandlerOptions = { delay: 0, ...options };
  const [formData, setFormData] = createStore<{ data: T }>({ data: validationSchema.buildDefault() });
  const [formState, setFormState] = createStore<{ data: FormState | FormState[] }>({
    data: validationSchema.buildDefault(),
  });
  const [formIsResetting, setFormIsResetting] = createSignal<boolean>(false);
  const [formIsFilling, setFormIsFilling] = createSignal<boolean>(false);
  const [formIsValidating, setFormIsValidating] = createSignal<boolean>(false);

  /**
   * Sets the field value inside the form data store.
   */
  const setFieldData = (path: string = '', value: any, options?: { mapValue?: (value: any) => any }) => {
    options = { mapValue: (value) => value, ...options };
    value = options?.mapValue?.(parseValue(path, value));
    path = path ? `data.${path}` : 'data';
    setFormData(path, value);
  };

  /**
   * Sets the default field value which will be used
   * when it's initialized or reset. No validation is triggered.
   */
  const setFieldDefaultValue = (path: string = '', defaultValue: any, options?: { mapValue?: (value: any) => any }) => {
    untrack(() => {
      if (!path || defaultValue === undefined || formIsFilling() || formIsResetting()) return;

      //Avoids to overwrite filled data with default data
      const fieldState = getFieldState(path);
      if (fieldState === undefined) return;

      options = { mapValue: (value) => value, ...options };

      /**
       * If the field currently has data, it's prioritized, otherwise,
       * default value is set as initial field data.
       */
      const currentValue = computeDefaultValue(getFieldValue(path), defaultValue);
      setFieldData(path, currentValue, { mapValue: options?.mapValue });

      /**
       * Stores the default value at field state. Which will be used as new
       * default value when form is reset.
       */
      setFieldState(path, {
        ...fieldState,
        currentValue: options?.mapValue?.(parseValue(path, currentValue)),
        initialValue: defaultValue,
        defaultValue: defaultValue,
      });
    });
  };

  /**
   * Computes the default value according to the given scenarios.
   */
  const computeDefaultValue = (currentValue: any, defaultValue: any) => {
    if (Array.isArray(defaultValue) && Array.isArray(currentValue) && defaultValue.length && !currentValue.length) {
      return defaultValue;
    } else if (currentValue === false && defaultValue === undefined) {
      return currentValue;
    } else if (defaultValue === undefined) {
      return currentValue;
    } else {
      return currentValue || defaultValue;
    }
  };

  /**
   * Sets the field value inside the formData store,
   * updates the field state at formState store and
   * validates the field.
   */
  const setFieldValue = async (path: string = '', value: any, options?: SetFieldValueOptions) => {
    const fieldState = getFieldState(path);
    options = { touch: true, dirty: true, validate: true, mapValue: (value) => value, ...options };

    if (fieldState === undefined) return;

    setFieldData(path, value, { mapValue: options.mapValue });
    setFieldState(path, (fieldState: FieldState) => ({
      ...fieldState,
      currentValue: options?.mapValue?.(parseValue(path, value)),
    }));

    const promises = Promise.all([options?.validate && validateField(path, options)]);

    options?.htmlElement && fieldHtmlElement(path, options.htmlElement);
    options?.dirty && dirtyField(path);
    options?.touch && touchField(path);

    return promises;
  };

  /**
   * Checks if the event types matches the given from form handler options.
   */
  const hasEventTypes = (eventTypes: string[] = []) => {
    if (formHandlerOptions.validateOn === undefined) return true;
    return formHandlerOptions.validateOn.some((item) => eventTypes.includes(item));
  };

  /**
   * Sets the field state inside the formState store.
   */
  const setFieldState = (path: string = '', value: any) => {
    path = path ? `data.${buildFieldStatePath(path)}` : 'data';
    setFormState(path, value);
  };

  /**
   * Aborts the validation if the field cached value is
   * equals to current value. Cached value is the prev value,
   * which is rewritten with the current when this function is run.
   */
  const abortValidation = (path: string = '') => {
    const fieldState = getFieldState(path);

    if (fieldState === undefined) return;

    const currentValue = getFieldValue(path);
    const result = equals(fieldState?.cachedValue, currentValue);

    setFieldState(path, (fieldState: FieldState) => ({ ...fieldState, cachedValue: currentValue }));
    return result;
  };

  /**
   * Method for setting fields validations that depends on the current field validation.
   */
  const setFieldTriggers = async (path: string = '', paths: string[] = []) => {
    return new Promise((resolve) => {
      //Timeout required for dynamic fieldsets.
      setTimeout(async () => {
        const fieldState = getFieldState(path);
        if (fieldState === undefined) return;
        setFieldState(path, (fieldState: FieldState) => ({ ...fieldState, triggers: paths }));
        resolve(undefined);
      });
    });
  };

  /**
   * Method for getting field dependant validations.
   */
  const getFieldTriggers = (path: string = '') => {
    return (path && getFieldState(path)?.triggers) || [];
  };

  /**
   * Runs the field dependant validations.
   */
  const runFieldTriggers = async (path: string = '') => {
    const triggers = getFieldTriggers(path);
    const promises: Promise<void>[] = [];

    triggers.forEach((trigger) =>
      promises.push(
        validateField(trigger, {
          force: true,
          delay: 0,
          omitTriggers: true,
          silentValidation: !isFieldTouched(trigger),
        })
      )
    );

    await Promise.all(promises);
  };

  /**
   * Sets the unique validation id.
   */
  const setValidationId = (path: string = '', id: string) => {
    path &&
      setFieldState(path, (fieldState: FieldState) => ({
        ...fieldState,
        validationId: id,
      }));
  };

  /**
   * Gets the unique validation id to abort current running validation if it's re-triggered.
   */
  const getValidationId = (path: string = '') => {
    if (!path) return;
    return getFieldState(path)?.validationId;
  };

  /**
   * Validates a single field of the form.
   */
  const validateField = async (path: string = '', options?: ValidateFieldOptions) => {
    const fieldState = getFieldState(path);

    if (fieldState === undefined) return;

    let validationId = createUniqueId();

    options = {
      ...options,
      silentValidation: options?.silentValidation || formHandlerOptions.silentValidation,
      validateOn: options?.validateOn || formHandlerOptions.validateOn,
      delay: options?.delay ?? formHandlerOptions.delay,
    };

    if (!validationSchema.isFieldFromSchema(path) || !path) return;
    if (options?.force !== true && !hasEventTypes(options?.validateOn)) return;
    if (options?.force !== true && abortValidation(path)) return;

    await new Promise((resolve) => {
      setValidationId(path, validationId);
      setTimeout(resolve, options?.delay) as unknown as number;
    });

    if (getValidationId(path) !== validationId) return;

    /**
     * Field is invalidated before is validated again, specially for
     * async validations that can take time.
     */
    setFieldState(path, (fieldState: FieldState) => ({
      ...fieldState,
      isInvalid: true,
      validating: true,
    }));

    try {
      await Promise.all([
        validationSchema.validateAt(path, formData.data),
        options?.omitTriggers !== true && runFieldTriggers(path),
      ]);

      setFieldState(path, (fieldState: FieldState) => ({
        ...fieldState,
        isInvalid: false,
        validating: false,
        errorMessage: '',
      }));
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorMessage = options?.silentValidation ? '' : error.message;

        setFieldState(path, (fieldState: FieldState) => ({
          ...fieldState,
          isInvalid: true,
          validating: false,
          errorMessage,
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
  const validateForm = async () => {
    setFormIsValidating(true);
    await validate({ throwException: true, force: true, delay: 0 });
    setFormIsValidating(false);
  };

  /**
   * Validates the whole form data.
   */
  const validate = async (options?: { throwException?: boolean; force?: boolean; delay?: 0 }) => {
    const promises: Promise<void>[] = [];

    //Form data is not flattened but the whole data tree will be iterated recursively by validateField.
    Object.keys(formData.data as CommonObject).forEach((path) => {
      promises.push(validateField(path, { force: options?.force, delay: options?.delay, omitTriggers: true }));
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
  const getFieldValue = (path: string = '', mapValue = (value: any) => value) => {
    return path && mapValue(get(formData.data, path));
  };

  /**
   * Gets the field value from formData store.
   */
  const getFieldDefaultValue = (path: string = '') => {
    const fieldState = getFieldState(path);
    return fieldState?.defaultValue;
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
    const fieldState = getFieldState(path);
    return (fieldState?.errorMessage || '').replace(/,\s$/, '').replace(/^,\s/, '');
  };

  /**
   * Returns a boolean flag to check if the field has an error text.
   */
  const fieldHasError = (path: string = '') => {
    return Boolean(getFieldError(path));
  };

  /**
   * Gets all the form fields errors
   */
  const getFormErrors = () => {
    const errors: FormFieldError[] = [];

    for (let path in objectPaths(formData.data)) {
      getFieldError(path) && errors.push({ path, errorMessage: getFieldError(path) });
    }

    return errors;
  };

  /**
   * Generates the whole form state object metadata
   */
  const generateFormState = async (options?: { reset?: boolean; fill?: boolean; silentValidation?: boolean }) => {
    const { formStatePaths, paths } = buildFormStatePaths(formData.data);
    const state = Array.isArray(formData.data) ? [] : {};

    formStatePaths.forEach((formStatePath) => {
      const path = formStatePath.replace(/(\.state|\.children)/gi, '');
      const fieldState = getFieldState(path);
      const defaultValue = parseValue(path, fieldState?.defaultValue);

      set(state, formStatePath, {
        ...buildFieldState(path, { reset: options?.reset, fill: options?.fill }),
      });

      /**
       * When form reset, field data is updated with pre-configured default value.
       */
      options?.reset && defaultValue !== undefined && setFieldData(path, defaultValue);
    });

    setFormState('data', state);

    const promises: Promise<void>[] = [];
    paths.forEach((path) => {
      promises.push(
        validateField(path, {
          silentValidation: options?.silentValidation ?? true,
          force: true,
          delay: 0,
          omitTriggers: true,
        })
      );
    });

    await Promise.all(promises);
  };

  /**
   * Initializes a default or existing state of a field.
   */
  const buildFieldState = (path: string, options?: { reset?: boolean; fill?: boolean }) => {
    const fieldState = getFieldState(path);
    const value = getFieldValue(path);
    options = { reset: false, ...options };

    return {
      ...fieldState,
      dataType: validationSchema.getFieldDataType(path),
      isInvalid: options.reset ? true : fieldState?.isInvalid || true,
      errorMessage: options.reset ? '' : fieldState?.errorMessage || '',
      cachedValue: undefined,
      currentValue: options.reset ? fieldState?.defaultValue : value,
      defaultValue: options.reset || options?.fill ? fieldState?.defaultValue : value,
      initialValue: options.fill ? value : fieldState?.defaultValue ?? value,
      touched: options.reset ? false : fieldState?.touched || false,
      dirty: options.reset ? false : fieldState?.dirty || false,
      triggers: fieldState?.triggers,
      validating: false,
    };
  };

  /**
   * Retrieves a boolean flag for the given field path to check if it's invalid.
   */
  const isFieldInvalid = (path: string) => {
    const fieldState = getFieldState(path);
    return fieldState?.isInvalid || false;
  };

  /**
   * Retrieves a boolean flag for the given field path to check if it's interacted.
   */
  const isFieldTouched = (path: string) => {
    return path && getFieldState(path)?.touched;
  };

  /**
   * Parses the value according to the scenario
   */
  const parseValue = (path: string, value: any) => {
    const fieldState = getFieldState(path);

    if (fieldState?.dataType === 'number' && isNumber(value)) {
      return Number(value);
    } else if (value === undefined) {
      return '';
    } else {
      return value;
    }
  };

  /**
   * Refresh the form field initial state
   */
  const refreshFormField = async (path: string = '') => {
    if (formIsFilling() || formIsResetting()) return;

    const fieldState = getFieldState(path);
    await setFieldValue(path, get(formData.data, path), {
      validate: true,
      touch: fieldState?.touched,
      forceValidate: true,
      delay: 0,
    });
    fieldState?.touched === false && setFieldState(path, { ...fieldState, errorMessage: '' });
  };

  /**
   * Fills the state of the form.
   */
  const fillForm = async (data: T, options?: { silentValidation?: boolean }): Promise<void> => {
    setFormIsFilling(true);
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (data === undefined) return;
        setFormData('data', data);
        await generateFormState({ fill: true, silentValidation: options?.silentValidation });
        setFormIsFilling(false);
        resolve(undefined);
      });
    });
  };

  /**
   * Returns the state of an specific form field
   */
  const getFieldState = (path: string = '') => {
    if (!path) return undefined;

    const fieldState = get<FieldState | undefined>(formState.data, buildFieldStatePath(path));
    return typeof fieldState === 'object' ? fieldState : undefined;
  };

  /**
   * Returns a boolean flag when the form field is being validated.
   */
  const isFieldValidating = (path: string = '') => {
    return getFieldState(path)?.validating;
  };

  /**
   * Checks on all the fields if there is an invalidated field.
   * If yes the form is invalid.
   */
  const isFormInvalid = () => {
    for (let key in objectPaths(formData.data)) {
      if (isFieldInvalid(key)) {
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
  const touchField = (path: string = '') => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return;
    setFieldState(path, (fieldState: FieldState) => ({ ...fieldState, touched: true }));
  };

  /**
   * Marks a field as dirty if initial value is different from current value.
   */
  const dirtyField = (path: string) => {
    const fieldState = getFieldState(path);

    if (fieldState === undefined) return;

    setFieldState(path, (fieldState: FieldState) => {
      if (!equals(fieldState.currentValue, fieldState.initialValue)) {
        return { ...fieldState, dirty: true };
      }

      return { ...fieldState, dirty: false };
    });
  };

  /**
   * Checks if the form has changes when is found a dirty field.
   */
  const formHasChanges = () => {
    for (let key in objectPaths(formData.data)) {
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
  const resetForm = async () => {
    setFormIsResetting(true);
    setFormData('data', validationSchema.buildDefault());
    await generateFormState({ reset: true });
    setFormIsResetting(false);
  };

  /**
   * Adds a fieldset.
   * Use path for adding a fieldset inside a nested array from an object.
   */
  const addFieldset = (options?: { basePath?: string }) => {
    let defaultData: Array<any> = options?.basePath
      ? get(validationSchema.buildDefault(), options.basePath)
      : validationSchema.buildDefault();
    const length = options?.basePath
      ? get<any[]>(formData.data, options.basePath).length
      : (formData.data as unknown as any[]).length;
    const builtPath = options?.basePath ? `${options?.basePath}.${length}` : `${length}`;
    const data = defaultData[0];

    addFieldsetState(builtPath, data);
    setFieldData(builtPath, data);
  };

  /**
   * Initializes the fieldset state at formState store.
   */
  const addFieldsetState = (basePath: string, defaultData: any) => {
    const paths = objectPaths(defaultData);
    paths.forEach((key) => {
      const path = `${basePath}.${key}`;
      setFieldState(path, { ...buildFieldState(path), defaultValue: get(defaultData, key) });
    });
  };

  /**
   * Remove fieldset
   * Use path for removing a fieldset inside a nested array from an object.
   */
  const removeFieldset = (index: number, basePath?: string) => {
    removeFieldsetState(index, basePath);
    setFieldData(basePath, (items: Flatten<T>[]) => items.filter((_, i) => i !== index));
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
    formIsFilling,
    formIsResetting,
    formIsValidating,
    getFieldError,
    getFieldDefaultValue,
    getFieldValue,
    formData: getFormData,
    getFormErrors,
    getFormState,
    isFieldInvalid,
    isFieldValidating,
    isFormInvalid,
    moveFieldset,
    refreshFormField,
    removeFieldset,
    resetForm,
    setFieldTriggers,
    setFieldValue,
    setFieldDefaultValue,
    touchField,
    validateField,
    validateForm,
    _: {
      addFieldsetState,
      buildFieldState,
      dirtyField,
      generateFormState,
      getFieldState,
      hasEventTypes,
      moveFieldsetState,
      parseValue,
      removeFieldsetState,
      setFieldData,
      setFieldState,
      validate,
    },
  };
};
