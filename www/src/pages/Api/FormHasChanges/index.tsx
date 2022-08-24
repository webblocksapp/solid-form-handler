import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FormHasChanges: Component = () => (
  <DocsContentLayout prev="../refresh-form-field" next="../validate-field">
    <h2 class="mb-4 border-bottom">formHasChanges</h2>
    <p>
      This method returns a boolean flag, <code>true</code> if the form has
      changes.
    </p>
    <Code content={getRaw('formHasChangesApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>Form detects changes when setting a field value:</p>
    <Code content={getRaw('formHasChanges1')} />
    <p>Also when filling a form:</p>
    <Code content={getRaw('formHasChanges2')} />
  </DocsContentLayout>
);
