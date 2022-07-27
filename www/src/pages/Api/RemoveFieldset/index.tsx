import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const RemoveFieldset: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">removeFieldset</h2>
    <p>
      Method for manipulating dynamic forms. It lets to remove a fieldset inside
      from the array of fieldsets.
    </p>
    <Code content={getRaw('removeFieldsetApi')} />
  </DocsContentLayout>
);
