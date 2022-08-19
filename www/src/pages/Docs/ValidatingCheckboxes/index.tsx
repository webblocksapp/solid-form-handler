import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxesForm } from '@implementations';

export const ValidatingCheckboxes: Component = () => (
  <DocsContentLayout
    prev="/docs/validating-single-checkbox"
    next="/docs/validating-radios"
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
    <Implementation code={getRaw('CheckboxesForm')}>
      <CheckboxesForm />
    </Implementation>
  </DocsContentLayout>
);
