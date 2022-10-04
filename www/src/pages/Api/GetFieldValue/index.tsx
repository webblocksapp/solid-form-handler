import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFieldValue: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">getFieldValue</h2>
    <p>
      This method obtains the current value of a field. The value is obtained
      from the <code>formData()</code> reactive object.
    </p>
    <Code content={getRaw('getFieldValueApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFieldValue1')} />
  </>
);
