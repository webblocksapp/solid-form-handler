import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code, Tabs } from '@components';

export const FormData: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">formData</h2>
    <p>
      This method is a SolidJS reactive function with the current form data.
    </p>
    <Code content={getRaw('formData')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>
      <code>useFormHandler</code> takes care of initializing the empty form data
      object through the given schema. You can access to a field value with dot
      notation without the risk of being undefined:
    </p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('formData1')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('formData1')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />

    <p>Also for nested objects, using the following schema as example:</p>
    <Tabs
      tabs={[
        {
          text: 'yup',
          children: (
            <Code
              noBorder
              content={getRaw('schemaYup2')}
              mapReplace={{ __VALIDATOR__: 'yup' }}
            />
          ),
        },
        {
          text: 'zod',
          children: (
            <Code
              noBorder
              content={getRaw('schemaZod2')}
              mapReplace={{ __VALIDATOR__: 'zod' }}
            />
          ),
        },
      ]}
    />
    <p>You can access by dot notation to any of the form data values:</p>
    <Code content={getRaw('formData2')} />
  </>
);
