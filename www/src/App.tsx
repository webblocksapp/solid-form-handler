import { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { mainRoutes } from '@routes';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App: Component = () => {
  return useRoutes(mainRoutes);
};
