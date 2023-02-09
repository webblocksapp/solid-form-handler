import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code, Tabs } from '@components';

export const UseFormHandler: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">useFormHandler</h2>
    <p>
      <code>useFormHandler</code> is a custom hook for managing forms with ease.
      It takes as required argument a validation schema.
    </p>
    <Code content={getRaw('useFormHandlerApi')} />
    <p>
      <code>FormHandlerOptions</code> is composed by:
    </p>
    <ul>
      <li>
        <code>silentValidation:</code> by default is <code>false</code>. No
        validations error messages are displayed when set to <code>true</code>.
      </li>
      <li>
        <code>validateOn:</code> receives an array of event types, as for
        example <code>['input', 'change', 'aCustomEvent']</code>. The field will
        be validated if it matches the given event types.
      </li>
      <li>
        <code>delay:</code> by default is <code>0</code>. It will debounce
        validations with the given delay time in milliseconds.
      </li>
    </ul>
    <p>
      <b>Implementation:</b>
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>Restricting validation to specific events:</p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler2')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler2')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>Debouncing validation:</p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler3')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('useFormHandler3')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
  </>
);
