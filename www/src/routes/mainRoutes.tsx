import { RouteDefinition } from '@solidjs/router';
import { DOCS_MENU, API_MENU, EXAMPLES_MENU } from '@constants';
import { DocsLayout, MainLayout } from '@layouts';
import { Redirect } from '@components';
import {
  AddFieldset,
  Checkbox,
  Checkboxes,
  Components,
  DependantValidations,
  DynamicForm,
  DynamicNestedForm,
  FieldHasError,
  FillForm,
  FormData,
  FormHasChanges,
  FormIsFilling,
  FormIsResetting,
  FormIsValidating,
  FormValidation,
  GetFieldDefaultValue,
  GetFieldError,
  GetFieldValue,
  GetFormErrors,
  Introduction,
  IsFieldInvalid,
  IsFieldValidating,
  IsFormInvalid,
  MaterialUI,
  MoveFieldset,
  NestedFormValidation,
  QuickStart,
  Radios,
  RemoveFieldset,
  ResetForm,
  Select,
  SetFieldDefaultValue,
  SetFieldTriggers,
  SetFieldValue,
  Setup,
  TextInput,
  TouchField,
  UseFormHandler,
  ValidateField,
  ValidateForm,
  ValidateOn,
  ValidatingCheckbox,
  ValidatingCheckboxes,
  ValidatingMultiStepForm,
  ValidatingRadios,
  ValidatingSelect,
  ValidatingTextInput,
  ValidationDelay,
  Validations,
} from '@pages';

export const mainRoutes: RouteDefinition[] = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Redirect,
        data: () => ({
          href: 'docs',
        }),
      },
      {
        path: 'home',
        component: Redirect,
        data: () => ({
          href: 'docs',
        }),
      },
      {
        path: 'docs',
        component: DocsLayout,
        data: () => ({
          headerText: 'Documentation',
          menu: DOCS_MENU,
          menuOffset: 1,
        }),
        children: [
          {
            path: '',
            component: Redirect,
            data: () => ({
              href: 'introduction',
            }),
          },
          {
            path: 'introduction',
            component: Introduction,
          },
          { path: 'setup', component: Setup },
          {
            path: 'quick-start',
            component: QuickStart,
          },
          {
            path: 'validations',
            component: Validations,
          },
          {
            path: 'validating-text-input',
            component: ValidatingTextInput,
          },
          {
            path: 'validating-select',
            component: ValidatingSelect,
          },
          {
            path: 'validating-single-checkbox',
            component: ValidatingCheckbox,
          },
          {
            path: 'validating-checkboxes',
            component: ValidatingCheckboxes,
          },
          {
            path: 'validating-radios',
            component: ValidatingRadios,
          },
          {
            path: 'components',
            component: Components,
          },
          { path: 'text-input', component: TextInput },
          { path: 'select', component: Select },
          {
            path: 'single-checkbox',
            component: Checkbox,
          },
          {
            path: 'checkboxes',
            component: Checkboxes,
          },
          { path: 'radios', component: Radios },
          {
            path: 'form-validation',
            component: FormValidation,
          },
          {
            path: 'dynamic-form',
            component: DynamicForm,
          },
          {
            path: 'nested-form-validation',
            component: NestedFormValidation,
          },
          {
            path: 'dynamic-nested-form',
            component: DynamicNestedForm,
          },
          {
            path: 'dependant-validations',
            component: DependantValidations,
          },
          {
            path: 'validate-on',
            component: ValidateOn,
          },
          {
            path: 'validation-delay',
            component: ValidationDelay,
          },
          {
            path: 'validating-multi-step-form',
            component: ValidatingMultiStepForm,
          },
          {
            path: 'material-ui',
            component: MaterialUI,
          },
        ],
      },
      {
        path: 'api',
        component: DocsLayout,
        data: () => ({ headerText: 'API', menu: API_MENU }),
        children: [
          {
            path: '',
            component: Redirect,
            data: () => ({
              href: 'use-form-handler',
            }),
          },
          {
            path: 'use-form-handler',
            component: UseFormHandler,
          },
          {
            path: 'add-fieldset',
            component: AddFieldset,
          },
          {
            path: 'field-has-error',
            component: FieldHasError,
          },
          { path: 'fill-form', component: FillForm },
          {
            path: 'form-has-changes',
            component: FormHasChanges,
          },
          {
            path: 'get-field-error',
            component: GetFieldError,
          },
          {
            path: 'get-field-value',
            component: GetFieldValue,
          },
          { path: 'form-data', component: FormData },
          {
            path: 'get-form-errors',
            component: GetFormErrors,
          },
          {
            path: 'is-field-invalid',
            component: IsFieldInvalid,
          },
          {
            path: 'is-form-invalid',
            component: IsFormInvalid,
          },
          {
            path: 'move-fieldset',
            component: MoveFieldset,
          },
          {
            path: 'remove-fieldset',
            component: RemoveFieldset,
          },
          { path: 'reset-form', component: ResetForm },
          {
            path: 'set-field-value',
            component: SetFieldValue,
          },
          {
            path: 'validate-field',
            component: ValidateField,
          },
          {
            path: 'touch-field',
            component: TouchField,
          },
          {
            path: 'validate-form',
            component: ValidateForm,
          },
          {
            path: 'form-is-filling',
            component: FormIsFilling,
          },
          {
            path: 'form-is-resetting',
            component: FormIsResetting,
          },
          {
            path: 'set-field-default-value',
            component: SetFieldDefaultValue,
          },
          {
            path: 'get-field-default-value',
            component: GetFieldDefaultValue,
          },
          {
            path: 'form-is-validating',
            component: FormIsValidating,
          },
          {
            path: 'set-field-triggers',
            component: SetFieldTriggers,
          },
          {
            path: 'is-field-validating',
            component: IsFieldValidating,
          },
        ],
      },
      {
        path: 'examples',
        component: DocsLayout,
        data: () => ({ headerText: 'Examples', menu: EXAMPLES_MENU }),
        children: [],
      },
    ],
  },
];
