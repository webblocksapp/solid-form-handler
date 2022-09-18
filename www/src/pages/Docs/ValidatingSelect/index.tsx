import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Code, Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleSelectForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingSelect: Component = () => (
  <DocsContentLayout
    prev="../validating-text-input"
    next="../validating-checkboxes"
  >
    <h2 class="mb-4 border-bottom">Validating Select</h2>
    <p>
      Native HTML select elements can have the same treatment as{' '}
      <Link href="../validating-text-input">native HTML text inputs</Link>. The
      same form handler methods can be implemented for <code>onInput</code> and{' '}
      <code>onBlur</code>. Value is controlled by the <code>getFieldValue</code>{' '}
      method and error rendering is handled by the methods{' '}
      <code>fieldHasError</code> and <code>getFieldError</code>.
    </p>
    <Code content={getRaw('ValidatingSelect1')} />
    <p>
      You can check the full implementation in the code tab. For doing select
      validation more legible, this logic can be abstracted into a{' '}
      <Link href="/docs/select">Select.tsx</Link> component.
    </p>
    <Implementation code={getRaw('SingleSelectForm')}>
      <SingleSelectForm />
    </Implementation>
  </DocsContentLayout>
);
