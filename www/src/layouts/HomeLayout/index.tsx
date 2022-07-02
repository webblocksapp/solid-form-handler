import { Component } from 'solid-js';
import { Outlet } from 'solid-app-router';
import './index.css';

export const HomeLayout: Component = () => {
  return (
    <div class="container-md">
      <Outlet />
    </div>
  );
};
