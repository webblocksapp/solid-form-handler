import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Code } from '@components';
import { SingleTextInputForm } from '@implementations';
import { getRaw } from '@utils';

export const TextInput: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">TextInput</h2>
    <p>Content</p>
    <Code content={getRaw('components/TextInput/index.tsx')} />
  </DocsContentLayout>
);
