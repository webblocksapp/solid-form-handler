import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxCompForm } from '@implementations';

export const Checkbox: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Checkbox</h2>
    <p>Content</p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('CheckboxCompForm') },
        { name: 'Checkbox.tsx', code: getRaw('components/Checkbox') },
      ]}
    >
      <CheckboxCompForm />
    </Implementation>
  </DocsContentLayout>
);
