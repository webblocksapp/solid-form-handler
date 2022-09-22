import { Component } from 'solid-js';
import { Code, Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingCheckbox: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Checkbox</h2>
    <p>
      A single checkbox can be treated as a <code>boolean</code> primitive. So
      here <code>onChange</code> event is used for setting the value at the form
      handler which captures the <code>checked</code> status.{' '}
      <code>onBlur</code> event is implemented on the same way as{' '}
      <Link href="../validating-select">select</Link> or{' '}
      <Link href="../validating-text-input">text input</Link> html components.
      Error rendering is handled by the methods <code>fieldHasError</code> and{' '}
      <code>getFieldError</code>.
    </p>
    <p>
      <code>getFieldValue</code> method is used for controlling the{' '}
      <code>checked</code> prop because a single checkbox lacks a value due to
      its toggleable <code>boolean</code> flag. For some edge cases, a single
      checkbox can handle a <code>string | number</code> primitive where a value
      prop needs to be set, for this scenario is better to build a custom{' '}
      <Link href="../single-checkbox">&lt;Checkbox /&gt;</Link> component.
    </p>
    <Code content={getRaw('ValidatingCheckbox1')} />
    <p>
      You can check the full implementation in the code tab. For doing checkbox
      validation more legible, this logic can be abstracted into a{' '}
      <Link href="../single-checkbox">Checkbox.tsx</Link> component.
    </p>
    <Implementation code={getRaw('CheckboxForm')}>
      <CheckboxForm />
    </Implementation>
  </>
);
