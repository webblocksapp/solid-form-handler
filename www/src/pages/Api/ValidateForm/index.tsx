import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">validateForm</h2>
    <p>This method validates all the form fields.</p>
    <Code content={getRaw('validateFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>
      When the form is invalid, it throws an error with the invalid fields error
      messages.
    </p>
    <Code content={getRaw('validateForm1')} />
    <p>
      <code>FormErrorsException</code> is an array composed by:
    </p>
    <ul>
      <li>
        <code>path:</code> field's name.
      </li>
      <li>
        <code>message:</code> field's validation error message.
      </li>
    </ul>
  </>
);
