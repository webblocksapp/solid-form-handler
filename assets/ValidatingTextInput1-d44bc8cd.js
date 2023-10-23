const n=`//@ts-nocheck
import { Field, useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';

// ...

const formHandler = useFormHandler(__VALIDATOR__Schema(schema));

// ...
<Field
  mode="input"
  name="email"
  formHandler={formHandler}
  render={(field) => (
    <>
      <label class="form-label" for={field.props.id}>
        Email
      </label>
      <input
        {...field.props}
        class="form-control"
        classList={{ 'is-invalid': field.helpers.error }}
      />
      <Show when={field.helpers.error}>
        <div class="invalid-feedback">{field.helpers.errorMessage}</div>
      </Show>
    </>
  )}
/>;
`;export{n as default};
