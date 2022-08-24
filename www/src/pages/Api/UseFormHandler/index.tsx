import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const UseFormHandler: Component = () => (
  <DocsContentLayout next="../fill-form">
    <h2 class="mb-4 border-bottom">useFormHandler</h2>
    <p>
      <code>useFormHandler</code> is a custom hook for managing forms with ease.
      It takes as required argument a Yup object schema validator.
    </p>
    <Code content={getRaw('useFormHandlerApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('useFormHandler1')} />
  </DocsContentLayout>
);
