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
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="d-flex">
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
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul
              class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style="--bs-scroll-height: 100px;"
            >
              <For each={props.menu}>
                {(item) => (
                  <li class="nav-item">
                    <NavLink
                      class="nav-link"
                      href={item.route as string}
                      target={item.external ? 'blank' : undefined}
                    >
                      {item.text}
                    </NavLink>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
        <Show when={props.rightMenu}>
          <div class="right-menu">
            <ul
              class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
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
          </div>
        </Show>
      </div>
    </div>
  </nav>
);
