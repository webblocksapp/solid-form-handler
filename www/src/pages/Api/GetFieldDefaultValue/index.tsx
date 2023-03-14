import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFieldDefaultValue: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">getFieldDefaultValue</h2>
    <p>This method obtains the default value of a field from the form state.</p>
    <Code content={getRaw('getFieldDefaultValueApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFieldDefaultValue1')} />
  </>
);
