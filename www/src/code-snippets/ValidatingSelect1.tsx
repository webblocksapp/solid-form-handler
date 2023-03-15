//@ts-nocheck
import { Field, useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';

// ...

const formHandler = useFormHandler(__VALIDATOR__Schema(schema));

// ...

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
/>;
