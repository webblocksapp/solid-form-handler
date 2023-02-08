import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupRadiosCompForm, ZodRadiosCompForm } from '@implementations';

export const Radios: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Radios</h2>
    <p>
      You can take a look at the component definition <code>Radios.tsx</code>{' '}
      which is inside the code tab. The Radios or RadioGroup is a custom
      component that uses under the hood the Radio component. A single radio
      component is not a real-world implementation because it's not uncheckable,
      for this reason always is treated as a group of options for selecting a
      single one. If you will use a <i>SolidJS</i> UI library that provides a
      predefined Radios component, you can build it by extending the{' '}
      <code>RadiosProps</code> from the <code>UILibraryRadiosProps</code>{' '}
      interface instead of creating the component from scratch.
    </p>
    <p>
      At <code>RadiosProps</code> the <code>formHandler</code> is defined as an
      optional prop to preserve the original nature of a group of radios that
      are not dependent on a <code>formHandler</code> prop. The{' '}
      <code>onChange</code> event was extended by the method{' '}
      <code>onChange</code> which is defined inside the component. This method
      implements the <code>formHandler</code> and also preserves the{' '}
      <code>onChange</code> prop execution when it's defined. The radios value
      is a <code>string | number</code> primitive so only is get a single value
      from the checked option.
    </p>
    <p>
      As a result, we will have a shorter implementation at{' '}
      <code>Form.tsx</code> by only passing the <code>name</code>,{' '}
      <code>options</code> and the <code>formHandler</code> object to the{' '}
      <code>&lt;Radios /&gt;</code> component for handling form data
      validations.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('RadiosCompForm/yup') },
                { name: 'Radios.tsx', code: getRaw('components/Radios') },
              ]}
            >
              <YupRadiosCompForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation
              codeTabs={[
                { name: 'Form.tsx', code: getRaw('RadiosCompForm/zod') },
                { name: 'Radios.tsx', code: getRaw('components/Radios') },
              ]}
            >
              <ZodRadiosCompForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
