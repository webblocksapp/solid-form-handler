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
      { text: 'addFieldset', route: 'add-fieldset' },
      { text: 'fieldHasError', route: 'field-has-error' },
      { text: 'fillForm', route: 'fill-form' },
      { text: 'formHasChanges', route: 'form-has-changes' },
      { text: 'getFieldError', route: 'get-field-error' },
      { text: 'getFieldValue', route: 'get-field-value' },
      { text: 'getFormData', route: 'get-form-data' },
      { text: 'getFormErrors', route: 'get-form-errors' },
      { text: 'getFormState', route: 'get-form-state' },
      { text: 'isFieldInvalid', route: 'is-field-invalid' },
      { text: 'isFormInvalid', route: 'is-form-invalid' },
      { text: 'moveFieldset', route: 'move-fieldset' },
      { text: 'refreshFormField', route: 'refresh-form-field' },
      { text: 'removeFieldset', route: 'remove-fieldset' },
      { text: 'resetForm', route: 'reset-form' },
      { text: 'setFieldValue', route: 'set-field-value' },
      { text: 'validateField', route: 'validate-field' },
      { text: 'validateForm', route: 'validate-form' },
    ],
  },
];
