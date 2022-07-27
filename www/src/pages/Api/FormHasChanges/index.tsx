import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FormHasChanges: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">formHasChanges</h2>
    <p>This method returns a boolean flag, true if the form has changes.</p>
    <Code content={getRaw('formHasChangesApi')} />
  </DocsContentLayout>
);
