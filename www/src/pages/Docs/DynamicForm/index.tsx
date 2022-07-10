import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { ProductsForm } from '@implementations';
import { getRaw } from '@utils';
import { Implementation } from '@components';

export const DynamicForm: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Dynamic Form</h2>
    <p>
      Adding, sorting, and removing fieldsets is simplified with the formHandler
      instance. The following example shows how to implement those operations
      and execute validations easily.
    </p>

    <Implementation code={getRaw('ProductsForm')}>
      <ProductsForm />
    </Implementation>
  </DocsContentLayout>
);
