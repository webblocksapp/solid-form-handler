import { HomeLayout, MainLayout, DocsLayout } from '@layouts';
import { RouteDefinition } from '@solidjs/router';
import {
  Introduction,
  Setup,
  ValidationSchema,
  FormValidation,
  DynamicForm,
  UseFormHandler,
  AddFieldset,
  FieldHasError,
  FillForm,
  FormHasChanges,
  GetFieldError,
  GetFieldValue,
  FormData,
  GetFormErrors,
  GetFormState,
  IsFieldInvalid,
  IsFormInvalid,
  MoveFieldset,
  RefreshFormField,
  RemoveFieldset,
  ResetForm,
  SetFieldValue,
  Validations,
  ValidateField,
  ValidateForm,
  ValidatingTextInput,
  ValidatingSelect,
  ValidatingCheckboxes,
  ValidatingRadios,
  TouchField,
  Components,
  TextInput,
  Select,
  Checkboxes,
  Radios,
} from '@pages';
import { DOCS_MENU, API_MENU, EXAMPLES_MENU } from '@constants';

export const mainRoutes: RouteDefinition[] = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomeLayout,
      },
      {
        path: 'home',
        component: HomeLayout,
      },
      {
        path: 'docs',
        component: DocsLayout,
        data: () => ({ headerText: 'Documentation', menu: DOCS_MENU }),
        children: [
          { path: '', component: Introduction },
          { path: 'introduction', component: Introduction },
          { path: 'setup', component: Setup },
          { path: 'validation-schema', component: ValidationSchema },
          { path: 'form-validation', component: FormValidation },
          { path: 'dynamic-form', component: DynamicForm },
          { path: 'validations', component: Validations },
          { path: 'validating-text-input', component: ValidatingTextInput },
          { path: 'validating-select', component: ValidatingSelect },
          { path: 'validating-checkboxes', component: ValidatingCheckboxes },
          { path: 'validating-radios', component: ValidatingRadios },
          { path: 'components', component: Components },
          { path: 'text-input', component: TextInput },
          { path: 'select', component: Select },
          { path: 'checkboxes', component: Checkboxes },
          { path: 'radios', component: Radios },
        ],
      },
      {
        path: 'api',
        component: DocsLayout,
        data: () => ({ headerText: 'API', menu: API_MENU }),
        children: [
          { path: '', component: UseFormHandler },
          { path: 'use-form-handler', component: UseFormHandler },
          { path: 'add-fieldset', component: AddFieldset },
          { path: 'field-has-error', component: FieldHasError },
          { path: 'fill-form', component: FillForm },
          { path: 'form-has-changes', component: FormHasChanges },
          { path: 'get-field-error', component: GetFieldError },
          { path: 'get-field-value', component: GetFieldValue },
          { path: 'form-data', component: FormData },
          { path: 'get-form-errors', component: GetFormErrors },
          { path: 'get-form-state', component: GetFormState },
          { path: 'is-field-invalid', component: IsFieldInvalid },
          { path: 'is-form-invalid', component: IsFormInvalid },
          { path: 'move-fieldset', component: MoveFieldset },
          { path: 'refresh-form-field', component: RefreshFormField },
          { path: 'remove-fieldset', component: RemoveFieldset },
          { path: 'reset-form', component: ResetForm },
          { path: 'set-field-value', component: SetFieldValue },
          { path: 'validate-field', component: ValidateField },
          { path: 'touch-field', component: TouchField },
          { path: 'validate-form', component: ValidateForm },
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
