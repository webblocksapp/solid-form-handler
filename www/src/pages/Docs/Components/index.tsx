import { Component } from 'solid-js';
import { NavLink } from '@solidjs/router';

export const Components: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Components</h2>
    <p>
      For doing code forms more legible and shorter is recommended you abstract
      each validation logic into <i>SolidJS</i> components with the help of the{' '}
      form handler <code>&lt;Field /&gt;</code> component. The following
      definitions are the suggested examples to follow and can be adapted for
      your preferable CSS framework or UI library.
    </p>
    <p>
      Here we will define the most common UI form components as <i>SolidJS</i>{' '}
      components:
    </p>
    <ul>
      <li>
        <NavLink href="../text-input">TextInput</NavLink>
      </li>
      <li>
        <NavLink href="../select">Select</NavLink>
      </li>
      <li>
        <NavLink href="../single-checkbox">Checkbox</NavLink>
      </li>
      <li>
        <NavLink href="../checkboxes">Checkboxes</NavLink>
      </li>
      <li>
        <NavLink href="../radios">Radios</NavLink>
      </li>
    </ul>
  </>
);
