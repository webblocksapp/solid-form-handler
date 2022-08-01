import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const IsFieldInvalid: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">isFieldInvalid</h2>
    <p>
      This method returns a boolean flag, <code>true</code> if the field is
      invalid. This information is get from the form state.
    </p>
    <Code content={getRaw('isFieldInvalidApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('isFieldInvalid1')} />
  </DocsContentLayout>
);
