import { Component } from 'solid-js';
import { Code, Implementation, Tabs } from '@components';
import { getRaw } from '@utils';
import {
  YupSingleTextInputForm,
  ZodSingleTextInputForm,
} from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingTextInput: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Text Input</h2>
    <p>
      For controlling text inputs you need to use the{' '}
      <code>&lt;Field /&gt;</code> component in <code>input</code> mode.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingTextInput1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('ValidatingTextInput1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>
      You can check the full implementation in the code tab. For doing text
      input validation reusable, this logic can be abstracted into a{' '}
      <Link href="/docs/text-input">TextInput.tsx</Link> component.
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Implementation code={getRaw('SingleTextInputForm/yup')}>
              <YupSingleTextInputForm />
            </Implementation>
          ),
        },
        {
          text: 'zod',
          children: (
            <Implementation code={getRaw('SingleTextInputForm/zod')}>
              <ZodSingleTextInputForm />
            </Implementation>
          ),
        },
      ]}
    />
  </>
);
