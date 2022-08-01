import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const RefreshFormField: Component = () => (
  <DocsContentLayout prev="/api/get-field-value" next="/api/form-has-changes">
    <h2 class="mb-4 border-bottom">refreshFormField</h2>
    <p>
      This method refresh the form field initial state. Very useful for
      conditional validations.
    </p>
    <Code content={getRaw('refreshFormFieldApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('refreshFormField1')} />
  </DocsContentLayout>
);
