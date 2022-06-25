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
    element: <CheckboxImpl />,
  },
  {
    path: 'form-impl',
    element: <FormImpl />,
  },
  {
    path: 'select-impl',
    element: <SelectImpl />,
  },
  {
    path: 'text-input-impl',
    element: <TextInputImpl />,
  },
  {
    path: 'complex-form-impl',
    element: <ComplexFormImpl />,
  },
  // {
  //   path: 'fieldsets-form-impl',
  //   element: <FieldsetsFormImpl />,
  // },
];
