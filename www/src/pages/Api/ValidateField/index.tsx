import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateField: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">validateField</h2>
    <p>
      This method validates a single field. It updates the form state by adding
      the field error message and is invalid flag to true when the field is
      invalid.
    </p>
    <Code content={getRaw('validateFieldApi')} />
  </DocsContentLayout>
);
