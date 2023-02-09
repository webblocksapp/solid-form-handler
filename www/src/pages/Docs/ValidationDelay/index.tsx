import { Implementation, Tabs } from '@components';
import {
  YupValidationDelayForm,
  ZodValidationDelayForm,
} from '@implementations';
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
      <Tabs
        tabs={[
          {
            text: 'yup',
            children: (
              <Implementation
                codeTabs={[
                  {
                    name: 'Form.tsx',
                    code: getRaw('ValidationDelayForm/yup/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ValidationDelayForm/yup/schema.ts'),
                  },
                  {
                    name: 'types.ts',
                    code: getRaw('ValidationDelayForm/yup/types.ts'),
                  },
                ]}
              >
                <YupValidationDelayForm />
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
                    code: getRaw('ValidationDelayForm/zod/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ValidationDelayForm/zod/schema.ts'),
                  },
                ]}
              >
                <ZodValidationDelayForm />
              </Implementation>
            ),
          },
        ]}
      />
    </>
  );
};
