import { CommonObject, FormField, SetFieldValueOptions } from '@interfaces';
import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { SchemaOf, ValidationError } from 'yup';

export const useFormHandler = <T extends CommonObject>(yupSchema: SchemaOf<T>, defaultFormData?: T) => {
  const [formData, setFormData] = createStore<CommonObject>(defaultFormData as CommonObject);
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
   * Validates the whole form data.
   */
  const validate = async () => {
    try {
      await yupSchema.validate(formData, { abortEarly: false });
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        for (let validationError of validationErrors.inner) {
          const { path, errors } = validationError;
          if (path === undefined) {
            continue;
          }
          setFormFields(path, (formField) => ({ ...formField, isInvalid: true, errorMessage: errors[0] }));
        }
      }
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
   * Initializes the default state of a field.
   * By default the field is initialized as invalid.
   * Use this method on any FormField mounted component lifecycle.
   */
  const initFormField = (path: string = '', value: any, field?: HTMLElement) => {
    if (!path) return;
    setFormFields(path, (formField) => ({
      ...formField,
      isInvalid: true,
      errorMessage: '',
      field: field ?? formField?.field,
      initialValue: value || '',
      touched: false,
      dirty: false,
    }));
  };

  /**
   * Initializes the default state of the form fields.
   */
  const initializeFormFields = (data: T) => {
    Object.keys(data).forEach((path) => {
      initFormField(path, formData);
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

  onMount(() => {
    defaultFormData && initializeFormFields(defaultFormData);
  });

  return {
    formHasChanges,
    getFieldError,
    getFieldValue,
    getFormData,
    getFormFields,
    initFormField,
    isFormInvalid,
    setFieldValue,
    validate,
    validateField,
  };
};
