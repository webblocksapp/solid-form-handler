import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const IsFieldValidating: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">isFieldValidating</h2>
      <p>
        Form field boolean signal triggered when <code>validateForm</code> or{' '}
        <code>validateField</code> methods are executed. Useful for adding a
        loading spinner on async form field validations.
      </p>
      <Code content={getRaw('isFieldValidatingApi')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('isFieldValidating1')} />
    </>
  );
};
