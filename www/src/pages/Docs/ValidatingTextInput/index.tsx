import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleTextInputForm } from '@implementations';

export const ValidatingTextInput: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Text Input</h2>
    <Implementation code={getRaw('SingleTextInputForm')}>
      <SingleTextInputForm />
    </Implementation>
  </DocsContentLayout>
);
