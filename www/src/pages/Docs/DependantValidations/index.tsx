import { Implementation, Tabs } from '@components';
import {
  YupConditionalValidationForm,
  ZodConditionalValidationForm,
  YupPasswordConfirmForm,
  ZodPasswordConfirmForm,
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
      <Tabs
        tabs={[
          {
            text: 'yup',
            children: (
              <Implementation
                codeTabs={[
                  {
                    name: 'Form.tsx',
                    code: getRaw('PasswordConfirmForm/yup/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('PasswordConfirmForm/yup/schema.ts'),
                  },
                  {
                    name: 'types.ts',
                    code: getRaw('PasswordConfirmForm/yup/types.ts'),
                  },
                ]}
              >
                <YupPasswordConfirmForm />
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
                    code: getRaw('PasswordConfirmForm/zod/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('PasswordConfirmForm/zod/schema.ts'),
                  },
                ]}
              >
                <ZodPasswordConfirmForm />
              </Implementation>
            ),
          },
        ]}
      />
      <p class="mt-4">
        Also you can have scenarios where you have a conditional validation. The
        following example makes required the <code>email</code> field when the{' '}
        <code>isAdult</code> field is marked.
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
                    code: getRaw('ConditionalValidationForm/yup/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ConditionalValidationForm/yup/schema.ts'),
                  },
                  {
                    name: 'types.ts',
                    code: getRaw('ConditionalValidationForm/yup/types.ts'),
                  },
                ]}
              >
                <YupConditionalValidationForm />
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
                    code: getRaw('ConditionalValidationForm/zod/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ConditionalValidationForm/zod/schema.ts'),
                  },
                ]}
              >
                <ZodConditionalValidationForm />
              </Implementation>
            ),
          },
        ]}
      />
    </>
  );
};
