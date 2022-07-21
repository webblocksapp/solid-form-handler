import { TreeMenu } from '@interfaces';

export const DOCS_MENU: TreeMenu[] = [
  {
    text: 'Getting started',
    section: true,
    children: [
      { text: 'Introduction', route: 'introduction' },
      { text: 'Setup', route: 'setup' },
    ],
  },
  {
    text: 'Implementation',
    section: true,
    children: [
      { text: 'Validation Schema', route: 'validation-schema' },
      { text: 'Form Validation', route: 'form-validation' },
      { text: 'Dynamic Form', route: 'dynamic-form' },
    ],
  },
];

export const API_MENU: TreeMenu[] = [
  {
    text: 'useFormHandler',
    route: 'use-form-handler',
    section: true,
    children: [
      { text: 'fillForm', route: 'fill-form' },
      { text: 'resetForm', route: 'reset-form' },
      { text: 'formData', route: 'form-data' },
      { text: 'getFormErrors', route: 'get-form-errors' },
      { text: 'isFormInvalid', route: 'is-form-invalid' },
      { text: 'getFormState', route: 'get-form-state' },
      { text: 'setFieldValue', route: 'set-field-value' },
      { text: 'isFieldInvalid', route: 'is-field-invalid' },
      { text: 'fieldHasError', route: 'field-has-error' },
      { text: 'getFieldError', route: 'get-field-error' },
      { text: 'getFieldValue', route: 'get-field-value' },
      { text: 'refreshFormField', route: 'refresh-form-field' },
      { text: 'formHasChanges', route: 'form-has-changes' },
      { text: 'validateField', route: 'validate-field' },
      { text: 'validateForm', route: 'validate-form' },
      { text: 'addFieldset', route: 'add-fieldset' },
      { text: 'moveFieldset', route: 'move-fieldset' },
      { text: 'removeFieldset', route: 'remove-fieldset' },
    ],
  },
];
