import { Component } from 'solid-js';
import { FileInput } from '@example-components';
import { useFormHandler } from '@hooks';
import { ValidationSchema } from '@interfaces';

export const FileInputImpl: Component<{ schema: ValidationSchema<any> }> = (props) => {
  const formHandler = useFormHandler(props.schema);

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formHandler.formData()));
      formHandler.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <h3>File input implementation</h3>
        <div class="mb-3">
          <FileInput data-testid="test-input" formHandler={formHandler} name="document" />
        </div>
        <div class="mb-3">
          <FileInput multiple formHandler={formHandler} name="documents" />
        </div>
        <button>Submit</button>
        <p>
          <b>Form data:</b>
        </p>
        <pre class="mt-3 border bg-light p-3">
          <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
        </pre>
        <pre class="mt-3 border bg-light p-3">
          <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
        </pre>
      </form>
    </>
  );
};
