import { TreeMenuItem } from '@interfaces';

export const DOCS_MENU: TreeMenuItem[] = [
  {
    text: 'Getting started',
    section: true,
    children: [
      { text: 'Introduction', route: 'introduction' },
      { text: 'Setup', route: 'setup' },
      { text: 'Quick Start', route: 'quick-start' },
    ],
  },
  {
    text: 'Validations',
    route: 'validations',
    section: true,
    children: [
      { text: 'Validating Text Input', route: 'validating-text-input' },
      { text: 'Validating Select', route: 'validating-select' },
      { text: 'Validating Checkbox', route: 'validating-single-checkbox' },
      { text: 'Validating Checkboxes', route: 'validating-checkboxes' },
      { text: 'Validating Radios', route: 'validating-radios' },
    ],
  },
  {
    text: 'Components',
    route: 'components',
    section: true,
    children: [
      { text: 'TextInput', route: 'text-input' },
      { text: 'Select', route: 'select' },
      { text: 'Checkbox', route: 'single-checkbox' },
      { text: 'Checkboxes', route: 'checkboxes' },
      { text: 'Radios', route: 'radios' },
    ],
  },
  {
    text: 'Implementation',
    section: true,
    children: [
      { text: 'Form Validation', route: 'form-validation' },
      { text: 'Dynamic Form', route: 'dynamic-form' },
      { text: 'Nested Form Validation', route: 'nested-form-validation' },
      {
        text: 'Dynamic Nested Form',
        route: 'dynamic-nested-form',
      },
      { text: 'Dependant Validations', route: 'dependant-validations' },
      { text: 'Validate On', route: 'validate-on' },
      { text: 'Conditional Rendering', route: 'conditional-rendering' },
      { text: 'Validation Delay', route: 'validation-delay' },
    ],
  },
];

export const API_MENU: TreeMenuItem[] = [
  {
    text: 'useFormHandler',
    route: 'use-form-handler',
    section: true,
    children: [
      { text: 'fillForm', route: 'fill-form' },
      { text: 'formIsFilling', route: 'form-is-filling' },
      { text: 'resetForm', route: 'reset-form' },
      { text: 'formIsResetting', route: 'form-is-resetting' },
      { text: 'formData', route: 'form-data' },
      { text: 'getFormErrors', route: 'get-form-errors' },
      { text: 'isFormInvalid', route: 'is-form-invalid' },
      { text: 'getFormState', route: 'get-form-state' },
      { text: 'setFieldValue', route: 'set-field-value' },
      { text: 'setFieldDefaultValue', route: 'set-field-default-value' },
      { text: 'setFieldTriggers', route: 'set-field-triggers' },
      { text: 'isFieldInvalid', route: 'is-field-invalid' },
      { text: 'isFieldValidating', route: 'is-field-validating' },
      { text: 'fieldHasError', route: 'field-has-error' },
      { text: 'getFieldError', route: 'get-field-error' },
      { text: 'getFieldValue', route: 'get-field-value' },
      { text: 'getFieldDefaultValue', route: 'get-field-default-value' },
      { text: 'refreshFormField', route: 'refresh-form-field' },
      { text: 'formHasChanges', route: 'form-has-changes' },
      { text: 'mountField', route: 'mount-field' },
      { text: 'unmountField', route: 'unmount-field' },
      { text: 'validateField', route: 'validate-field' },
      { text: 'touchField', route: 'touch-field' },
      { text: 'validateForm', route: 'validate-form' },
      { text: 'formIsValidating', route: 'form-is-validating' },
      { text: 'addFieldset', route: 'add-fieldset' },
      { text: 'moveFieldset', route: 'move-fieldset' },
      { text: 'removeFieldset', route: 'remove-fieldset' },
    ],
  },
];

export const EXAMPLES_MENU: TreeMenuItem[] = [];
