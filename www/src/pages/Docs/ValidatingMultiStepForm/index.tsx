import { Component } from 'solid-js';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { MultiStepForm } from '@implementations';

export const ValidatingMultiStepForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Multi Step Form</h2>
    <p>
      Multi step forms can be build easily with the form handler, letting you
      validate each of the steps to continue:
    </p>
    <Implementation
      codeTabs={[
        {
          name: 'Form.tsx',
          code: getRaw('MultiStepForm/index.tsx'),
        },
        { name: 'schema.ts', code: getRaw('MultiStepForm/schema.ts') },
        { name: 'types.ts', code: getRaw('MultiStepForm/types.ts') },
        { name: 'context.ts', code: getRaw('MultiStepForm/context.ts') },
        { name: 'Step1.tsx', code: getRaw('MultiStepForm/Step1.tsx') },
        { name: 'Step2.tsx', code: getRaw('MultiStepForm/Step2.tsx') },
        { name: 'Step3.tsx', code: getRaw('MultiStepForm/Step3.tsx') },
      ]}
    >
      <MultiStepForm />
    </Implementation>
  </>
);
