import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateField: Component = () => (
  <DocsContentLayout prev="../form-has-changes" next="../touch-field">
    <h2 class="mb-4 border-bottom">validateField</h2>
    <p>
      This method validates a single field. It updates the form state by adding
      the field error message and is invalid flag to <code>true</code> when the
      field is invalid.
    </p>
    <Code content={getRaw('validateFieldApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('validateField1')} />
  </DocsContentLayout>
);
