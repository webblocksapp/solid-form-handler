import { Component, For, JSX } from 'solid-js';
import { NavLink } from '@solidjs/router';
import { Menu } from '@interfaces';

export interface NavbarProps {
  menu?: Menu[];
  brand?: JSX.Element;
}

export const Navbar: Component<NavbarProps> = (props) => (
  <>
    <nav class="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-md">
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
                  <NavLink class="nav-link" href={item.route as string}>
                    {item.text}
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </nav>
  </>
);
