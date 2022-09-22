import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const UseFormHandler: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">useFormHandler</h2>
    <p>
      <code>useFormHandler</code> is a custom hook for managing forms with ease.
      It takes as required argument a validation schema.
    </p>
    <Code content={getRaw('useFormHandlerApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('useFormHandler1')} />
  </>
);
