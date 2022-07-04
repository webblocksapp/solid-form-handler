import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';

/**
 * Entity type definition
 */
type User = {
  name: string;
  email: string;
};

/**
 * Schema definition through entity
 */
const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
});

export const UserForm: Component = () => {
  const formHandler = useFormHandler(userSchema);

  return (
    <>
      <form>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            class="form-control"
            classList={{ 'is-invalid': formHandler.fieldHasError('name') }}
            name="name"
            onInput={({ currentTarget: { name, value } }) => formHandler.setFieldValue(name, value)}
          />
          {formHandler.fieldHasError('name') && <div class="invalid-feedback">{formHandler.getFieldError('name')}</div>}
        </div>
      </form>
    </>
  );
};
