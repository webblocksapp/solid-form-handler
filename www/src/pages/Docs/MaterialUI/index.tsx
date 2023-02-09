import { Component } from 'solid-js';
import { SUID_URL } from '@constants';
import { CodeTabs, Implementation, Tabs } from '@components';
import { YupSuidUserForm, ZodSuidUserForm } from '@implementations';
import { getRaw } from '@utils';

export const MaterialUI: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Material UI (SUID)</h2>
    <p>
      Solid Material UI (SUID) is a work-in-progress port of React Material UI
      maintained by{' '}
      <a href="https://github.com/juanrgm" target="blank">
        juanrgm
      </a>
      . It provides a fully equipped set of UI components that implements
      Google's Material Design. You can visit the{' '}
      <a href={SUID_URL} target="blank">
        official SUID docs here
      </a>
      .
    </p>
    <p>
      The following example shows how to build your form field components using
      the form handler and SUID:
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
                  code: getRaw('SuidUserForm/yup/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('SuidUserForm/yup/schema.ts'),
                },
                {
                  name: 'types.ts',
                  code: getRaw('SuidUserForm/yup/types.ts'),
                },
              ]}
            >
              <YupSuidUserForm />
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
                  code: getRaw('SuidUserForm/zod/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('SuidUserForm/zod/schema.ts'),
                },
              ]}
            >
              <ZodSuidUserForm />
            </Implementation>
          ),
        },
      ]}
    />
    <p class="mt-3">
      <b>Components code:</b>
    </p>
    <CodeTabs
      tabs={[
        {
          name: 'TextInput.tsx',
          code: getRaw('components/suid/TextInput/index.tsx'),
        },
        {
          name: 'Select.tsx',
          code: getRaw('components/suid/Select/index.tsx'),
        },
        {
          name: 'Checkbox.tsx',
          code: getRaw('components/suid/Checkbox/index.tsx'),
        },
        {
          name: 'Checkboxes.tsx',
          code: getRaw('components/suid/Checkboxes/index.tsx'),
        },
        {
          name: 'Radio.tsx',
          code: getRaw('components/suid/Radio/index.tsx'),
        },
        {
          name: 'Radios.tsx',
          code: getRaw('components/suid/Radios/index.tsx'),
        },
      ]}
    />
  </>
);
