import { Component } from 'solid-js';
import { useFormHandler, zodSchema } from 'solid-form-handler';
import { z } from 'zod';

const schema = z.object({
  acceptPolicy: z.literal(true, {
    errorMap: () => ({ message: 'Policy must be accepted' }),
  }),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
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
    formHandler.fillForm({ acceptPolicy: true });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div class="mb-3">
        <h4 class="mb-3">Using zod schema</h4>
        <div
          class="form-check"
          classList={{
            'is-invalid': formHandler.fieldHasError('acceptPolicy'),
          }}
        >
          <input
            class="form-check-input"
            id="acceptPolicy"
            type="checkbox"
            classList={{
              'is-invalid': formHandler.fieldHasError('acceptPolicy'),
            }}
            name="acceptPolicy"
            checked={formHandler.getFieldValue('acceptPolicy')}
            onChange={({ currentTarget: { name, checked } }) => {
              formHandler.setFieldValue(name, checked);
            }}
            onBlur={({ currentTarget: { name } }) => {
              formHandler.validateField(name);
              formHandler.touchField(name);
            }}
          />
          <label for="acceptPolicy" class="form-check-label">
            Accept policy.
          </label>
        </div>
        {formHandler.fieldHasError('acceptPolicy') && (
          <div class="invalid-feedback">
            {formHandler.getFieldError('acceptPolicy')}
          </div>
        )}
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
      <p>
        <b>Form state:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
