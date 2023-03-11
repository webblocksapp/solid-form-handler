import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import { YupSingleSelectForm, ZodSingleSelectForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingSelect: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Select</h2>
    <p>
      Native HTML select elements can have the same treatment as{' '}
      <Link href="../validating-text-input">native HTML text inputs</Link>. For
      controlling it you need to use the <code>&lt;Field /&gt;</code> component
      in <code>input</code> mode as well.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingSelect1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingSelect1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>
      You can check the full implementation in the code tab. For doing select
      validation reusable, this logic can be abstracted into a{' '}
      <Link href="/docs/select">Select.tsx</Link> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('SingleSelectForm/yup')}>
              <YupSingleSelectForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('SingleSelectForm/zod')}>
              <ZodSingleSelectForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
