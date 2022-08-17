import { Component, For } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';

type SelectableOption = {
  value: number | string;
  label: string;
};

type Schema = {
  ageRange: string;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  ageRange: yup.string().required(),
});

const ageRanges: SelectableOption[] = [
  { value: '18-30', label: 'From 18 to 30' },
  { value: '31-42', label: 'From 31 to 42' },
  { value: '43-55', label: 'From 43 to 55' },
  { value: '56-70', label: 'From 56 to 70' },
];

export const Form: Component = () => {
  const formHandler = useFormHandler<Schema>(schema);
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    if (await formHandler.validateForm()) {
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
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
      <div class="mb-3">
        <For each={ageRanges}>
          {(ageRange, i) => (
            <div
              class="form-check"
              classList={{
                'is-invalid': formHandler.fieldHasError('ageRange'),
              }}
            >
              <input
                class="form-check-input"
                id={`ageRange-${i()}`}
                type="radio"
                value={ageRange.value}
                classList={{
                  'is-invalid': formHandler.fieldHasError('ageRange'),
                }}
                name="ageRange"
                checked={
                  formHandler.getFieldValue('ageRange') == ageRange.value
                }
                onChange={({ currentTarget: { name, value } }) =>
                  formHandler.setFieldValue(name, value)
                }
              />
              <label for={`ageRange-${i()}`} class="form-check-label">
                {ageRange.label}
              </label>
            </div>
          )}
        </For>
        {formHandler.fieldHasError('ageRange') && (
          <div class="invalid-feedback">
            {formHandler.getFieldError('ageRange')}
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
