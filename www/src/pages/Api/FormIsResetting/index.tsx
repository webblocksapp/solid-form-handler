import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const FormIsResetting: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">formIsResetting</h2>
      <p>
        Boolean signal triggered when <code>resetForm</code> method is executed.
      </p>
      <Code content={getRaw('formIsResettingApi')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('formIsResetting1')} />
    </>
  );
};
