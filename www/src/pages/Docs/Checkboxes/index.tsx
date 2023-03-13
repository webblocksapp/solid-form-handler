import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxesCompForm, ZodCheckboxesCompForm } from '@implementations';

export const Checkboxes: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Checkboxes</h2>
    <p>
      You can build your own <code>&lt;Checkboxes /&gt;</code> component around
      the form handler <code>&lt;Field /&gt;</code> component in{' '}
      <code>checkbox-group</code> mode. No native html checkbox group component
      exists so you need to define the signature from scratch, unless you are
      building from any <i>SolidJS</i> ui library, you may extend from the
      respective <code>UILibraryCheckboxGroupProps</code> signature. Finally,
      you need to make use of the <code>FieldProps</code> signature which
      contains the needed props for the <code>&lt;Field /&gt;</code> component.
    </p>
    <p>
      Also, you can notice that the <code>&lt;Checkboxes /&gt;</code> is built
      from the <code>&lt;Checkbox /&gt;</code> component created previously.
    </p>
    <Code content={getRaw('components/Checkboxes')} />
    <p>
      The following is an implementation of the built{' '}
      <code>&lt;Checkboxes /&gt;</code> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('CheckboxesCompForm/yup')}>
              <YupCheckboxesCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('CheckboxesCompForm/zod')}>
              <ZodCheckboxesCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
