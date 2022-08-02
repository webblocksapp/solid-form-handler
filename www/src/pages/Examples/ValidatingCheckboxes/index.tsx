import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxesForm } from '@implementations';

export const ValidatingCheckboxes: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Checkboxes</h2>
    <Implementation code={getRaw('CheckboxesForm')}>
      <CheckboxesForm />
    </Implementation>
  </DocsContentLayout>
);
