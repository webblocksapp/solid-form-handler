import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupRadiosForm, ZodRadiosForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingRadios: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Radios</h2>
    <p>
      For controlling radios you need to use the <code>&lt;Field /&gt;</code>{' '}
      component in <code>radio-group</code> mode.
    </p>
    <Code content={getRaw('ValidatingRadios1')} />
    <p>
      You can check the full implementation in the code tab. For doing radio
      group validation reusable, this logic can be abstracted into a{' '}
      <Link href="../radios">Radios.tsx</Link> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('RadiosForm/yup')}>
              <YupRadiosForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('RadiosForm/zod')}>
              <ZodRadiosForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
