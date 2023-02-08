import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxesCompForm, ZodCheckboxesCompForm } from '@implementations';

export const Checkboxes: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Checkboxes</h2>
    <p>
      You can take a look at the component definition{' '}
      <code>Checkboxes.tsx</code> which is inside the code tab. The Checkboxes
      or CheckboxGroup is a custom component that uses under the hood the
      previously created Checkbox component. If you will use a <i>SolidJS</i> UI
      library that provides a predefined Checkboxes component, you can build it
      by extending the <code>CheckboxesProps</code> from the{' '}
      <code>UILibraryCheckboxesProps</code> interface instead of creating the
      component from scratch.
    </p>
    <p>
      At <code>CheckboxesProps</code> the <code>formHandler</code> is defined as
      an optional prop to preserve the original nature of a group of checkboxes
      that are not dependent on a <code>formHandler</code> prop. The{' '}
      <code>onChange</code> event was extended by the method{' '}
      <code>onChange</code> which is defined inside the component. This method
      implements the <code>formHandler</code> and also preserves the{' '}
      <code>onChange</code> prop execution when it's defined. Additionally, it
      contains the logic for handling the checkboxes value as an array of{' '}
      <code>number | string</code> primitives.
    </p>
    <p>
      As a result, we will have a shorter implementation at{' '}
      <code>Form.tsx</code> by only passing the <code>name</code>,{' '}
      <code>options</code> and the <code>formHandler</code> object to the{' '}
      <code>&lt;Checkboxes /&gt;</code> component for handling form data
      validations.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('CheckboxesCompForm/yup') },
                {
                  name: 'Checkboxes.tsx',
                  code: getRaw('components/Checkboxes'),
                },
              ]}
            >
              <YupCheckboxesCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('CheckboxesCompForm/zod') },
                {
                  name: 'Checkboxes.tsx',
                  code: getRaw('components/Checkboxes'),
                },
              ]}
            >
              <ZodCheckboxesCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
