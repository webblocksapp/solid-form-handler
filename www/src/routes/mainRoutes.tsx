import { HomeLayout, MainLayout, DocsLayout, ExamplesLayout } from '@layouts';
import { RouteDefinition } from 'solid-app-router';
import { Introduction } from '@pages';

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
        children: [
          { path: '', component: Introduction },
          { path: 'introduction', component: Introduction },
        ],
      },
      {
        path: 'examples',
        component: ExamplesLayout,
      },
    ],
  },
];
