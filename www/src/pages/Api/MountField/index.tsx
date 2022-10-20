import { Code } from '@components';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const MountField: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">mountField</h2>
      <p>
        Form handler method to be implemented at <code>onMount</code> lifecycle
        of a reusable form field component. It triggers form field validation
        and caches the field state at the first mount, to prevent component
        revalidation if it needs to be re-mounted (Conditional rendering).
      </p>
      <Code content={getRaw('mountFieldApi')} />
      <p>
        <b>Implementation:</b>
      </p>
      <Code content={getRaw('mountField1')} />
    </>
  );
};
