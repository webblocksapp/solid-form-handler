//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

// ...

const formHandler = useFormHandler(yupSchema(schema));

// ...

<div>
  <div>
    <input
      type="checkbox"
      id="acceptPolicy"
      name="acceptPolicy"
      checked={formHandler.getFieldValue('acceptPolicy')}
      onChange={({ currentTarget: { name, checked } }) => {
        //Checked status is taken as a value and stored at form handler.
        formHandler.setFieldValue(name, checked);
      }}
      onBlur={({ currentTarget: { name } }) => {
        //Field is validated and touched.
        formHandler.validateField(name);
        formHandler.touchField(name);
      }}
    />
    <label for="acceptPolicy">Accept policy.</label>
  </div>
  {formHandler.fieldHasError('acceptPolicy') && (
    <small>{formHandler.getFieldError('acceptPolicy')}</small>
  )}
</div>;
