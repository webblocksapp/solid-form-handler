import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code, Tabs } from '@components';

export const FillForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">fillForm</h2>
    <p>
      This method allows to pre-load data inside a form. Also it validates the
      given data silently by default.
    </p>
    <Code content={getRaw('fillFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>Having the following schema:</p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: <Code noBorder content={getRaw('schemaYup1')} />,
        },
        {
          text: 'zod',
          children: <Code noBorder content={getRaw('schemaZod1')} />,
        },
      ]}
    />
    <p>
      The form has the fields <code>name</code> and <code>age</code>, must be
      filled completely:
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('fillForm1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('fillForm1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />

    <p>
      <code>options</code> are composed by:
    </p>
    <ul>
      <li>
        <code>silentValidation:</code> by default is <code>true</code>. If set
        to <code>false</code> it shows the validation error messages after the
        form is filled.
      </li>
    </ul>
  </>
);
