import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateForm: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">validateForm</h2>
    <p>
      This method validates all the form fields. When the form is invalid it
      throws an error with the invalid fields error messages.
    </p>
    <Code content={getRaw('validateFormApi')} />
  </DocsContentLayout>
);
