//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

// ...

const formHandler = useFormHandler(yupSchema(schema));

// ...
<div>
  <label>Email</label>
  <input
    name="email"
    value={formHandler.getFieldValue('email')}
    onInput={({ currentTarget: { name, value } }) =>
      //Sets and validates the field value inside the form handler.
      formHandler.setFieldValue(name, value)
    }
    onBlur={({ currentTarget: { name } }) => {
      //Field is validated and touched.
      formHandler.validateField(name);
      formHandler.touchField(name);
    }}
  />
  {formHandler.fieldHasError('email') && (
    <small>{formHandler.getFieldError('email')}</small>
  )}
</div>;
