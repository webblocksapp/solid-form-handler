import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ResetForm: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">resetForm</h2>
    <p>
      This method resets the form to its initial state leaving empty the whole
      form data.
    </p>
    <Code content={getRaw('resetFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('resetForm1')} />
  </DocsContentLayout>
);
