import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupFileInputCompForm, ZodFileInputCompForm } from '@implementations';

export const FileInput: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">FileInput</h2>
    <p>
      You can build your own <code>&lt;FileInput /&gt;</code> component around
      the form handler <code>&lt;Field /&gt;</code> component in{' '}
      <code>file-input</code> mode. To avoid redefining the file input props,
      you can extend from the <code>InputHTMLAttributes</code> signature if you
      are building from a native html file input. In case you are building from
      any <i>SolidJS</i> ui library, you may extend from the respective{' '}
      <code>UILibraryFileInputProps</code> signature. Finally, you need to make
      use of the <code>FieldProps</code> signature which contains the needed
      props for the <code>&lt;Field /&gt;</code> component.
    </p>
    <Code content={getRaw('components/FileInput')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;FileInput /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('FileInputCompForm/yup')}>
              <YupFileInputCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('FileInputCompForm/zod')}>
              <ZodFileInputCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
