import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const IsFieldInvalid: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">isFieldInvalid</h2>
    <p>content</p>
    <Code content={getRaw('isFieldInvalidApi')} />
  </DocsContentLayout>
);
