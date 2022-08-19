import { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { mainRoutes } from '@routes';

export const App: Component = () => {
  return useRoutes(mainRoutes);
};
