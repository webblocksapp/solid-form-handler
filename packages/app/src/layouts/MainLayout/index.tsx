import { Component } from 'solid-js';
import { Outlet } from 'solid-app-router';

export const MainLayout: Component = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
