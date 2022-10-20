import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const SetFieldValue: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">setFieldValue</h2>
    <p>This method sets and validates the value of a form field.</p>
    <Code content={getRaw('setFieldValueApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('setFieldValue1')} />
    <p>
      <code>SetFieldValueOptions</code> is composed by:
    </p>
    <ul>
      <li>
        <code>validate:</code> by default is <code>true</code>. You can pass{' '}
        <code>false</code> if you want to avoid triggering the validation when
        value is set.
      </li>
      <li>
        <code>silentValidation:</code> by default is <code>false</code>. No
        error message is displayed when set to <code>true</code>.
      </li>
      <li>
        <code>touch:</code> by default is <code>true</code>.
      </li>
      <li>
        <code>dirty:</code> by default is <code>true</code>.
      </li>
      <li>
        <code>htmlElement:</code> by default is <code>undefined</code>. You can
        store the field html element from the event.
      </li>
      <li>
        <code>validateOn:</code> receives an array of event types, as for
        example ['input', 'change', 'aCustomEvent']. The field will be validated
        if it matches the event types set at <code>formHandler</code> instance.
      </li>
      <li>
        <code>delay:</code> by default is <code>0</code>. It will debounce
        validations with the given delay time in milliseconds.
      </li>
      <li>
        <code>forceValidate:</code> by default is <code>false</code>. The form
        field always will be validated if set to <code>true</code> bypassing any
        validation caching.
      </li>
      <li>
        <code>mapValue:</code> receives a function for mapping the current
        value.
      </li>
    </ul>
  </>
);
