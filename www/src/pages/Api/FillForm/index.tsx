import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FillForm: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Title</h2>
    <p>content</p>
  </DocsContentLayout>
);
