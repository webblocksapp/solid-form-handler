import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxesCompForm } from '@implementations';

export const Checkboxes: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Checkboxes</h2>
    <p>Content</p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('CheckboxesCompForm') },
        { name: 'Checkboxes.tsx', code: getRaw('components/Checkboxes') },
      ]}
    >
      <CheckboxesCompForm />
    </Implementation>
  </DocsContentLayout>
);
