import { Code } from '@components';
import { YUP_URL } from '@constants';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const ValidationSchema: Component = () => (
  <DocsContentLayout prev="/docs/setup" next="/docs/form-validation">
    <h2 class="mb-4 border-bottom">Validation Schema</h2>
    <p>
      To start using <b>solid-form-handler</b>, it's very important you are
      familiar with <i>Yup object schema validator</i>, to take advantage of
      this lib. If not, please take a deep look at the{' '}
      <i>
        <a href={YUP_URL} target="blank">
          Yup official documentation
        </a>
      </i>
      . Complex data models will be represented with <i>Yup</i>, so you will
      need to know in deep the possible object assertions you can build with
      this.
    </p>
    <p>Schemas can be defined as follows:</p>
    <Code content={getRaw('userSchema')} />
    <p>
      For this example the <code>userSchema</code> is representing the following
      data structure:
    </p>

    <ul>
      <li>
        required <code>name</code> of type <code>string</code>
      </li>
      <li>
        required <code>age</code> of type <code>number</code>
      </li>
      <li>
        required <code>birthDate</code> of type <code>date</code>
      </li>
      <li>
        required <code>contacts</code> of type <code>Contact[]</code>
      </li>
    </ul>
  </DocsContentLayout>
);
