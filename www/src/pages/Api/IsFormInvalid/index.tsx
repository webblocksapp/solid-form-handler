import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const IsFormInvalid: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">isFormInvalid</h2>
    <p>content</p>
    <Code content={getRaw('isFormInvalidApi')} />
  </DocsContentLayout>
);
