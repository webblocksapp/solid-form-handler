import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleSelectForm } from '@implementations';

export const ValidatingSelect: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Select</h2>
    <Implementation code={getRaw('SingleSelectForm')}>
      <SingleSelectForm />
    </Implementation>
  </DocsContentLayout>
);
