import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { RadiosForm } from '@implementations';

export const ValidatingRadios: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Radios</h2>
    <Implementation code={getRaw('RadiosForm')}>
      <RadiosForm />
    </Implementation>
  </DocsContentLayout>
);
