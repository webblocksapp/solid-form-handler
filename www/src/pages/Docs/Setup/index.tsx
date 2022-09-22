import { Code } from '@components';
import { Component } from 'solid-js';

export const Setup: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Setup</h2>
    <div class="mb-5">
      <b>npm installation:</b>
      <Code language="bash">&gt; npm i solid-form-handler yup</Code>
    </div>
    <div>
      <b>yarn installation:</b>
      <Code language="bash">&gt; yarn add solid-form-handler yup</Code>
    </div>
  </>
);
