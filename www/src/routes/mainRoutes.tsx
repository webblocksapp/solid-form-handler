import { RouteDefinition } from '@solidjs/router';
import { DOCS_MENU, API_MENU, EXAMPLES_MENU } from '@constants';
import { lazyImport } from '@utils';

export const mainRoutes: RouteDefinition[] = [
  {
    path: '',
    component: lazyImport('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: lazyImport('layouts/HomeLayout'),
      },
      {
        path: 'home',
        component: lazyImport('layouts/HomeLayout'),
      },
      {
        path: 'docs',
        component: lazyImport('layouts/DocsLayout'),
        data: () => ({
          headerText: 'Documentation',
          menu: DOCS_MENU,
          menuOffset: 1,
        }),
        children: [
          {
            path: '',
            component: lazyImport('components/Redirect'),
            data: () => ({
              href: 'introduction',
            }),
          },
          {
            path: 'introduction',
            component: lazyImport('pages/Docs/Introduction'),
          },
          { path: 'setup', component: lazyImport('pages/Docs/Setup') },
          {
            path: 'validation-schema',
            component: lazyImport('pages/Docs/ValidationSchema'),
          },
          {
            path: 'validations',
            component: lazyImport('pages/Docs/Validations'),
          },
          {
            path: 'validating-text-input',
            component: lazyImport('pages/Docs/ValidatingTextInput'),
          },
          {
            path: 'validating-select',
            component: lazyImport('pages/Docs/ValidatingSelect'),
          },
          {
            path: 'validating-single-checkbox',
            component: lazyImport('pages/Docs/ValidatingCheckbox'),
          },
          {
            path: 'validating-checkboxes',
            component: lazyImport('pages/Docs/ValidatingCheckboxes'),
          },
          {
            path: 'validating-radios',
            component: lazyImport('pages/Docs/ValidatingRadios'),
          },
          {
            path: 'components',
            component: lazyImport('pages/Docs/Components'),
          },
          { path: 'text-input', component: lazyImport('pages/Docs/TextInput') },
          { path: 'select', component: lazyImport('pages/Docs/Select') },
          {
            path: 'single-checkbox',
            component: lazyImport('pages/Docs/Checkbox'),
          },
          {
            path: 'checkboxes',
            component: lazyImport('pages/Docs/Checkboxes'),
          },
          { path: 'radios', component: lazyImport('pages/Docs/Radios') },
          {
            path: 'form-validation',
            component: lazyImport('pages/Docs/FormValidation'),
          },
          {
            path: 'dynamic-form',
            component: lazyImport('pages/Docs/DynamicForm'),
          },
          {
            path: 'nested-form-validation',
            component: lazyImport('pages/Docs/NestedFormValidation'),
          },
          {
            path: 'dynamic-nested-form',
            component: lazyImport('pages/Docs/DynamicNestedForm'),
          },
        ],
      },
      {
        path: 'api',
        component: lazyImport('layouts/DocsLayout'),
        data: () => ({ headerText: 'API', menu: API_MENU }),
        children: [
          {
            path: '',
            component: lazyImport('components/Redirect'),
            data: () => ({
              href: 'use-form-handler',
            }),
          },
          {
            path: 'use-form-handler',
            component: lazyImport('pages/Api/UseFormHandler'),
          },
          {
            path: 'add-fieldset',
            component: lazyImport('pages/Api/AddFieldset'),
          },
          {
            path: 'field-has-error',
            component: lazyImport('pages/Api/FieldHasError'),
          },
          { path: 'fill-form', component: lazyImport('pages/Api/FillForm') },
          {
            path: 'form-has-changes',
            component: lazyImport('pages/Api/FormHasChanges'),
          },
          {
            path: 'get-field-error',
            component: lazyImport('pages/Api/GetFieldError'),
          },
          {
            path: 'get-field-value',
            component: lazyImport('pages/Api/GetFieldValue'),
          },
          { path: 'form-data', component: lazyImport('pages/Api/FormData') },
          {
            path: 'get-form-errors',
            component: lazyImport('pages/Api/GetFormErrors'),
          },
          {
            path: 'get-form-state',
            component: lazyImport('pages/Api/GetFormState'),
          },
          {
            path: 'is-field-invalid',
            component: lazyImport('pages/Api/IsFieldInvalid'),
          },
          {
            path: 'is-form-invalid',
            component: lazyImport('pages/Api/IsFormInvalid'),
          },
          {
            path: 'move-fieldset',
            component: lazyImport('pages/Api/MoveFieldset'),
          },
          {
            path: 'refresh-form-field',
            component: lazyImport('pages/Api/RefreshFormField'),
          },
          {
            path: 'remove-fieldset',
            component: lazyImport('pages/Api/RemoveFieldset'),
          },
          { path: 'reset-form', component: lazyImport('pages/Api/ResetForm') },
          {
            path: 'set-field-value',
            component: lazyImport('pages/Api/SetFieldValue'),
          },
          {
            path: 'validate-field',
            component: lazyImport('pages/Api/ValidateField'),
          },
          {
            path: 'touch-field',
            component: lazyImport('pages/Api/TouchField'),
          },
          {
            path: 'validate-form',
            component: lazyImport('pages/Api/ValidateForm'),
          },
        ],
      },
      {
        path: 'examples',
        component: lazyImport('layouts/DocsLayout'),
        data: () => ({ headerText: 'Examples', menu: EXAMPLES_MENU }),
        children: [],
      },
    ],
  },
];
