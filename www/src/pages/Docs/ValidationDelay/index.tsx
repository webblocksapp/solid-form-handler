import { Implementation } from '@components';
import { ValidationDelayForm } from '@implementations';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const ValidationDelay: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">Validation Delay</h2>
      <p>
        Validations can be delayed to avoid expensive validations on every value
        change. The form handler will debounce them, specially if you need to
        work with async validations.
      </p>
      <Implementation
        codeTabs={[
          {
            name: 'Form.tsx',
            code: getRaw('ValidationDelayForm/index.tsx'),
          },
          {
            name: 'schema.ts',
            code: getRaw('ValidationDelayForm/schema.ts'),
          },
          {
            name: 'types.ts',
            code: getRaw('ValidationDelayForm/types.ts'),
          },
        ]}
      >
        <ValidationDelayForm />
      </Implementation>
    </>
  );
};
