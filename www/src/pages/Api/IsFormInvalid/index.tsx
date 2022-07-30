import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const IsFormInvalid: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">isFormInvalid</h2>
    <p>
      This method retrieves a boolean flag. It’s true if the form contains
      invalid fields and false when all the fields are valid.
    </p>
    <Code content={getRaw('isFormInvalidApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>
      Form will be invalid if it doesn't satisfy the Yup schema constraints:
    </p>
    <Code content={getRaw('isFormInvalid1')} />
  </DocsContentLayout>
);
