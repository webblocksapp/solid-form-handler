import { Implementation } from '@components';
import { ConditionalRenderingForm } from '@implementations';
import { Link } from '@solidjs/router';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const ConditionalRendering: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">Conditional Rendering</h2>
      <p>
        You can have scenarios where you render conditionally showing / hiding
        form fields. The following example makes required the <code>email</code>{' '}
        field when the <code>isAdult</code> field is marked. Under the hood the
        form handler runs the validation when the field is mounted and unmounted
        in an optimal way, caching the validation state on every lifecycle.
      </p>
      <p>
        You could have used{' '}
        <Link target="blank" href="../dependant-validations">
          triggers
        </Link>{' '}
        but it will be less optimal revalidating the field every time is mounted
        and unmounted. For solving this you can make use of the methods{' '}
        <code>mountField</code> and <code>unmountField</code>. You can check
        them at{' '}
        <Link target="blank" href="../components">
          components'
        </Link>{' '}
        documentation to see how they are implemented.
      </p>
      <Implementation
        codeTabs={[
          {
            name: 'Form.tsx',
            code: getRaw('ConditionalRenderingForm/index.tsx'),
          },
          {
            name: 'schema.ts',
            code: getRaw('ConditionalRenderingForm/schema.ts'),
          },
          {
            name: 'types.ts',
            code: getRaw('ConditionalRenderingForm/types.ts'),
          },
        ]}
      >
        <ConditionalRenderingForm />
      </Implementation>
    </>
  );
};
