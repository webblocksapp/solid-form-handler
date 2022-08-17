import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { TextInputCompForm } from '@implementations';
import { getRaw } from '@utils';

export const TextInput: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">TextInput</h2>
    <p>Content</p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('TextInputCompForm') },
        { name: 'TextInput.tsx', code: getRaw('components/TextInput') },
      ]}
    >
      <TextInputCompForm />
    </Implementation>
  </DocsContentLayout>
);
