import { Component } from 'solid-js';
import { Outlet } from '@solidjs/router';
import { Navbar } from '@components';
import './index.css';

export const MainLayout: Component = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
