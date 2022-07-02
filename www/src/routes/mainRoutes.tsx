import { HomeLayout, MainLayout, DocsLayout, ExamplesLayout } from '@layouts';
import { RouteDefinition } from 'solid-app-router';

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
      },
      {
        path: 'examples',
        component: ExamplesLayout,
      },
    ],
  },
];
