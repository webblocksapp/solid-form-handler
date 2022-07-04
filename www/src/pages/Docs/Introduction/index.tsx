import { Component } from 'solid-js';
import { SOLID_JS_URL, YUP_URL } from '@constants';
import { DocsContentLayout } from '@layouts';

export const Introduction: Component = () => (
  <DocsContentLayout next="/docs/setup">
    <h2 class="mb-4 border-bottom">Introduction</h2>
    <p>
      <b>solidjs-form-handler</b> is a lightweight library that uses the built-in granular reactivity of{' '}
      <i>
        <a href={SOLID_JS_URL} target="blank">
          SolidJS
        </a>
      </i>{' '}
      for writing and validating forms with the help of{' '}
      <i>
        <a href={YUP_URL} target="blank">
          Yup object schema validator
        </a>
      </i>
      .
    </p>
    <p>
      Some of the advantages of using <b>solidjs-form-handler</b> are:
    </p>
    <ul>
      <li>
        It's integrated with{' '}
        <i>
          <a href={YUP_URL} target="blank">
            Yup
          </a>
        </i>{' '}
        to ease form schema definition.
      </li>
      <li>Full reactivity during form input, validation and submission.</li>
      <li>Simple manipulation of fieldsets (array of fields or dynamic forms).</li>
      <li>Simple validation of complex data structures.</li>
    </ul>
  </DocsContentLayout>
);
