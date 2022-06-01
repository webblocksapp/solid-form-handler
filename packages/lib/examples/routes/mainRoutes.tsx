import { CheckboxImpl, FormImpl, SelectImpl, TextInputImpl, ConditionalFormImpl } from '@implementations';
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
    path: 'conditional-form-impl',
    component: ConditionalFormImpl,
  },
];
