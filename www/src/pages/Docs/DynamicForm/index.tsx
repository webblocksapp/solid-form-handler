import { Component } from 'solid-js';
import { ProductsForm } from '@implementations';
import { getRaw } from '@utils';
import { Implementation } from '@components';

export const DynamicForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Dynamic Form</h2>
    <p>
      Adding, sorting, and removing fieldsets is simplified with the formHandler
      instance. The following example shows how to implement those operations
      and execute validations easily.
    </p>

    <Implementation
      codeTabs={[
        { name: 'ProductsForm.tsx', code: getRaw('ProductsForm/index.tsx') },
        { name: 'schema.ts', code: getRaw('ProductsForm/schema.ts') },
        { name: 'types.ts', code: getRaw('ProductsForm/types.ts') },
      ]}
    >
      <ProductsForm />
    </Implementation>
  </>
);
