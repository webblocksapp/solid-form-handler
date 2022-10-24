import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const SetFieldTriggers: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">setFieldTriggers</h2>
    <p>
      Method for setting fields validations that depends on the current field
      validation.
    </p>
    <Code content={getRaw('setFieldTriggersApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('setFieldTriggersApi1')} />
  </>
);
