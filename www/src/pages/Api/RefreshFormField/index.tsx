import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const RefreshFormField: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">refreshFormField</h2>
    <p>content</p>
    <Code content={getRaw('refreshFormFieldApi')} />
  </DocsContentLayout>
);
