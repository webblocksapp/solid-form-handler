import { Component } from 'solid-js';
import { Outlet } from '@solidjs/router';
import './index.css';

export const HomeLayout: Component = () => {
  return (
    <div class="container-md">
      <Outlet />
    </div>
  );
};
