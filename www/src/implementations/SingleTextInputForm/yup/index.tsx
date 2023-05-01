import { Component, Show } from 'solid-js';
import { Field, useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import * as yup from 'yup';

type Schema = {
  email: string;
};

const schema: yup.Schema<Schema> = yup.object({
  email: yup.string().email().required(),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm({ email: 'test@mail.com' });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4 class="mb-3">Using yup schema</h4>
      <div class="mb-3">
        <Field
          mode="input"
          name="email"
          formHandler={formHandler}
          render={(field) => (
            <>
              <label class="form-label">Email</label>
              <input
                {...field.props}
                class="form-control"
                classList={{ 'is-invalid': field.helpers.error }}
              />
              <Show when={field.helpers.error}>
                <div class="invalid-feedback">{field.helpers.errorMessage}</div>
              </Show>
            </>
          )}
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2">Submit</button>
        <button class="btn btn-primary me-2" onClick={reset} type="button">
          Reset
        </button>
        <button class="btn btn-primary me-2" onClick={fill} type="button">
          Fill
        </button>
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
