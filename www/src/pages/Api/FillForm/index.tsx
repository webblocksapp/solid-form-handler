import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FillForm: Component = () => (
  <DocsContentLayout next="/api/reset-form">
    <h2 class="mb-4 border-bottom">fillForm</h2>
    <p>This method allows to pre-load data inside a form.</p>
    <Code content={getRaw('fillFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>Having the following schema:</p>
    <Code content={getRaw('schema1')} />
    <p>
      The form has the fields <code>name</code> and <code>age</code>. It can be
      filled completely:
    </p>
    <Code content={getRaw('fillForm1')} />
    <p>Or partially:</p>
    <Code content={getRaw('fillForm2')} />
  </DocsContentLayout>
);
