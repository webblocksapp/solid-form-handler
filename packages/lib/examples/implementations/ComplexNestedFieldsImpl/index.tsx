import { useFormHandler } from '@hooks';
import { Component } from 'solid-js';
import { yupSchema } from '@utils';
import * as yup from 'yup';

const yupPersonShape = yup.object({
  key1: yup.array(yup.array(yup.object({ name: yup.string(), age: yup.number() }))),
});

const yupPersonSchema = yupSchema(yupPersonShape);

export const ComplexNestedFieldsImpl: Component = () => {
  const formHandler = useFormHandler(yupPersonSchema);

  const setKey1 = () => {
    formHandler.setFieldValue('key1', [[{ name: 'Laura', age: 22 }]]);
  };

  return (
    <>
      <div>
        <button onClick={setKey1}>Set key1</button>
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
