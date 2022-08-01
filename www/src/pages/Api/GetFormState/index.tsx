import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFormState: Component = () => (
  <DocsContentLayout prev="/api/is-form-invalid" next="/api/set-field-value">
    <h2 class="mb-4 border-bottom">getFormState</h2>
    <p>
      This method returns an object which shows the user's interactions with the
      form.
    </p>
    <Code content={getRaw('getFormStateApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFormState1')} />
    <p>
      <code>FormState</code> is composed by:
    </p>
    <ul>
      <li>
        <code>__state:</code> a placeholder to indicate this form field has an
        state. Always <code>true</code>.
      </li>
      <li>
        <code>isInvalid:</code> is invalid boolean flag.
      </li>
      <li>
        <code>errorMessage:</code> field validation error message.
      </li>
      <li>
        <code>initialValue:</code> initial field value.
      </li>
      <li>
        <code>touched:</code> becomes <code>true</code> if the user has
        interacted with the form field.
      </li>
      <li>
        <code>dirty:</code> becomes <code>true</code> if the field current value
        is different from initial value. Field current value is stored at{' '}
        <code>formData()</code>
      </li>
    </ul>
  </DocsContentLayout>
);
