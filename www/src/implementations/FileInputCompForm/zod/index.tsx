import { Component } from 'solid-js';
import { FileInput } from '@components';
import { useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';

const isRequired = (value?: File) => (value ? true : false);
const fileSize = (value?: File) => {
  const size = value?.size || 0;
  return size <= 200000 ? true : false;
};

const schema = z.object({
  document: z
    .custom<File>()
    .refine(isRequired, { message: 'File is required' })
    .refine(fileSize, { message: 'File exceeds 100kb' }),
  documents: z
    .array(
      z
        .custom<File>()
        .refine(isRequired, { message: 'File is required' })
        .refine(fileSize, { message: 'File exceeds 100kb' })
    )
    .min(2),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert('Data sent with success.');
      //uploadData(formData())
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4>Using yup schema</h4>
      <div class="mb-3">
        <FileInput label="Document" formHandler={formHandler} name="document" />
      </div>
      <div class="mb-3">
        <FileInput
          label="Documents"
          multiple
          formHandler={formHandler}
          name="documents"
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2">Submit</button>
      </div>
      <p>
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
