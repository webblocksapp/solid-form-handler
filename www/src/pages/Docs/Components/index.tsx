import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { NavLink } from '@solidjs/router';

export const Components: Component = () => (
  <DocsContentLayout prev="../validating-radios" next="../text-input">
    <h2 class="mb-4 border-bottom">Components</h2>
    <p>
      For doing code forms more legible and shorter is recommended you abstract
      each validation logic into <i>SolidJS</i> components. The following
      definitions are the suggested examples to follow and can be adapted for
      your preferable CSS framework or UI library.
    </p>
    <p>
      It's recommended you know how to build your own form components for taking
      advantage of the <b>solid-form-handler</b> library. This library doesn't
      offer built-in form components because is impossible to match every form
      UI brand design. You can use the following code snippets as a base to
      build your own.
    </p>
    <p>
      Again we will define the most common UI form components as <i>SolidJS</i>{' '}
      components:
    </p>
    <ul>
      <li>
        <NavLink href="/docs/text-input">TextInput</NavLink>
      </li>
      <li>
        <NavLink href="/docs/select">Select</NavLink>
      </li>
      <li>
        <NavLink href="/docs/single-checkbox">Checkbox</NavLink>
      </li>
      <li>
        <NavLink href="/docs/checkboxes">Checkboxes</NavLink>
      </li>
      <li>
        <NavLink href="/docs/radios">Radios</NavLink>
      </li>
    </ul>
  </DocsContentLayout>
);
