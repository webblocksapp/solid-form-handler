import { Implementation } from '@components';
import { PasswordConfirmForm } from '@implementations';
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
      <p>
        Triggers are optimized to be run when the user has interacted with the
        dependant field.
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
    </>
  );
};
