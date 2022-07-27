import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const SetFieldValue: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">setFieldValue</h2>
    <p>This method sets and validates the value of a form field.</p>
    <Code content={getRaw('setFieldValueApi')} />
  </DocsContentLayout>
);
