import { useFormHandler } from '@hooks';
import { Component } from 'solid-js';
import { yupSchema } from '@utils';
import * as yup from 'yup';

const yupPersonShape = yup.object({
  // key1: yup.array(yup.array(yup.object({ name: yup.string(), age: yup.number() }))),
  key2: yup.array(yup.object({ contacts: yup.array(yup.object({ email: yup.string() })) })),
});

const yupPersonSchema = yupSchema(yupPersonShape);

export const ComplexNestedFieldsImpl: Component = () => {
  const formHandler = useFormHandler(yupPersonSchema);

  const setKey1 = () => {
    formHandler.setFieldValue('key1', [[{ name: 'Laura', age: 22 }]]);
  };

  const addFieldset = () => {
    formHandler.addFieldset({ basePath: 'key2.0.contacts' });
  };

  const setFieldset0DefaultValue = () => {
    formHandler.setFieldDefaultValue('key2.0.contacts.0', { email: 'XXXX' });
  };

  const setFieldset1DefaultValue = () => {
    formHandler.setFieldDefaultValue('key2.0.contacts.1.email', 'ZZZZZZ');
  };

  addFieldset();

  return (
    <>
      <div>
        <button onClick={setKey1}>Set key1</button>
      </div>
      <div>
        <button onClick={addFieldset}>Add fieldset</button>
      </div>
      <div>
        <button onClick={setFieldset0DefaultValue}>setFieldset0DefaultValue</button>
      </div>
      <div>
        <button onClick={setFieldset1DefaultValue}>setFieldset1DefaultValue</button>
      </div>
      <pre>
        <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
      </pre>
    </>
  );
};
