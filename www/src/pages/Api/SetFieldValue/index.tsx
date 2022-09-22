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
        <code>touch:</code> by default is <code>true</code>.
      </li>
      <li>
        <code>dirty:</code> by default is <code>true</code>.
      </li>
      <li>
        <code>htmlElement:</code> by default is <code>undefined</code>. You can
        store the field html element from the event.
      </li>
    </ul>
  </>
);
