import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { ReferralsForm } from '@implementations';
import { getRaw } from '@utils';
import { Implementation } from '@components';

export const DynamicNestedForm: Component = () => (
  <DocsContentLayout prev="../nested-form-validation">
    <h2 class="mb-4 border-bottom">Dynamic Form</h2>
    <p>Content.</p>

    <Implementation
      codeTabs={[
        { name: 'ReferralsForm.tsx', code: getRaw('ReferralsForm/index.tsx') },
        { name: 'schema.ts', code: getRaw('ReferralsForm/schema.ts') },
        { name: 'types.ts', code: getRaw('ReferralsForm/types.ts') },
      ]}
    >
      <ReferralsForm />
    </Implementation>
  </DocsContentLayout>
);
