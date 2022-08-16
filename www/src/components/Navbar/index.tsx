import { Component } from 'solid-js';
import { NavLink } from '@solidjs/router';

export const Navbar: Component = () => (
  <>
    <nav class="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-md">
        <NavLink class="navbar-brand" href="/">
          solid-form-handler
        </NavLink>
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
            <li class="nav-item">
              <NavLink class="nav-link" aria-current="page" href="home">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" href="docs/introduction">
                Docs
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" href="api/use-form-handler">
                API
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" href="examples/validating-text-input">
                Examples
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);
