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
      <Link href="../validating-text-input">native HTML text inputs</Link>. The
      same form handler methods can be implemented for <code>onInput</code> and{' '}
      <code>onBlur</code>. Value is controlled by the <code>getFieldValue</code>{' '}
      method and error rendering is handled by the methods{' '}
      <code>fieldHasError</code> and <code>getFieldError</code>.
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
      validation more legible, this logic can be abstracted into a{' '}
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
