import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const UnmountField: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">unmountField</h2>
      <p>
        Form handler method to be implemented at <code>onCleanup</code>{' '}
        lifecycle of a reusable form field component. It caches the current
        field state when it's unmounted, to be recovered when the component is
        re-mounted (Conditional rendering).
      </p>
      <Code content={getRaw('unmountField')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('unmountField1')} />
    </>
  );
};
