//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

// ...

const formHandler = useFormHandler(yupSchema(schema));

// ...

<input
  // ...
  name="email"
  onInput={({ currentTarget: { name, value } }) =>
    //Sets and validates the field value inside the form handler.
    formHandler.setFieldValue(name, value)
  }
  onBlur={({ currentTarget: { name } }) => {
    //Field is validated and touched.
    formHandler.validateField(name);
    formHandler.touchField(name);
  }}
  // ...
/>;
