import {
  ENDS_WITH_DOT_STATE_OR_DOT_CHILDREN_REGEXP,
  IS_ROOT_KEY_DOT_STATE_REGEXP,
  MATCHES_CHILDREN_KEY_REGEXP,
  ROOT_KEY,
  STARTS_WITH_ROOT_KEY_DOT_CHILDREN_REGEXP,
  STATE_KEY,
} from '@constants';
import {
  Flatten,
  FormState,
  FieldState,
  SetFieldValueOptions,
  ValidationSchema,
  FormHandlerOptions,
  ValidateFieldOptions,
  FormStateUpdateBehavior,
  ErrorMap,
  ValidateFieldBehavior,
  SetFieldDefaultValueOptions,
} from '@interfaces';
import {
  buildFieldStatePath,
  buildFieldStatePaths,
  createStore,
  equals,
  objectPaths,
  FormErrorsException,
  get,
  isNumber,
  reorderArray,
  set,
  ValidationError,
  clone,
  buildFieldChildrenPath,
  isEmpty,
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
  const formHandlerOptions = { ...options };
  const [formData, setFormData] = createStore<{ data: T }>({ data: validationSchema.buildDefault() });
  const [formState, setFormState] = createStore<{ data: FormState }>({
    data: {},
  });
  const [formIsResetting, setFormIsResetting] = createSignal<boolean>(false);
  const [formIsFilling, setFormIsFilling] = createSignal<boolean>(false);
  const [formIsValidating, setFormIsValidating] = createSignal<boolean>(false);

  /**
   * Sets the field value inside the form data store.
   */
  const setFieldData = (path: string = '', value: any, options?: { mapValue?: (value: any) => any }) => {
    if (path === ROOT_KEY) return;
    options = { mapValue: (value) => value, ...options };
    value = options?.mapValue?.(parseValue(path, value));
    path = path ? `data.${path}` : 'data';
    setFormData(path, value);
  };

  /**
   * Sets the default field value which will be used
   * when it's initialized or reset. No validation is triggered.
   */
  const setFieldDefaultValue = async (
    path: string = '',
    defaultValue: any,
    options?: SetFieldDefaultValueOptions,
    _?: FormStateUpdateBehavior
  ) => {
    await untrack(async () => {
      if (!path || defaultValue === undefined || formIsFilling() || formIsResetting()) return;

      //Avoids to overwrite filled data with default data
      const fieldState = getFieldState(path);
      if (fieldState === undefined) return;

      options = { mapValue: (value) => value, ...options };

      /**
       * If the field currently has data, it's prioritized, otherwise,
       * default value is set as initial field data.
       */
      let currentValue = getFieldValue(path);
      defaultValue = options?.mapValue?.(parseValue(path, defaultValue)) || defaultValue;

      if (isEmpty(currentValue)) {
        setFieldData(path, defaultValue, { mapValue: options?.mapValue });
        currentValue = defaultValue;
      }

      /**
       * Stores the default value at field state. Which will be used as new
       * default value when form is reset.
       */
      setInitialValue(path, defaultValue);
      setDefaultValue(path, defaultValue);

      const promises = [
        options.validate && validateField(path, options),
        _?.updateParent !== false && setParentFieldDefaultValue(path, defaultValue, options),
        _?.updateChild !== false && setChildFieldDefaultValue(path, defaultValue, options),
      ];

      return Promise.all(promises);
    });
  };

  /**
   * For nested fields, updates the parent default value upside the tree. For example:
   * If this path is given: key1.key2.key3, this function updates key1.key2 and key1 value recursively.
   */
  const setParentFieldDefaultValue = async (
    path: string = '',
    value: any,
    options?: SetFieldDefaultValueOptions,
    _?: FormStateUpdateBehavior
  ) => {
    const parentField = getParentField(path);
    if (parentField === undefined) return;

    delete options?.mapValue;
    let { parentPath, currentPath, parentDefaultValue } = parentField;
    parentDefaultValue = set(clone(parentDefaultValue), currentPath, parseValue(path, value));

    await setFieldDefaultValue(
      parentPath,
      parentDefaultValue,
      { ...options, silentValidation: true },
      {
        ..._,
        updateParent: true,
        updateChild: false,
      }
    );
  };

  /**
   * For a field with children, updates the default value downside the tree. For example:
   * If this path is given: key1, and this contains nested paths key1.key2 and key1.key2.key3, values
   * are updated recursively.
   */
  const setChildFieldDefaultValue = async (
    path: string = '',
    value: any,
    options?: SetFieldDefaultValueOptions,
    _?: FormStateUpdateBehavior
  ) => {
    const fieldChildren = getFieldChildren(path);
    if (fieldChildren === undefined) return;

    delete options?.mapValue;
    const children = buildChildrenValues(path, value);
    const promises: Array<Promise<void>> = [];

    children.forEach((child) => {
      promises.push(
        setFieldDefaultValue(child.path, child.value, options, {
          ..._,
          updateParent: false,
          updateChild: true,
        })
      );
    });

    return Promise.all(promises);
  };

  /**
   * Sets the field value inside the formData store,
   * updates the field state at formState store and
   * validates the field.
   */
  const setFieldValue = async (
    path: string = '',
    value: any,
    options?: SetFieldValueOptions,
    _?: FormStateUpdateBehavior
  ): Promise<any> => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return;

    options = { touch: true, dirty: true, validate: true, mapValue: (value) => value, ...options };
    setFieldData(path, value, { mapValue: options.mapValue });

    const promises = Promise.all([
      options?.validate && validateField(path, { ...options, force: options?.forceValidate }, _?.validateFieldBehavior),
      _?.updateParent !== false && setParentFieldValue(path, options),
      _?.updateChild !== false && setChildFieldValue(path, value, options),
    ]);

    options?.htmlElement && fieldHtmlElement(path, options.htmlElement);
    options?.dirty && dirtyField(path);
    options?.touch && touchField(path);

    return promises;
  };

  /**
   * For nested fields, updates the parent value upside the tree. For example:
   * If this path is given: key1.key2.key3, this function updates key1.key2 and key1 value recursively.
   */
  const setParentFieldValue = async (
    path: string = '',
    options?: SetFieldValueOptions,
    _?: FormStateUpdateBehavior
  ) => {
    const parentField = getParentField(path);
    if (parentField === undefined) return;

    delete options?.mapValue;
    let { parentPath, parentValue } = parentField;

    return setFieldValue(
      parentPath,
      parentValue,
      { ...options, silentValidation: true, touch: false },
      {
        ..._,
        updateParent: true,
        updateChild: false,
        validateFieldBehavior: { recursive: false },
      }
    );
  };

  /**
   * Helper function for getting the parent field.
   */
  const getParentField = (path: string = '') => {
    const arrPath = path.split('.');
    if (path === ROOT_KEY) return;
    /**
     * If the path matches the following scenarios:
     * key1 --> ${ROOT_KEY}.key1
     * 0 --> ${ROOT_KEY}.0
     * The root key is unshift for updating the root state.
     */
    if (arrPath.length <= 1) arrPath.unshift(ROOT_KEY);

    const lastKey = arrPath.pop() as string;
    const [prevLastKey] = arrPath.slice(-1);
    let currentPath = lastKey;

    if (isNumber(prevLastKey)) {
      arrPath.pop();
      currentPath = `${prevLastKey}.${lastKey}`;
    }

    const parentPath = arrPath.join('.');
    const parentValue = getFieldValue(parentPath);
    const parentDefaultValue = getFieldDefaultValue(parentPath);

    return { parentPath, currentPath, parentValue, parentDefaultValue };
  };

  /**
   * For a field with children, updates the value downside the tree. For example:
   * If this path is given: key1, and this contains nested paths key1.key2 and key1.key2.key3, values
   * are updated recursively.
   */
  const setChildFieldValue = async (
    path: string = '',
    value: any,
    options?: SetFieldValueOptions,
    _?: FormStateUpdateBehavior
  ) => {
    const fieldChildren = getFieldChildren(path);
    if (fieldChildren === undefined) return;

    delete options?.mapValue;
    const promises: Promise<any>[] = [];
    const children = buildChildrenValues(path, value);

    children.forEach((child) => {
      const forceValidate = child.value === undefined && true;

      /**
       * Cached value is passed to child to avoid revalidation - The parent object assumes the whole child validation,
       * so children doesn't need to be re-validated (granular validation).
       */
      setCurrentValue(child.path, parseValue(child.path, child.value));

      promises.push(
        setFieldValue(
          child.path,
          child.value,
          { ...options, touch: false, forceValidate },
          {
            ..._,
            updateParent: false,
            updateChild: true,
          }
        )
      );
    });

    return Promise.all(promises);
  };

  /**
   * Helper function for building the children fields path and value.
   */
  const buildChildrenValues = (path: string, value: any) => {
    const data: Array<{ path: string; value: any }> = [];
    const fieldChildren = getFieldChildren(path);
    if (fieldChildren === undefined) return [];

    Object.keys(fieldChildren).forEach((key) => {
      const keys = [];

      if (Array.isArray(fieldChildren)) {
        Object.keys(fieldChildren[key as unknown as number]).forEach((childKey) => {
          keys.push(`${key}.${childKey}`);
        });
      } else {
        keys.push(key);
      }

      keys.forEach((key) => {
        data.push({
          path: `${path}.${key}`,
          value: typeof value === 'object' ? get(value, key) : value,
        });
      });
    });

    return data;
  };

  /**
   * Checks if the event types matches the given from form handler options.
   */
  const hasEventTypes = (eventTypes: string[] = []) => {
    if (formHandlerOptions.validateOn === undefined) return true;
    return formHandlerOptions.validateOn.some((item) => eventTypes.includes(item));
  };

  /**
   * Sets the field state inside the formState store for matching paths .state
   */
  const setFieldState = (path: string = '', value: Partial<FieldState>) => {
    const fieldStatePath = buildFieldStatePath(path);
    if (fieldStatePath === undefined) return;
    path = `data.${fieldStatePath}`;
    setFormState(path, (prev: FieldState) => ({ ...prev, ...value }));
  };

  /**
   * Sets the field state inside the formState store for matching paths .children
   */
  const setFieldChildren = (path: string = '', value: ((items: FormState[]) => FormState[]) | FormState[]) => {
    const fieldChildrenPath = buildFieldChildrenPath(path);
    if (fieldChildrenPath === undefined) return;
    path = `data.${fieldChildrenPath}`;
    setFormState(path, value);
  };

  /**
   * Aborts the validation if the field state current value is
   * equals to the form data value.
   */
  const abortValidation = (path: string = '') => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return;

    const currentValue = getFieldValue(path);
    const result = equals(fieldState?.currentValue, currentValue);
    setCurrentValue(path, currentValue);
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
        setFieldState(path, { triggers: paths });
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
    setFieldState(path, {
      validationId: id,
    });
  };

  /**
   * Sets the field state default value.
   */
  const setDefaultValue = (path: string = '', value: any) => {
    const fieldStatePath = buildFieldStatePath(path);
    fieldStatePath && setFormState(`data.${fieldStatePath}.defaultValue`, clone(value));
  };

  /**
   * Sets the field state current value.
   */
  const setCurrentValue = (path: string = '', value: any) => {
    const fieldStatePath = buildFieldStatePath(path);
    fieldStatePath && setFormState(`data.${fieldStatePath}.currentValue`, clone(value));
  };

  /**
   * Sets the field state initial value.
   */
  const setInitialValue = (path: string = '', value: any) => {
    const fieldStatePath = buildFieldStatePath(path);
    fieldStatePath && setFormState(`data.${fieldStatePath}.initialValue`, clone(value));
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
  const validateField = async (path: string = '', options?: ValidateFieldOptions, _?: ValidateFieldBehavior) => {
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

    await new Promise((resolve) => {
      setValidationId(path, validationId);
      setTimeout(resolve, options?.delay) as unknown as number;
    });

    if (options?.force !== true && getValidationId(path) !== validationId) return;
    if (options?.force !== true && abortValidation(path)) return;
    if (_?.fill === true) setCurrentValue(path, getFieldValue(path));

    /**
     * Field is invalidated before is validated again, specially for
     * async validations that can take time.
     */
    setFieldAsInvalid(path, { validating: true });

    const recursive = _?.recursive;
    const validationOptions = recursive ? { abortEarly: false, recursive } : undefined;
    //The path parameter is used as base path for nested keys.
    const paths = recursive ? objectPaths(get(formData.data, path)).map((item) => `${path}.${item}`) : [];
    paths.unshift(path);

    try {
      await Promise.all([
        validationSchema.validateAt(path, formData.data, validationOptions),
        options?.omitTriggers !== true && runFieldTriggers(path),
      ]);

      paths.forEach((key) => {
        setFieldAsValid(key);
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: ErrorMap = [...error.children, { path, message: error.message }];
        const pathsWithError = errors.map((item) => item.path);

        //Extracts the paths without error to mark children fields as valid.
        const pathsWithoutError = paths.filter((item) => !pathsWithError.includes(item));
        pathsWithoutError.forEach((key) => {
          setFieldAsValid(key);
        });

        //Applies the invalid flag and error message to invalid fields.
        errors.forEach((error) => {
          setFieldAsInvalid(error.path, {
            validating: false,
            errorMessage: options?.silentValidation ? '' : error.message,
          });
        });

        if (options.throwException) throw errors;
      } else {
        console.error(error);
      }
    }
  };

  /**
   * Sets field state values which defines it as invalid.
   */
  const setFieldAsInvalid = (path: string, options: { errorMessage?: string; validating?: boolean }) => {
    setFieldState(path, {
      ...options,
      isInvalid: true,
    });
  };

  /**
   * Sets field state values which defines it as valid.
   */
  const setFieldAsValid = (path: string) => {
    setFieldState(path, {
      isInvalid: false,
      validating: false,
      errorMessage: '',
    });
  };

  /**
   * Validates the whole form data. It receives as options:
   * catchError: throws an error exception if form is invalid.
   */
  const validateForm = async () => {
    try {
      setFormIsValidating(true);
      await validateField(ROOT_KEY, { force: true, omitTriggers: true, throwException: true }, { recursive: true });
    } catch (error) {
      throw new FormErrorsException(error as ErrorMap);
    } finally {
      setFormIsValidating(false);
    }
  };

  /**
   * Gets the field value from formData store.
   */
  const getFieldValue = (path: string = '', mapValue = (value: any) => value) => {
    if (!path) return;
    //If path matches the reserved key ROOT_KEY, it's because the whole form data is an array.
    if (path === ROOT_KEY) return formData.data;
    return mapValue(get(formData.data, path));
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
    const errors: ErrorMap = [];

    for (let path of objectPaths(formData.data)) {
      getFieldError(path) && errors.push({ path, message: getFieldError(path) });
    }

    return errors;
  };

  /**
   * Generates the whole form state object metadata
   */
  const generateFormState = async (options?: { reset?: boolean; fill?: boolean; silentValidation?: boolean }) => {
    const { fieldStatePaths, paths } = buildFieldStatePaths(formData.data);
    const state = {};

    fieldStatePaths.forEach((fieldStatePath) => {
      const path = fieldStatePath.replace(ENDS_WITH_DOT_STATE_OR_DOT_CHILDREN_REGEXP, '');
      const builtFieldState = buildFieldState(path, { reset: options?.reset, fill: options?.fill });
      set(state, fieldStatePath, builtFieldState);
    });

    setFormState('data', state);

    const promises: Promise<void>[] = [];

    paths.forEach((path) => {
      promises.push(
        validateField(
          path,
          {
            silentValidation: options?.silentValidation ?? true,
            force: true,
            delay: 0,
            omitTriggers: true,
          },
          { recursive: false, fill: options?.fill }
        )
      );
    });

    await Promise.all(promises);
  };

  /**
   * Returns a boolean flag if the path matches the root state key.
   */
  const isRootStatePath = (path: string) => path === `${ROOT_KEY}.${STATE_KEY}`;

  /**
   * Initializes a default or existing state of a field.
   */
  const buildFieldState = (statePath: string, options?: { reset?: boolean; fill?: boolean }) => {
    const fieldPath = statePath
      .replace(STARTS_WITH_ROOT_KEY_DOT_CHILDREN_REGEXP, '')
      .replace(IS_ROOT_KEY_DOT_STATE_REGEXP, ROOT_KEY)
      .replace(MATCHES_CHILDREN_KEY_REGEXP, '');

    const fieldState = getFieldState(fieldPath);

    /**
     * When form reset, field data is updated with pre-configured default value.
     */
    if (options?.reset && fieldState?.defaultValue !== undefined) {
      setFieldData(fieldPath, fieldState?.defaultValue);
    }

    /**
     * The library checks if the path is the root state key for creating the root
     * for storing the state of the whole form data structure.
     */
    const value = isRootStatePath(statePath) ? formData.data : getFieldValue(fieldPath);
    options = { reset: false, ...options };

    return {
      ...fieldState,
      dataType: validationSchema.getFieldDataType(fieldPath),
      isInvalid: options.reset ? true : fieldState?.isInvalid || true,
      errorMessage: options.reset ? '' : fieldState?.errorMessage || '',
      currentValue: undefined,
      defaultValue: options.reset || options?.fill ? clone(fieldState?.defaultValue) : clone(value),
      initialValue: options.fill ? clone(value) : clone(fieldState?.defaultValue) ?? clone(value),
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
    return findInvalidFlags(path).includes(true) ? true : false;
  };

  /**
   * Recursively iterates the field and its children to determine if it's invalid.
   */
  const findInvalidFlags = (path: string, flags: Array<boolean> = []) => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return flags;
    const fieldChildren = getFieldChildren(path);
    flags.push(fieldState?.isInvalid || false);

    if (fieldChildren) {
      Object.keys(fieldChildren).forEach((childPath) => {
        const builtPath = path === ROOT_KEY ? childPath : `${path}.${childPath}`;
        findInvalidFlags(`${builtPath}`, flags);
      });
    }

    return flags;
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
    const fieldStatePath = buildFieldStatePath(path);
    if (fieldStatePath === undefined) return;
    return get<FieldState | undefined>(formState.data, fieldStatePath);
  };

  /**
   * Returns the children of an specific form field
   */
  const getFieldChildren = (path: string = '') => {
    if (!path) return undefined;
    const childrenPath = buildFieldChildrenPath(path);
    if (childrenPath === undefined) return;
    return get<FieldState | undefined>(formState.data, childrenPath);
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
  const isFormInvalid = () => isFieldInvalid(ROOT_KEY);

  /**
   * Stores the html element at form state
   */
  const fieldHtmlElement = (path: string, htmlElement: HTMLElement) => {
    setFieldState(path, { htmlElement });
  };

  /**
   * Marks a field as touched when the user interacted with it.
   */
  const touchField = (path: string = '') => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return;
    setFieldState(path, { touched: true });
  };

  /**
   * Marks a field as dirty if initial value is different from current value.
   */
  const dirtyField = (path: string) => {
    const fieldState = getFieldState(path);
    if (fieldState === undefined) return;
    const dirty = equals(getFieldValue(path), fieldState.initialValue) ? false : true;
    setFieldState(path, { ...fieldState, dirty });
  };

  /**
   * Checks if the form has changes when is found a dirty field.
   */
  const formHasChanges = () => {
    for (let key of objectPaths(formData.data)) {
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
    validateFieldsets(options?.basePath);
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
    validateFieldsets(basePath);
  };

  /**
   * Helper function for validating root or nested fieldsets.
   */
  const validateFieldsets = (path?: string) => {
    /**
     * path is given for nested fieldsets, if no is assumed that
     * root fieldsets (ROOT_KEY) needs to be validated.
     */
    validateField(path || ROOT_KEY, { silentValidation: true, force: true });
  };

  /**
   * Remove fieldset state
   * Use path for removing a fieldset inside a nested array from an object.
   */
  const removeFieldsetState = (index: number, basePath?: string) => {
    setFieldChildren(basePath, (items: FormState[]) => items.filter((_, i) => i !== index));
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
  const moveFieldsetState = (oldIndex?: number, newIndex?: number, basePath: string = '') => {
    if (oldIndex === undefined || newIndex === undefined) return;
    setFieldChildren(
      basePath,
      reorderArray(get<FormState[]>(formState, `data.${buildFieldChildrenPath(basePath)}`), oldIndex, newIndex)
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
    isFieldInvalid,
    isFieldValidating,
    isFormInvalid,
    moveFieldset,
    removeFieldset,
    resetForm,
    setFieldTriggers,
    setFieldValue: setFieldValue as (
      path: string | undefined,
      value: any,
      options?: SetFieldValueOptions
    ) => Promise<any>,
    setFieldDefaultValue: setFieldDefaultValue as (
      path: string | undefined,
      defaultValue: any,
      options?: SetFieldDefaultValueOptions
    ) => Promise<void>,
    touchField,
    validateField: validateField as (path?: string, options?: ValidateFieldOptions) => Promise<void>,
    validateForm,
    _: {
      addFieldsetState,
      buildFieldState,
      dirtyField,
      generateFormState,
      getFieldState,
      getFormState,
      hasEventTypes,
      moveFieldsetState,
      parseValue,
      removeFieldsetState,
      setFieldData,
      setFieldState,
      setFieldChildren,
    },
  };
};
