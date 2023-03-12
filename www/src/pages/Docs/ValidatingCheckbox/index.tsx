import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxForm, ZodCheckboxForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingCheckbox: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Checkbox</h2>
    <p>
      For controlling a single checkbox you need to use the{' '}
      <code>&lt;Field /&gt;</code> component in <code>checkbox</code> mode.
    </p>
    <p>
      The current code snippet shows how to treat a checkbox field as a boolean
      switch.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingCheckbox1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingCheckbox1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>
      The <code>&lt;Field /&gt;</code> component also offers the option to treat
      a checkbox as a value pair when passing <code>value</code> and{' '}
      <code>uncheckedValue</code> props.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: <Code noBorder content={getRaw('ValidatingCheckbox2')} />,
        },
        {
          text: 'zod',
          children: <Code noBorder content={getRaw('ValidatingCheckbox2')} />,
        },
      ]}
    />
    <p>
      You can check the full implementation in the code tab. For doing checkbox
      validation reusable, this logic can be abstracted into a{' '}
      <Link href="../single-checkbox">Checkbox.tsx</Link> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('CheckboxForm/yup')}>
              <YupCheckboxForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('CheckboxForm/zod')}>
              <ZodCheckboxForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
