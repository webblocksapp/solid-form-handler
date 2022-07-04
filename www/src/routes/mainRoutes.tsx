import { HomeLayout, MainLayout, DocsLayout } from '@layouts';
import { RouteDefinition } from 'solid-app-router';
import { Introduction, Setup, ValidationSchema, FormValidation } from '@pages';

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
        data: () => ({ headerText: 'Documentation' }),
        children: [
          { path: '', component: Introduction },
          { path: 'introduction', component: Introduction },
          { path: 'setup', component: Setup },
          { path: 'validation-schema', component: ValidationSchema },
          { path: 'form-validation', component: FormValidation },
        ],
      },
      {
        path: 'examples',
        component: DocsLayout,
        data: () => ({ headerText: 'Examples' }),
      },
    ],
  },
];
