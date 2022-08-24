import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleTextInputForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingTextInput: Component = () => (
  <DocsContentLayout prev="../validations" next="../validating-select">
    <h2 class="mb-4 border-bottom">Validating Text Input</h2>
    <p>
      Form text inputs are the easiest native HTML UI elements to validate with
      the form handler. Commonly its value is a primitive data type that can be
      a <code>string</code> or <code>number</code>. By using the{' '}
      <code>onInput</code> event we can set the value inside the form handler or
      if we have the scenario where the user interacts with the field without
      inputting some data, the <code>onBlur</code> event is used to validate the
      field, and also mark it as touched.
    </p>
    <p>
      For filling the default field value is used the <code>getFieldValue</code>{' '}
      method, for displaying the error, are used the methods{' '}
      <code>fieldHasError</code> and <code>getFieldError</code>. All of them
      receive the field name as a parameter.
    </p>
    <p>
      For doing text input validation more legible, this logic can be abstracted
      into a{' '}
      <Link noScroll href="/docs/text-input">
        TextInput.tsx
      </Link>{' '}
      component.
    </p>
    <Implementation code={getRaw('SingleTextInputForm')}>
      <SingleTextInputForm />
    </Implementation>
  </DocsContentLayout>
);
