import { Component, createSignal } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';

type SingleTextInputSchema = {
  email: string;
};

const singleTextInputSchema: yup.SchemaOf<SingleTextInputSchema> = yup.object({
  email: yup.string().email().required(),
});

export const SingleTextInputForm: Component = () => {
  const formHandler = useFormHandler(singleTextInputSchema);
  const [error, setError] = createSignal<string>();
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    try {
      setError('');
      event.preventDefault();
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch {
      setError('Your form contains errors');
    }
  };

  return (
    <>
      <form autocomplete="off" onSubmit={submit}>
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
            onBlur={({ currentTarget: { name } }) =>
              formHandler.validateField(name)
            }
          />
          {formHandler.fieldHasError('email') && (
            <div class="invalid-feedback">
              {formHandler.getFieldError('email')}
            </div>
          )}
        </div>
        <div class="mb-3">
          <button class="btn btn-primary">Submit</button>
        </div>
        {error() && <small class="text-danger">{error()}</small>}
      </form>
    </>
  );
};
