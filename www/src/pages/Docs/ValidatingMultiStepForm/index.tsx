import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupMultiStepForm, ZodMultiStepForm } from '@implementations';

export const ValidatingMultiStepForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Multi Step Form</h2>
    <p>
      Multi step forms can be build easily with the form handler, letting you
      validate each of the steps to continue:
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'Form.tsx',
                  code: getRaw('MultiStepForm/yup/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('MultiStepForm/yup/schema.ts'),
                },
                {
                  name: 'types.ts',
                  code: getRaw('MultiStepForm/yup/types.ts'),
                },
                {
                  name: 'context.ts',
                  code: getRaw('MultiStepForm/yup/context.ts'),
                },
                {
                  name: 'Step1.tsx',
                  code: getRaw('MultiStepForm/yup/Step1.tsx'),
                },
                {
                  name: 'Step2.tsx',
                  code: getRaw('MultiStepForm/yup/Step2.tsx'),
                },
                {
                  name: 'Step3.tsx',
                  code: getRaw('MultiStepForm/yup/Step3.tsx'),
                },
              ]}
            >
              <YupMultiStepForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'Form.tsx',
                  code: getRaw('MultiStepForm/zod/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('MultiStepForm/zod/schema.ts'),
                },
                {
                  name: 'types.ts',
                  code: getRaw('MultiStepForm/zod/types.ts'),
                },
                {
                  name: 'context.ts',
                  code: getRaw('MultiStepForm/zod/context.ts'),
                },
                {
                  name: 'Step1.tsx',
                  code: getRaw('MultiStepForm/zod/Step1.tsx'),
                },
                {
                  name: 'Step2.tsx',
                  code: getRaw('MultiStepForm/zod/Step2.tsx'),
                },
                {
                  name: 'Step3.tsx',
                  code: getRaw('MultiStepForm/zod/Step3.tsx'),
                },
              ]}
            >
              <ZodMultiStepForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
