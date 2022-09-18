//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

// ...

const formHandler = useFormHandler(yupSchema(schema));

// ...

<div>
  <label>Country</label>
  <select
    name="country"
    value={formHandler.getFieldValue('country')}
    onInput={({ currentTarget: { name, value } }) =>
      //Sets and validates the field value inside the form handler.
      formHandler.setFieldValue(name, value)
    }
    onBlur={({ currentTarget: { name } }) => {
      //Field is validated and touched.
      formHandler.validateField(name);
      formHandler.touchField(name);
    }}
  >
    <For each={countries}>
      {(country) => <option value={country.value}>{country.label}</option>}
    </For>
  </select>
  {formHandler.fieldHasError('country') && (
    <small>{formHandler.getFieldError('country')}</small>
  )}
</div>;
