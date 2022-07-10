import { Component, createSignal } from 'solid-js';
import { useFormHandler, FormErrorsException } from 'solid-form-handler';
import * as yup from 'yup';

/**
 * Entity type definition
 */
type User = {
  name: string;
  email: string;
};

/**
 * Schema definition through entity
 */
const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const UserForm: Component = () => {
  const formHandler = useFormHandler(userSchema);
  const [error, setError] = createSignal<string>('');
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      setError('');
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(JSON.stringify(error, null, 2));
      }
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
      {error() && (
        <>
          <p class="mt-5">
            <b>Errors on submit:</b>
          </p>
          <pre class="mt-3 border bg-light p-3">
            <code class="text-danger">{error()}</code>
          </pre>
        </>
      )}
    </>
  );
};
