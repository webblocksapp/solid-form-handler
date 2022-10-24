import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const FormIsValidating: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">formIsValidating</h2>
      <p>
        Boolean signal triggered when <code>validateForm</code> method is
        executed.
      </p>
      <Code content={getRaw('formIsValidatingApi')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('formIsValidating1')} />
    </>
  );
};
