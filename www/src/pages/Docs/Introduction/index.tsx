import { Component } from 'solid-js';
import { SOLID_JS_STORES_URL } from '@constants';
import { Link } from '@solidjs/router';

export const Introduction: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Introduction</h2>
    <p>
      <b>solid-form-handler</b> is a fully equipped library for building form
      components and validating forms with them. Under the hood, it works with
      the built-in granular reactivity of{' '}
      <a href={SOLID_JS_STORES_URL} target="blank">
        SolidJS stores
      </a>
      .
    </p>
    <p>
      It supports the following data assertion libraries: <b>yup</b> and{' '}
      <b>zod</b>, however other validators will be supported in the future.
    </p>
    <p>
      <b>solid-form-handler</b> helps you during development to build/extend{' '}
      <Link href="/docs/components">form components</Link> by using the
      library's reactive APIs. This documentation contains implementation
      examples, so you can adapt them lately with any UI library of preference
      or CSS framework.
    </p>
    <p>
      Advantages of using <b>solid-form-handler</b>:
    </p>
    <ul>
      <li>Gives full control of your form components definition.</li>
      <li>
        Integrated with <b>yup</b> and <b>zod</b> to ease form schema definition
        - Other validators will be supported in the future.
      </li>
      <li>Full reactivity during form input, validation, and submission.</li>
      <li>
        Simple manipulation of fieldsets (array of fields or dynamic forms).
      </li>
      <li>Simple validation of complex data structures.</li>
      <li>
        Very intuitive <Link href="/api">APIs.</Link>
      </li>
      <li>Can be used on any SolidJS UI library or CSS framework.</li>
    </ul>
  </>
);
