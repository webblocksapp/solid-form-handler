import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFormErrors: Component = () => (
  <DocsContentLayout prev="/api/form-data" next="/api/is-form-invalid">
    <h2 class="mb-4 border-bottom">getFormErrors</h2>
    <p>This method retrieves each field error message from the form.</p>
    <Code content={getRaw('getFormErrorsApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFormErrors1')} />
    <p>
      <code>ValidationResult</code> is composed by:
    </p>
    <ul>
      <li>
        <code>path:</code> field name.
      </li>
      <li>
        <code>errorMessage:</code> field error.
      </li>
    </ul>
  </DocsContentLayout>
);
