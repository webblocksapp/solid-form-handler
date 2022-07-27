import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFormState: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">getFormState</h2>
    <p>
      This method returns an object which shows the user's interactions with the
      form.
    </p>
    <Code content={getRaw('getFormStateApi')} />
  </DocsContentLayout>
);
