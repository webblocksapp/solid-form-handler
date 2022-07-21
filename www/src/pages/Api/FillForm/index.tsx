import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FillForm: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">fillForm</h2>
    <p>This method allows to pre-load data inside a form.</p>
    <Code content={getRaw('fillFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('fillForm1')} />
  </DocsContentLayout>
);
