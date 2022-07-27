import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFieldValue: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">getFieldValue</h2>
    <p>
      This method obtains the current value of a field. The value is obtained
      from the formData() reactive object.
    </p>
    <Code content={getRaw('getFieldValueApi')} />
  </DocsContentLayout>
);
