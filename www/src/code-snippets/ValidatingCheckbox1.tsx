//@ts-nocheck
import { Field, useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';

// ...

const formHandler = useFormHandler(__VALIDATOR__Schema(schema));

// ...

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
/>;
