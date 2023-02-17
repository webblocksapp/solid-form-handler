import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { FileInput } from '@example-components';
import * as yup from 'yup';

type Schema = {
  name: string;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
});

export const ValidateFileInputImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));

  return (
    <>
      <div>
        <h3>File input implementation</h3>
        <FileInput label="Name" name="name" formHandler={formHandler} />
      </div>
    </>
  );
};
