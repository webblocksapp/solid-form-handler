import { Component } from 'solid-js';
import { NavLink, Outlet } from '@solidjs/router';
import { Navbar } from '@components';
import { MAIN_MENU } from '@constants';
import './index.css';

export const MainLayout: Component = () => {
  return (
    <>
      <Navbar
        brand={
          <NavLink class="navbar-brand" href="/">
            solid-form-handler
          </NavLink>
        }
        menu={MAIN_MENU}
      />
      <Outlet />
    </>
  );
};
