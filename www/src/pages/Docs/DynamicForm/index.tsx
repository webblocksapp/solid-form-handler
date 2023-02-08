import { Component } from 'solid-js';
import { YupProductsForm, ZodProductsForm } from '@implementations';
import { getRaw } from '@utils';
import { Implementation, Tabs } from '@components';

export const DynamicForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Dynamic Form</h2>
    <p>
      Adding, sorting, and removing fieldsets is simplified with the formHandler
      instance. The following example shows how to implement those operations
      and execute validations easily.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'ProductsForm.tsx',
                  code: getRaw('ProductsForm/yup/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('ProductsForm/yup/schema.ts'),
                },
                { name: 'types.ts', code: getRaw('ProductsForm/yup/types.ts') },
              ]}
            >
              <YupProductsForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                {
                  name: 'ProductsForm.tsx',
                  code: getRaw('ProductsForm/zod/index.tsx'),
                },
                {
                  name: 'schema.ts',
                  code: getRaw('ProductsForm/zod/schema.ts'),
                },
              ]}
            >
              <ZodProductsForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
