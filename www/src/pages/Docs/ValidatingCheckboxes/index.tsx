import { Component } from 'solid-js';
import { Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupCheckboxesForm, ZodCheckboxesForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingCheckboxes: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Checkboxes</h2>
    <p>
      Checkboxes must be treated as an array of primitives. When checking a
      multiple set of options, its value is an array of strings or numbers. By
      using the <code>onChange</code> event we can push the value when is
      checked, or filter it when is un-checked an option.
    </p>
    <p>
      For filling the default field value, it's added the logic for mark as{' '}
      checked if the current checkbox value exists inside the form handler field
      value.
    </p>
    <p>
      For doing checkboxes validation more legible, this logic can be abstracted
      into a <Link href="/docs/checkboxes">Checkboxes.tsx</Link> component.
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
