const n=`import { Component, For, Show } from 'solid-js';
import { Field, useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';

const schema = z.object({
  country: z.coerce.number().min(1, 'country is required'),
});

const countries = [
  { value: '', label: 'Select a country' },
  { value: 1, label: 'Colombia' },
  { value: 2, label: 'Argentina' },
  { value: 3, label: 'Venezuela' },
];

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
    formHandler.fillForm({ country: 2 });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4 class="mb-3">Using zod schema</h4>
      <div class="mb-3">
        <Field
          mode="input"
          name="country"
          formHandler={formHandler}
          render={(field) => (
            <>
              <label class="form-label" for={field.props.id}>
                Country
              </label>
              <select
                {...field.props}
                class="form-select"
                classList={{ 'is-invalid': field.helpers.error }}
              >
                <For each={countries}>
                  {(country) => (
                    <option
                      value={country.value}
                      selected={country.value == field.props.value}
                    >
                      {country.label}
                    </option>
                  )}
                </For>
              </select>
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
//# sourceMappingURL=index-a9b28d8c.js.map
