import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupUserForm, ZodUserForm } from '@implementations';

export const FormValidation: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Form Validation</h2>
    <p>
      Form validation will depend on how well you have defined the validation
      schema. Once settled, the form handler will receive it for controlling the
      defined data validations.{' '}
    </p>
    <p>The following example shows a basic usage:</p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'UserForm.tsx',
                  code: getRaw('UserForm/yup/index.tsx'),
                },
                { name: 'schema.ts', code: getRaw('UserForm/yup/schema.ts') },
                { name: 'types.ts', code: getRaw('UserForm/yup/types.ts') },
              ]}
            >
              <YupUserForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'UserForm.tsx',
                  code: getRaw('UserForm/zod/index.tsx'),
                },
                { name: 'schema.ts', code: getRaw('UserForm/zod/schema.ts') },
              ]}
            >
              <ZodUserForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
