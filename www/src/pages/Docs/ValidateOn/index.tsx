import { Implementation, Tabs } from '@components';
import { YupValidateOnForm, ZodValidateOnForm } from '@implementations';
import { Link } from '@solidjs/router';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const ValidateOn: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">Validate On</h2>
      <p>
        You can specify single or multiple events in which your form fields can
        be validated, for example, to be validated only on input or on input and
        on blur. For this, you can use the form handler option{' '}
        <code>validateOn</code> which receives an array of the desired events.
      </p>
      <p>
        You can check at{' '}
        <Link href="../components" target="blank">
          components'
        </Link>{' '}
        documentation on how the <code>validateOn</code> option is implemented
        on every single component definition too.
      </p>
      <p>
        In the following example, the form handler is configured to validate
        only at on blur event.
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
                    code: getRaw('ValidateOnForm/yup/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ValidateOnForm/yup/schema.ts'),
                  },
                  {
                    name: 'types.ts',
                    code: getRaw('ValidateOnForm/yup/types.ts'),
                  },
                ]}
              >
                <YupValidateOnForm />
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
                    code: getRaw('ValidateOnForm/zod/index.tsx'),
                  },
                  {
                    name: 'schema.ts',
                    code: getRaw('ValidateOnForm/zod/schema.ts'),
                  },
                ]}
              >
                <ZodValidateOnForm />
              </Implementation>
            ),
          },
        ]}
      />
    </>
  );
};
