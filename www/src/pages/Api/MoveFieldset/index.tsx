import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const MoveFieldset: Component = () => (
  <DocsContentLayout prev="/api/add-fieldset" next="/api/remove-fieldset">
    <h2 class="mb-4 border-bottom">moveFieldset</h2>
    <p>
      Method for manipulating dynamic forms. It lets to move a fieldset inside
      the array of fieldsets.
    </p>
    <Code content={getRaw('moveFieldsetApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('moveFieldset1')} />
  </DocsContentLayout>
);
