import { Component } from 'solid-js';
import { YupReferralsForm, ZodReferralsForm } from '@implementations';
import { getRaw } from '@utils';
import { Implementation, Tabs } from '@components';

export const DynamicNestedForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Dynamic Nested Form</h2>
    <p>
      Nested arrays can be handled with the form handler as nested fieldsets,
      the following example shows how to implement adding, sorting, and removing
      operations for a nested set of fields.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'ReferralsForm.tsx',
                  code: getRaw('ReferralsForm/yup/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('ReferralsForm/yup/schema.ts'),
                },
                {
                  name: 'types.ts',
                  code: getRaw('ReferralsForm/yup/types.ts'),
                },
              ]}
            >
              <YupReferralsForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'ReferralsForm.tsx',
                  code: getRaw('ReferralsForm/zod/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('ReferralsForm/zod/schema.ts'),
                },
              ]}
            >
              <ZodReferralsForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
