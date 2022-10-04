import { Component } from 'solid-js';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { PersonForm } from '@implementations';

export const NestedFormValidation: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Nested Form Validation</h2>
    <p>
      Complex data structures as nested objects can be handled with the form
      handler, the following example shows how to implement it:
    </p>
    <Implementation
      codeTabs={[
        { name: 'PersonForm.tsx', code: getRaw('PersonForm/index.tsx') },
        { name: 'schema.ts', code: getRaw('PersonForm/schema.ts') },
        { name: 'types.ts', code: getRaw('PersonForm/types.ts') },
      ]}
    >
      <PersonForm />
    </Implementation>
  </>
);
