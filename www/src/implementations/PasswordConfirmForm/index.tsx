import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '@components';
import { schema } from './schema';

export const Form: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));
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

  const reset = async () => {
    await formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm(
      { password: 'abc', passwordConfirm: 'ab' },
      { silentValidation: false }
    );
  };

  return (
    <>
      <form onSubmit={submit}>
        <div class="row gy-3">
          <div class="col-sm-12 col-md-6">
            <TextInput
              label="Password"
              name="password"
              formHandler={formHandler}
              triggers={['passwordConfirm']}
            />
          </div>
          <div class="col-sm-12 col-md-6">
            <TextInput
              label="Password Confirm"
              name="passwordConfirm"
              formHandler={formHandler}
              triggers={['password']}
            />
          </div>
        </div>
        <div class="mb-3 w-100">
          <button class="btn btn-primary me-2 mt-2">Submit</button>
          <button
            class="btn btn-primary me-2 mt-2"
            disabled={formHandler.isFormInvalid()}
          >
            Submit
          </button>
          <button
            class="btn btn-primary me-2 mt-2"
            onClick={fill}
            type="button"
          >
            Fill
          </button>
          <button
            class="btn btn-primary me-2 mt-2"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>
        <p class="mt-5">
          <b>Form data:</b>
        </p>
        <pre class="mt-3 border bg-light p-3">
          <code>{JSON.stringify(formData(), null, 2)}</code>
        </pre>
      </form>
    </>
  );
};
