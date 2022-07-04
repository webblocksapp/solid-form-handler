import { DocsContentLayout } from '@layouts';
import { Component } from 'solid-js';

export const Setup: Component = () => (
  <DocsContentLayout prev="/docs/introduction" next="/docs/validation-schema">
    Hello world
  </DocsContentLayout>
);
