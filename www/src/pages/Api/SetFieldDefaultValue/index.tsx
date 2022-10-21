import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const SetFieldDefaultValue: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">setFieldDefaultValue</h2>
    <p>
      Sets the default field value which will be used when the form is
      initialized or reset. No validation is triggered.
    </p>
    <Code content={getRaw('setFieldDefaultValueApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('setFieldDefaultValue1')} />
    <p>
      <code>options</code> are composed by:
    </p>
    <ul>
      <li>
        <code>mapValue:</code> receives a function for mapping the default
        value.
      </li>
    </ul>
  </>
);
