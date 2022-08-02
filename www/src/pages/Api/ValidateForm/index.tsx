import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateForm: Component = () => (
  <DocsContentLayout prev="/api/validate-field" next="/api/add-fieldset">
    <h2 class="mb-4 border-bottom">validateForm</h2>
    <p>This method validates all the form fields.</p>
    <Code content={getRaw('validateFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>
      When the form is valid, <code>true</code> is returned.
    </p>
    <Code content={getRaw('validateForm1')} />
    <p>
      Also you can throw an error with the invalid fields error messages when
      the <code>catchError</code> option is set to <code>true</code>.
    </p>
    <Code content={getRaw('validateForm2')} />
    <p>
      <code>FormErrorsException</code> is an array composed by:
    </p>
    <ul>
      <li>
        <code>path:</code> field's name.
      </li>
      <li>
        <code>errorMessage:</code> field's validation error message.
      </li>
    </ul>
  </DocsContentLayout>
);