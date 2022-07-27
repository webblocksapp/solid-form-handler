import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const MoveFieldset: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">moveFieldset</h2>
    <p>
      Method for manipulating dynamic forms. It lets to move a fieldset inside
      the array of fieldsets.
    </p>
    <Code content={getRaw('moveFieldsetApi')} />
  </DocsContentLayout>
);
