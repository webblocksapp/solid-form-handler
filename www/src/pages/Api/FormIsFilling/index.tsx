import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const FormIsFilling: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">formIsFilling</h2>
      <p>
        Boolean signal triggered when <code>fillForm</code> method is executed.
      </p>
      <Code content={getRaw('formIsFillingApi')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('formIsFilling1')} />
    </>
  );
};
