import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FormData: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">formData</h2>
    <p>
      This method is a SolidJS reactive function with the current form data.
    </p>
    <Code content={getRaw('formData')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('formData1')} />
  </DocsContentLayout>
);
