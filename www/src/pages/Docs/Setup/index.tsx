import { Code } from '@components';
import { DocsContentLayout } from '@layouts';
import { Component } from 'solid-js';

export const Setup: Component = () => (
  <DocsContentLayout prev="/docs/introduction" next="/docs/validation-schema">
    <h2 class="mb-4 border-bottom">Setup</h2>
    <p class="mb-5">
      <b>npm installation:</b>
      <Code language="bash">&gt; npm i solid-form-handler yup</Code>
    </p>
    <p>
      <b>yarn installation:</b>
      <Code language="bash">&gt; yarn add solid-form-handler yup</Code>
    </p>
  </DocsContentLayout>
);
