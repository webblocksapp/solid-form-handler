import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { UserForm } from '@implementations';

export const FormValidation: Component = () => (
  <DocsContentLayout prev="/docs/validation-schema" next="/docs/dynamic-form">
    <h2 class="mb-4 border-bottom">Form Validation</h2>
    <p>
      Form validation will depend on how well you have defined the Yup schema.
      Once settled, the form handler will receive it for controlling the defined
      data validations.{' '}
    </p>
    <p>The following example shows a basic usage:</p>
    <Implementation
      codeTabs={[
        { name: 'UserForm.tsx', code: getRaw('UserForm/index.tsx') },
        { name: 'schema.ts', code: getRaw('UserForm/schema.ts') },
        { name: 'types.ts', code: getRaw('UserForm/types.ts') },
      ]}
    >
      <UserForm />
    </Implementation>
  </DocsContentLayout>
);
