import { MainLayout } from '@layouts';
import { RouteDefinition } from 'solid-app-router';

export const mainRoutes: RouteDefinition[] = [
  {
    path: '',
    component: MainLayout,
  },
];
