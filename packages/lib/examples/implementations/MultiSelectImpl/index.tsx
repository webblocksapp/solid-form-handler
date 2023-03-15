import { Field } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@adapters';
import { Component, For, Show } from 'solid-js';
import * as yup from 'yup';

const schema = yup.object({ countries: yup.array(yup.number()).min(2) });

export const MultiSelectImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formHandler.formData()));
      await formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <Field
          mode="input"
          name="countries"
          formHandler={formHandler}
          render={(field) => (
            <div style="display: flex; flex-flow: column">
              <label>Countries</label>
              <select
                {...field.helpers.getPropsExcept(['onInput', 'value'])}
                multiple
                onInput={(event) => {
                  const selectedValues = [...event?.currentTarget?.options]
                    .filter((option) => option.selected)
                    .map((option) => option.value);
                  field.helpers.onValueChange(selectedValues);
                }}
              >
                <For
                  each={[
                    { label: 'Colombia', value: 1 },
                    { label: 'Argentina', value: 2 },
                    { label: 'Perú', value: 3 },
                  ]}
                >
                  {({ label, value }) => (
                    <option value={value} selected={field.helpers.matches(value)}>
                      {label}
                    </option>
                  )}
                </For>
              </select>
              <Show when={field.helpers.error}>{field.helpers.errorMessage}</Show>
            </div>
          )}
        />
      </div>
      <button>Send</button>
      <div>
        <pre>
          <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
          <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
        </pre>
      </div>
    </form>
  );
};
