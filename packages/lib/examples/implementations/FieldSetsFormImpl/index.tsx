import { useFormHandler } from '@hooks';
import { Component, For } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
};

const schema: yup.SchemaOf<Schema[]> = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
);

export const FieldSetsFormImpl: Component = () => {
  console.log(schema.validateSyncAt('0.name', [{ name: '' }]));
  //const formHandler = useFormHandler(schema);

  return (
    <>
      <h1>Fieldsets form implementation</h1>
    </>
  );
};
