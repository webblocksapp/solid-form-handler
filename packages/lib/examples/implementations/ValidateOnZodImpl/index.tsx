import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@adapters';
import { TextInput } from '@example-components';
import { z } from 'zod';

export type Schema = { name: string; email: string };

export const schema = z.object({
  name: z.string().min(1, 'Required field'),
  email: z.string().email().min(1, 'Required field'),
});

export const ValidateOnZodImpl: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema), {
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
          <button disabled={formHandler.isFormInvalid()} class="btn btn-primary me-2 mt-2">
            Submit
          </button>
        </div>
        <pre>
          <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
        </pre>
      </form>
    </>
  );
};
