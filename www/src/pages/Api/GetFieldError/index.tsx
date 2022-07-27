import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFieldError: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">getFieldError</h2>
    <p>
      This method returns an string with the field error message. This
      information is get from the form state.
    </p>
    <Code content={getRaw('getFieldErrorApi')} />
  </DocsContentLayout>
);
