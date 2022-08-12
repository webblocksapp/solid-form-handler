import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { userSchema } from './schema';

export const UserForm: Component = () => {
  const formHandler = useFormHandler(userSchema);
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    if (await formHandler.validateForm()) {
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    }
  };

  const fill = () => {
    formHandler.fillForm({ name: 'John', email: 'john@mail.com' });
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <>
      <form autocomplete="off" onSubmit={submit}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            class="form-control"
            classList={{ 'is-invalid': formHandler.fieldHasError('name') }}
            name="name"
            value={formHandler.getFieldValue('name')}
            onInput={({ currentTarget: { name, value } }) =>
              formHandler.setFieldValue(name, value)
            }
            onBlur={({ currentTarget: { name, value } }) =>
              formHandler.setFieldValue(name, value)
            }
          />
          {formHandler.fieldHasError('name') && (
            <div class="invalid-feedback">
              {formHandler.getFieldError('name')}
            </div>
          )}
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            class="form-control"
            classList={{ 'is-invalid': formHandler.fieldHasError('email') }}
            name="email"
            value={formHandler.getFieldValue('email')}
            onInput={({ currentTarget: { name, value } }) =>
              formHandler.setFieldValue(name, value)
            }
            onBlur={({ currentTarget: { name, value } }) =>
              formHandler.setFieldValue(name, value)
            }
          />
          {formHandler.fieldHasError('email') && (
            <div class="invalid-feedback">
              {formHandler.getFieldError('email')}
            </div>
          )}
        </div>
        <div class="mb-3 w-100">
          <button class="btn btn-primary me-2">Submit</button>
          <button
            class="btn btn-primary me-2"
            disabled={formHandler.isFormInvalid()}
          >
            Submit
          </button>
          <button class="btn btn-primary me-2" onClick={fill} type="button">
            Fill
          </button>
          <button class="btn btn-primary me-2" onClick={reset} type="button">
            Reset
          </button>
        </div>
      </form>
      <p class="mt-5">
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </>
  );
};
