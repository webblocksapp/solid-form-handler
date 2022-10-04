import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const IsFormInvalid: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">isFormInvalid</h2>
    <p>
      This method retrieves a boolean flag. It’s true if the form contains
      invalid fields and false when all the fields are valid.
    </p>
    <Code content={getRaw('isFormInvalidApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>Form will be invalid if it doesn't satisfy the schema constraints:</p>
    <Code content={getRaw('isFormInvalid1')} />
  </>
);
