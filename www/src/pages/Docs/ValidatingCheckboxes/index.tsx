import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxesForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingCheckboxes: Component = () => (
  <DocsContentLayout
    prev="../validating-single-checkbox"
    next="../validating-radios"
  >
    <h2 class="mb-4 border-bottom">Validating Checkboxes</h2>
    <p>
      Checkboxes must be treated as an array of primitives. When checking a
      multiple set of options, its value is an array of strings or numbers. By
      using the <code>onChange</code> event we can push the value when is
      checked, or filter it when is un-checked an option.
    </p>
    <p>
      For filling the default field value, it's added the logic for mark as{' '}
      checked if the current checkbox value exists inside the form handler field
      value.
    </p>
    <p>
      For doing checkboxes validation more legible, this logic can be abstracted
      into a{' '}
      <Link noScroll href="/docs/checkboxes">
        Checkboxes.tsx
      </Link>{' '}
      component.
    </p>
    <Implementation code={getRaw('CheckboxesForm')}>
      <CheckboxesForm />
    </Implementation>
  </DocsContentLayout>
);
