import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { TextInput } from '@example-components';
import * as yup from 'yup';

export type Schema = { name: string; email: string };

export const schema: yup.SchemaOf<Schema> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email().required('Required field'),
});

export const ValidateOnImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema), {
    validateOn: ['blur'],
  });
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <div class="row gy-3">
          <div class="col-sm-12 col-md-6">
            <TextInput label="Name" name="name" formHandler={formHandler} />
          </div>
          <div class="col-sm-12 col-md-6">
            <TextInput label="Email" name="email" formHandler={formHandler} />
          </div>
        </div>
        <div class="mb-3 w-100">
          <button class="btn btn-primary me-2 mt-2">Submit</button>
        </div>
      </form>
    </>
  );
};
