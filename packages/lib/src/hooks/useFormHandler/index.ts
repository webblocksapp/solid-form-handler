import { CommonObject, FormField, SetFieldValueOptions, ValidationResult } from '@interfaces';
import { FormErrorsException } from '@utils';
import { createStore } from 'solid-js/store';
import { SchemaOf, ValidationError } from 'yup';

export const useFormHandler = <T extends CommonObject>(yupSchema: SchemaOf<T>, defaultFormData?: Partial<T>) => {
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

    setFormData(path, value);
    options?.touch && touchField(path);
    options?.dirty && dirtyField(path);
    options?.validate && (await validateField(path));
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
    let isInvalid = false;

    try {
      await yupSchema.validate(formData, { abortEarly: false });
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        isInvalid = true;

        for (let validationError of validationErrors.inner) {
          const { path, errors } = validationError;
          if (path === undefined) {
            continue;
          }
          setFormFields(path, (formField) => ({ ...formField, isInvalid: true, errorMessage: errors[0] }));
        }
      }
    }

    if (options?.throwException && isInvalid) {
      throw new FormErrorsException(getFormErrors());
    }
  };

  const getFieldValue = (path: string = '') => {
    if (!path) return '';
    return formData[path] || '';
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
   * Use this method on any FormField mounted component lifecycle.
   */
  const setFormField = async (path: string = '', value: any, field?: HTMLElement) => {
    if (!path) return;

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
      initialValue: value || '',
      touched: false,
      dirty: false,
    }));
  };

  /**
   * Refresh the form field initial state
   */
  const refreshFormField = (path: string) => {
    setFormField(path, formData[path]);
  };

  /**
   * Initializes the default state of the form.
   */
  const initializeForm = (data: T) => {
    setFormData(data);
    defaultFormData && validate();

    Object.keys(data).forEach((path) => {
      const value = data[path] === undefined ? '' : data[path];
      setFormField(path, value);
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
   * Form is initialized before mounted.
   */
  initializeForm({ ...yupSchema.getDefaultFromShape(), ...defaultFormData } as T);

  return {
    formHasChanges,
    getFieldError,
    getFieldValue,
    getFormData,
    getFormFields,
    isFormInvalid,
    refreshFormField,
    setFieldValue,
    setFormField,
    validate,
    validateField,
    validateForm,
  };
};
