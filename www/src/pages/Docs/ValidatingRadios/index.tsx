import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { RadiosForm } from '@implementations';

export const ValidatingRadios: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Radios</h2>
    <p>
      Radios offer multiple options but the value checked is a{' '}
      <code>string</code> or <code>number</code>
      datatype. By using the <code>onChange</code> event, the checked value is
      stored on the form handler.
    </p>
    <p>
      For filling the default field value, it's added the logic for mark as
      checked the radio if its value is equal to the field value stored at form
      handler.
    </p>
    <Implementation code={getRaw('RadiosForm')}>
      <RadiosForm />
    </Implementation>
  </DocsContentLayout>
);
