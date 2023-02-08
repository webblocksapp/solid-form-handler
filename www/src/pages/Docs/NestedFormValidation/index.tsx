import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupPersonForm, ZodPersonForm } from '@implementations';

export const NestedFormValidation: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Nested Form Validation</h2>
    <p>
      Complex data structures as nested objects can be handled with the form
      handler, the following example shows how to implement it:
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'PersonForm.tsx',
                  code: getRaw('PersonForm/yup/index.tsx'),
                },
                { name: 'schema.ts', code: getRaw('PersonForm/yup/schema.ts') },
                { name: 'types.ts', code: getRaw('PersonForm/yup/types.ts') },
              ]}
            >
              <YupPersonForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'PersonForm.tsx',
                  code: getRaw('PersonForm/zod/index.tsx'),
                },
                { name: 'schema.ts', code: getRaw('PersonForm/zod/schema.ts') },
                { name: 'types.ts', code: getRaw('PersonForm/zod/types.ts') },
              ]}
            >
              <ZodPersonForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
