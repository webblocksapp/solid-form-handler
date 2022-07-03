import { Component } from 'solid-js';
import { Outlet } from 'solid-app-router';
import './index.css';

export const ExamplesLayout: Component = () => {
  return (
    <div class="container-fluid">
      <Outlet />
    </div>
  );
};
