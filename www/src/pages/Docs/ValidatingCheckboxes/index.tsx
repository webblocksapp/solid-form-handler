import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxesForm, ZodCheckboxesForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingCheckboxes: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Checkboxes</h2>
    <p>
      Checkboxes must be treated as an array of primitives. When checking a
      multiple set of options, its value is an array of strings or numbers. For
      this you need to use the <code>&lt;Field /&gt;</code> component in{' '}
      <code>checkbox-group</code> mode.
    </p>
    <Code content={getRaw('ValidatingCheckboxes1')} />
    <p>
      You can check the full implementation in the code tab. For doing checkbox
      validation reusable, this logic can be abstracted into a{' '}
      <Link href="../checkboxes">Checkboxes.tsx</Link> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('CheckboxesForm/yup')}>
              <YupCheckboxesForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('CheckboxesForm/zod')}>
              <ZodCheckboxesForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
