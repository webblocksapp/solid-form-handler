import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxCompForm, ZodCheckboxCompForm } from '@implementations';

export const Checkbox: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Checkbox</h2>
    <p>
      You can build your own <code>&lt;Checkbox /&gt;</code> component around
      the form handler <code>&lt;Field /&gt;</code> component in{' '}
      <code>checkbox</code> mode. To avoid redefining the checkbox props, you
      can extend from the <code>HTMLInputElement</code> signature if you are
      building from a native html checkbox. In case you are building from any{' '}
      <i>SolidJS</i> ui library, you may extend from the respective{' '}
      <code>UILibraryCheckboxProps</code> signature. Finally, you need to make
      use of the <code>FieldProps</code> signature which contains the needed
      props for the <code>&lt;Field /&gt;</code> component.
    </p>
    <Code content={getRaw('components/Checkbox')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;Checkbox /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('CheckboxCompForm/yup')}>
              <YupCheckboxCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('CheckboxCompForm/zod')}>
              <ZodCheckboxCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
