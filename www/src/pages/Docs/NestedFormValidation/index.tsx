import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { PersonForm } from '@implementations';

export const NestedFormValidation: Component = () => (
  <DocsContentLayout prev="../dynamic-form" next="../dynamic-nested-form">
    <h2 class="mb-4 border-bottom">Nested Form Validation</h2>
    <p>Content.</p>
    <Implementation
      codeTabs={[
        { name: 'PersonForm.tsx', code: getRaw('PersonForm/index.tsx') },
        { name: 'schema.ts', code: getRaw('PersonForm/schema.ts') },
        { name: 'types.ts', code: getRaw('PersonForm/types.ts') },
      ]}
    >
      <PersonForm />
    </Implementation>
  </DocsContentLayout>
);
