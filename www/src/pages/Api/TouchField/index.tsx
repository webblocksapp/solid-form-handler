import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const TouchField: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">touchField</h2>
    <p>
      This method marks the field as touched to determine if the user has
      interacted with the form component. A <code>true</code> flag is stored at
      form state.
    </p>
    <Code content={getRaw('touchFieldApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('touchField1')} />
  </>
);
