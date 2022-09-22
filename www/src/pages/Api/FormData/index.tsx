import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

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
    <Code content={getRaw('formData1')} />
    <p>Also for nested objects, using the following schema as example:</p>
    <Code content={getRaw('schema2')} />
    <p>You can access by dot notation to any of the form data values:</p>
    <Code content={getRaw('formData2')} />
  </>
);
