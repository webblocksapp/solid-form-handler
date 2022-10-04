import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const ValidateField: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">validateField</h2>
    <p>
      This method validates a single field. It updates the form state by adding
      the field error message and is invalid flag to <code>true</code> when the
      field is invalid.
    </p>
    <Code content={getRaw('validateFieldApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('validateField1')} />
    <p>
      <code>options</code> is composed by:
    </p>
    <ul>
      <li>
        <code>silentValidation:</code> by default is <code>false</code>. When
        set to <code>true</code> validation error message is not displayed.
      </li>
    </ul>
  </>
);
