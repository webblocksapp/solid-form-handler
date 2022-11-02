import { Implementation } from '@components';
import {
  ConditionalValidationForm,
  PasswordConfirmForm,
} from '@implementations';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const DependantValidations: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">Dependant Validations</h2>
      <p>
        You will have scenarios where a field on every value change needs to
        trigger the validation of a dependent field, a classic example is the
        fields couple password and password confirm: when a field receives
        interaction the other is validated and vice versa. At this point, the{' '}
        <code>triggers</code> property defined on each form component is used.
      </p>
      <Implementation
        codeTabs={[
          {
            name: 'Form.tsx',
            code: getRaw('PasswordConfirmForm/index.tsx'),
          },
          { name: 'schema.ts', code: getRaw('PasswordConfirmForm/schema.ts') },
          { name: 'types.ts', code: getRaw('PasswordConfirmForm/types.ts') },
        ]}
      >
        <PasswordConfirmForm />
      </Implementation>
      <p class="mt-4">
        Also you can have scenarios where you have a conditional validation. The
        following example makes required the <code>email</code> field when the{' '}
        <code>isAdult</code> field is marked.
      </p>
      <Implementation
        codeTabs={[
          {
            name: 'Form.tsx',
            code: getRaw('ConditionalValidationForm/index.tsx'),
          },
          {
            name: 'schema.ts',
            code: getRaw('ConditionalValidationForm/schema.ts'),
          },
          {
            name: 'types.ts',
            code: getRaw('ConditionalValidationForm/types.ts'),
          },
        ]}
      >
        <ConditionalValidationForm />
      </Implementation>
    </>
  );
};
