import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxForm } from '@implementations';

export const ValidatingCheckbox: Component = () => (
  <DocsContentLayout
    prev="/docs/validating-select"
    next="/docs/validating-checkboxes"
  >
    <h2 class="mb-4 border-bottom">Validating Checkbox</h2>
    <p>
      A single checkbox can be treated as a boolean primitive. The
      implementation is the same as a text input but the checked status is taken
      as a value.
    </p>
    <Implementation code={getRaw('CheckboxForm')}>
      <CheckboxForm />
    </Implementation>
  </DocsContentLayout>
);
