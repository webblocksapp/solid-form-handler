import { Component, For } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';

type SingleSelectSchema = {
  country: number;
};

const singleSelectSchema: yup.SchemaOf<SingleSelectSchema> = yup.object({
  country: yup.number().required().typeError('country is required'),
});

const countries = [
  { value: '', label: 'Select a country' },
  { value: 1, label: 'Colombia' },
  { value: 2, label: 'Argentina' },
  { value: 3, label: 'Venezuela' },
];

export const SingleSelectForm: Component = () => {
  const formHandler = useFormHandler(singleSelectSchema);
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
    formHandler.fillForm({ country: 2 });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div class="mb-3">
        <label class="form-label">Country</label>
        <select
          class="form-select"
          classList={{ 'is-invalid': formHandler.fieldHasError('country') }}
          name="country"
          value={formHandler.getFieldValue('country')}
          onInput={({ currentTarget: { name, value } }) =>
            formHandler.setFieldValue(name, value)
          }
          onBlur={({ currentTarget: { name } }) =>
            formHandler.validateField(name)
          }
        >
          <For each={countries}>
            {(country) => (
              <option
                value={country.value}
                selected={formData().country == country.value}
              >
                {country.label}
              </option>
            )}
          </For>
        </select>
        {formHandler.fieldHasError('country') && (
          <div class="invalid-feedback">
            {formHandler.getFieldError('country')}
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
    </form>
  );
};