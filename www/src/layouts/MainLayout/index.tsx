import { Component } from 'solid-js';
import { NavLink, Outlet } from '@solidjs/router';
import { Navbar } from '@components';
import { MAIN_MENU, MAIN_RIGHT_MENU } from '@constants';
import logo from '@images/logo.svg';
import './index.css';

export const MainLayout: Component = () => {
  return (
    <>
      <Navbar
        brand={
          <>
            <NavLink class="navbar-brand" href="/">
              <img src={logo} width={30} class="me-2 mb-1" />
              <span>solid-form-handler</span>
            </NavLink>
          </>
        }
        menu={MAIN_MENU}
        rightMenu={MAIN_RIGHT_MENU}
      />
      <Outlet />
    </>
  );
};
