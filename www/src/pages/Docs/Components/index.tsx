import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { NavLink } from '@solidjs/router';

export const Components: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Components</h2>
    <p>
      To make code forms more legible and shorter is recommended you abstract
      each validation logic into <i>SolidJS</i> components. The following
      definitions are the suggested examples to follow and can be adapted for
      your preferable CSS framework or UI library.
    </p>
    <p>
      Again we will define the most common UI form components as SolidJS
      components:
    </p>
    <ul>
      <li>
        <NavLink noScroll href="/docs/text-input">
          TextInput
        </NavLink>
      </li>
      <li>
        <NavLink noScroll href="/docs/select">
          Select
        </NavLink>
      </li>
      <li>
        <NavLink noScroll href="/docs/checkboxes">
          Checkboxes
        </NavLink>
      </li>
      <li>
        <NavLink noScroll href="/docs/radios">
          Radios
        </NavLink>
      </li>
    </ul>
  </DocsContentLayout>
);
