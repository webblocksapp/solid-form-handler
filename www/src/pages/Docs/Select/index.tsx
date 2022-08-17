import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SelectCompForm } from '@implementations';

export const Select: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Select</h2>
    <p>Content</p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('SelectCompForm') },
        { name: 'Select.tsx', code: getRaw('components/Select') },
      ]}
    >
      <SelectCompForm />
    </Implementation>
  </DocsContentLayout>
);
