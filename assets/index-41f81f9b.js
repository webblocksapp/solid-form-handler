const n=`import { Component } from 'solid-js';
import { FileInput } from '@components';
import { useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import * as yup from 'yup';

const isRequired = (value?: File) => (value ? true : false);
const fileSize = (value?: File) => {
  const size = value?.size || 0;
  return size <= 200000 ? true : false;
};

type Schema = {
  document: File;
  documents: File[];
};

const schema: yup.Schema<Schema> = yup.object().shape({
  document: yup
    .mixed<File>()
    .test({
      name: 'fileSize',
      message: 'File exceeds 200kb',
      test: fileSize,
    })
    .test({ name: 'isRequired', message: 'File is required', test: isRequired })
    .required(),
  documents: yup
    .array(
      yup
        .mixed<File>()
        .test({
          name: 'fileSizes',
          message: 'One File exceeds 200kb',
          test: fileSize,
        })
        .required()
    )
    .required()
    .min(2),
});

export const Form: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
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
`;export{n as default};
//# sourceMappingURL=index-41f81f9b.js.map
