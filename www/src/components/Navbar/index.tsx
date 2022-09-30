import { Component, For, JSX, Show } from 'solid-js';
import { NavLink } from '@solidjs/router';
import { MenuItem } from '@interfaces';
import './index.css';

export interface NavbarProps {
  menu?: MenuItem[];
  brand?: JSX.Element;
  rightMenu?: Omit<MenuItem, 'text' | 'section'>[];
}

export const Navbar: Component<NavbarProps> = (props) => (
  <nav class="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-xxl">
      {props.brand}
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse align-center justify-space-between"
        id="navbarScroll"
      >
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px;"
        >
          <For each={props.menu}>
            {(item) => (
              <li class="nav-item">
                <NavLink class="nav-link" href={item.route as string}>
                  {item.text}
                </NavLink>
              </li>
            )}
          </For>
        </ul>
        <Show when={props.rightMenu}>
          <ul
            class="navbar-nav right-menu my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px;"
          >
            <For each={props.rightMenu}>
              {(item) => (
                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    href={item.route as string}
                    target={item.external ? 'blank' : undefined}
                  >
                    {item.icon}
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </div>
  </nav>
);
