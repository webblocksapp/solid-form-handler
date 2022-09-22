import { Component } from 'solid-js';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { CheckboxCompForm } from '@implementations';

export const Checkbox: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Checkbox</h2>
    <p>
      You can take a look at the component definition <code>Checkbox.tsx</code>{' '}
      which is inside the code tab. Here will inherit the{' '}
      <code>CheckboxProps</code> from the <code>HTMLInputElement</code> to avoid
      redefining all the props of a vanilla HTML checkbox. If you will use a{' '}
      <i>SolidJS</i> UI library that provides a predefined <code>Checkbox</code>{' '}
      component, the same approach can be done by extending the{' '}
      <code>CheckboxProps</code> from the <code>UILibraryCheckboxProps</code>{' '}
      interface.
    </p>
    <p>
      At <code>CheckboxProps</code> the <code>formHandler</code> is defined as
      an optional prop to preserve the original nature of a checkbox which is
      not dependent on a <code>formHandler</code> prop. The{' '}
      <code>onChange</code> event was extended by the method{' '}
      <code>onChange</code> which is defined inside the component. This method
      implements the <code>formHandler</code> and also preserves the{' '}
      <code>onChange</code> prop execution when it's defined. Checkbox value can
      be treated as a <code>boolean</code> or a <code>string | number</code>{' '}
      primitive.
    </p>
    <p>
      As a result, we will have a shorter implementation at{' '}
      <code>Form.tsx</code> by only passing the field name and the{' '}
      <code>formHandler</code> object to the <code>&lt;Checkbox /&gt;</code>{' '}
      component for handling form data validations.
    </p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('CheckboxCompForm') },
        { name: 'Checkbox.tsx', code: getRaw('components/Checkbox') },
      ]}
    >
      <CheckboxCompForm />
    </Implementation>
  </>
);
