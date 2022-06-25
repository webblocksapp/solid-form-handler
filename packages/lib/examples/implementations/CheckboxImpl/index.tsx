import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';

type Schema = {
  policy: boolean;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  policy: yup.boolean().required().oneOf([true], 'Field must be checked'),
});

export const CheckboxImpl: Component = () => {
  const formHandler = useFormHandler(schema);

  return (
    <>
      <div>
        <h3>Checkbox implementation</h3>
        <div style="display: flex; align-items: center">
          <input
            type="checkbox"
            data-testid="test-checkbox"
            id="policy"
            name="policy"
            onchange={({ currentTarget: { name, checked } }) => formHandler.setFieldValue(name, checked)}
          />
          <label for="policy">Accept terms and conditions</label>
        </div>
        <small style="color: red">{formHandler.getFieldError('policy')}</small>
      </div>
    </>
  );
};
