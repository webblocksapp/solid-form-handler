import {
  CheckboxImpl,
  FormImpl,
  SelectImpl,
  TextInputImpl,
  ComplexFormImpl,
  FieldsetsFormImpl,
} from '@implementations';

import { RouteDefinition } from 'solid-app-router';

export const mainRoutes: RouteDefinition[] = [
  {
    path: 'checkbox-impl',
    component: CheckboxImpl,
  },
  {
    path: 'form-impl',
    component: FormImpl,
  },
  {
    path: 'select-impl',
    component: SelectImpl,
  },
  {
    path: 'text-input-impl',
    component: TextInputImpl,
  },
  {
    path: 'complex-form-impl',
    component: ComplexFormImpl,
  },
  {
    path: 'fieldsets-form-impl',
    component: FieldsetsFormImpl,
  },
];
