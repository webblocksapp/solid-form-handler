import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { YupTextInputCompForm, ZodTextInputCompForm } from '@implementations';
import { getRaw } from '@utils';

export const TextInput: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">TextInput</h2>
    <p>
      You can take a look at the component definition <code>TextInput.tsx</code>{' '}
      which is inside the code tab. Here will extend the{' '}
      <code>TextInputProps</code> from the <code>HTMLInputElement</code> to
      avoid redefining all the props of a vanilla HTML input. If you will use a{' '}
      <i>SolidJS</i> UI library that provides a predefined{' '}
      <code>TextInput</code> component, the same approach can be done by
      extending the <code>TextInputProps</code> from the{' '}
      <code>UILibraryTextInputProps</code> interface.
    </p>
    <p>
      At <code>TextInputProps</code> the <code>formHandler</code> is defined as
      an optional prop to preserve the original nature of a text input which is
      not dependent on a <code>formHandler</code> prop. The <code>onInput</code>{' '}
      and <code>onBlur</code> events were extended by the methods{' '}
      <code>onInput</code> and <code>onBlur</code> which are defined inside the
      component. Those methods implement the <code>formHandler</code> keeping
      the <code>onInput</code> and <code>onBlur</code> props execution when they
      are defined.
    </p>
    <p>
      As a result, we will have a shorter implementation at{' '}
      <code>Form.tsx</code> by only passing the <code>name</code> and the{' '}
      <code>formHandler</code> object to the <code>&lt;TextInput /&gt;</code>{' '}
      component for handling form data validations.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('TextInputCompForm/yup') },
                { name: 'TextInput.tsx', code: getRaw('components/TextInput') },
              ]}
            >
              <YupTextInputCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('TextInputCompForm/zod') },
                { name: 'TextInput.tsx', code: getRaw('components/TextInput') },
              ]}
            >
              <ZodTextInputCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
