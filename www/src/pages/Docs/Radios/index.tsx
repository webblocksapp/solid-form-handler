import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupRadiosCompForm, ZodRadiosCompForm } from '@implementations';

export const Radios: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Radios</h2>
    <p>
      You can build your own <code>&lt;Radios /&gt;</code> component around the
      form handler <code>&lt;Field /&gt;</code> component in{' '}
      <code>radio-group</code> mode. No native html radio group component exists
      so you need to define the signature from scratch, unless you are building
      from any <i>SolidJS</i> ui library, you may extend from the respective{' '}
      <code>UILibraryRadioGroupProps</code> signature. Finally, you need to make
      use of the <code>FieldProps</code> signature which contains the needed
      props for the <code>&lt;Field /&gt;</code> component.
    </p>
    <Code content={getRaw('components/Radios')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;Radios /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('RadiosCompForm/yup')}>
              <YupRadiosCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('RadiosCompForm/zod')}>
              <ZodRadiosCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
