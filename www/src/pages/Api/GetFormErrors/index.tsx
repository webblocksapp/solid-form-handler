import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFormErrors: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">getFormErrors</h2>
    <p>This method retrieves each field error message from the form.</p>
    <Code content={getRaw('getFormErrorsApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFormErrors1')} />
    <p>
      <code>FormFieldError</code> is composed by:
    </p>
    <ul>
      <li>
        <code>path:</code> field name.
      </li>
      <li>
        <code>errorMessage:</code> field error.
      </li>
    </ul>
  </>
);
