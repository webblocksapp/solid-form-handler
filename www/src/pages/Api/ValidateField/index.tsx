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
        <code>silentValidation:</code> by default is <code>false</code>. No
        error message is displayed when set to <code>true</code>.
      </li>
      <li>
        <code>validateOn:</code> receives an array of event types, as for
        example <code>['input', 'change', 'aCustomEvent']</code>. The field will
        be validated if it matches the event types set at{' '}
        <code>formHandler</code> instance.
      </li>
      <li>
        <code>delay:</code> by default is <code>0</code>. It will debounce
        validations with the given delay time in milliseconds.
      </li>
      <li>
        <code>force:</code> by default is <code>false</code>. The form field
        always will be validated if set to <code>true</code> bypassing any
        validation caching.
      </li>
    </ul>
  </>
);
