import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const AddFieldset: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">addFieldset</h2>
    <p>
      Method for manipulating dynamic forms. It adds a subset of fields when the
      form is an array of fieldsets.
    </p>
    <Code content={getRaw('addFieldsetApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('addFieldset1')} />
  </DocsContentLayout>
);
