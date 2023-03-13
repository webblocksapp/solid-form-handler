import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupSelectCompForm, ZodSelectCompForm } from '@implementations';

export const Select: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Select</h2>
    <p>
      You can build your own <code>&lt;Select /&gt;</code> component around the
      form handler <code>&lt;Field /&gt;</code> component in <code>input</code>{' '}
      mode. To avoid redefining the select props, you can extend from the{' '}
      <code>HTMLSelectElement</code> signature if you are building from a native
      html select. In case you are building from any <i>SolidJS</i> ui library,
      you may extend from the respective <code>UILibrarySelectProps</code>{' '}
      signature. Finally, you need to make use of the <code>FieldProps</code>{' '}
      signature which contains the needed props for the{' '}
      <code>&lt;Field /&gt;</code> component.
    </p>
    <Code content={getRaw('components/Select')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;Select /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('SelectCompForm/yup')}>
              <YupSelectCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('SelectCompForm/zod')}>
              <ZodSelectCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
