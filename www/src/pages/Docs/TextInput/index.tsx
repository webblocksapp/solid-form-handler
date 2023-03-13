import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { YupTextInputCompForm, ZodTextInputCompForm } from '@implementations';
import { getRaw } from '@utils';

export const TextInput: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">TextInput</h2>
    <p>
      You can build your own <code>&lt;TextInput /&gt;</code> component around
      the form handler <code>&lt;Field /&gt;</code> component in{' '}
      <code>input</code> mode. To avoid redefining the text input props, you can
      extend from the <code>InputHTMLAttributes</code> signature if you are
      building from a native html input. In case you are building from any{' '}
      <i>SolidJS</i> ui library, you may extend from the respective{' '}
      <code>UILibraryTextInputProps</code> signature. Finally, you need to make
      use of the <code>FieldProps</code> signature which contains the needed
      props for the <code>&lt;Field /&gt;</code> component.
    </p>
    <Code content={getRaw('components/TextInput')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;TextInput /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('TextInputCompForm/yup')}>
              <YupTextInputCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('TextInputCompForm/zod')}>
              <ZodTextInputCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
