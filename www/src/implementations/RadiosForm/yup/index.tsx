import { Component, For, Show } from 'solid-js';
import { Field, useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import * as yup from 'yup';

type SelectableOption = {
  value: number | string;
  label: string;
};

type Schema = {
  ageRange: string;
};

const schema: yup.Schema<Schema> = yup.object({
  ageRange: yup.string().required(),
});

const ageRanges: SelectableOption[] = [
  { value: '18-30', label: 'From 18 to 30' },
  { value: '31-42', label: 'From 31 to 42' },
  { value: '43-55', label: 'From 43 to 55' },
  { value: '56-70', label: 'From 56 to 70' },
];

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
    formHandler.fillForm({ ageRange: '18-30' });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4>Using yup schema</h4>
      <div class="mb-3">
        <Field
          mode="radio-group"
          name="ageRange"
          formHandler={formHandler}
          render={(field) => (
            <>
              <For each={ageRanges}>
                {(ageRange, i) => (
                  <div
                    class="form-check"
                    classList={{
                      'is-invalid': formHandler.fieldHasError('ageRange'),
                    }}
                  >
                    <input
                      {...field.props}
                      checked={field.helpers.isChecked(ageRange.value)}
                      class="form-check-input"
                      classList={{
                        'is-invalid': field.helpers.error,
                      }}
                      id={`${field.props.id}-${i()}`}
                      value={ageRange.value}
                      type="radio"
                    />
                    <label
                      for={`${field.props.id}-${i()}`}
                      class="form-check-label"
                    >
                      {ageRange.label}
                    </label>
                  </div>
                )}
              </For>
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
