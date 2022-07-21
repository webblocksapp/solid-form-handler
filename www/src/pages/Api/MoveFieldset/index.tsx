import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const MoveFieldset: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">moveFieldset</h2>
    <p>content</p>
    <Code content={getRaw('moveFieldsetApi')} />
  </DocsContentLayout>
);
