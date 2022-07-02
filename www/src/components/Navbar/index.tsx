import { Component } from 'solid-js';
import { Link } from 'solid-app-router';
import './index.css';

export const Navbar: Component = () => (
  <>
    <div class="navbar"></div>
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-md">
        <Link class="navbar-brand" href="/">
          solidjs-form-handler
        </Link>
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
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" href="home">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="docs">
                Docs
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="examples">
                Examples
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);
