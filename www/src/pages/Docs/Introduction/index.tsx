import { Component } from 'solid-js';
import { SOLID_JS_STORES_URL } from '@constants';
import { DocsContentLayout } from '@layouts';
import { Link } from '@solidjs/router';

export const Introduction: Component = () => (
  <DocsContentLayout next="../setup">
    <h2 class="mb-4 border-bottom">Introduction</h2>
    <p>
      <b>solidjs-form-handler</b> is a lightweight library for building form
      components and validating forms with them. Under the hood, it works with
      the built-in granular reactivity of{' '}
      <a href={SOLID_JS_STORES_URL} target="blank">
        SolidJS stores
      </a>
      .
    </p>
    <p>
      It uses as a third-party library the yup object schema for data assertion
      however other validators will be supported in the future.
    </p>
    <p>
      As a big difference from other form validation libraries, it won't provide
      built-in components like <b>&lt;Form /&gt;</b>, or magic methods/utilities
      that append the reactivity and error reporting at form field components,
      which doesn't work in all cases, specifically if you need to work with
      complex UI libraries.
    </p>
    <p>
      <b>solidjs-form-handler</b> encourages you as a developer to build your
      own <Link href="/docs/components">custom form components</Link> by using
      its reactive APIs. This documentation will have a detailed guide on how to
      create them so you can adapt lately those examples with any UI library of
      preference.
    </p>
    <p>
      Advantages of using <b>solidjs-form-handler</b>:
    </p>

    <ul>
      <li>Gives full control of your form components definition.</li>
      <li>
        Integrated with yup to ease form schema definition - Other validators
        will be supported in the future.
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
  </DocsContentLayout>
);
