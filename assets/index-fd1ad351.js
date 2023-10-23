const n=`import { Component, Show } from 'solid-js';
import { Field, useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import * as yup from 'yup';

type Schema = {
  acceptPolicy: boolean;
  accountStatus: 'active' | 'inactive';
};

const schema: yup.Schema<Schema> = yup.object({
  acceptPolicy: yup
    .boolean()
    .required()
    .oneOf([true], 'Policy must be accepted')
    .typeError('Accept policy is required'),
  accountStatus: yup
    .mixed<Schema['accountStatus']>()
    .oneOf(['active', 'inactive'])
    .required()
    .default('inactive'),
});

export const Form: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
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
    formHandler.fillForm({ acceptPolicy: true, accountStatus: 'active' });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4 class="mb-3">Using yup schema</h4>
      <div class="mb-3">
        <Field
          name="acceptPolicy"
          mode="checkbox"
          formHandler={formHandler}
          render={(field) => (
            <>
              <div
                class="form-check"
                classList={{
                  'is-invalid': field.helpers.error,
                }}
              >
                <input
                  {...field.props}
                  type="checkbox"
                  class="form-check-input"
                  classList={{
                    'is-invalid': field.helpers.error,
                  }}
                />
                <label class="form-check-label" for={field.props.id}>
                  Accept policy.
                </label>
              </div>
              <Show when={field.helpers.error}>
                <div class="invalid-feedback">{field.helpers.errorMessage}</div>
              </Show>
            </>
          )}
        />
      </div>
      <div class="mb-3">
        <Field
          name="accountStatus"
          mode="checkbox"
          value="active"
          uncheckedValue="inactive"
          formHandler={formHandler}
          render={(field) => (
            <>
              <div
                class="form-check"
                classList={{
                  'is-invalid': field.helpers.error,
                }}
              >
                <input
                  {...field.props}
                  type="checkbox"
                  class="form-check-input"
                  classList={{
                    'is-invalid': field.helpers.error,
                  }}
                />
                <label class="form-check-label" for={field.props.id}>
                  Account status: {formHandler.getFieldValue(field.props.name)}
                </label>
              </div>
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
`;export{n as default};
