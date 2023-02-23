import { Component, Show } from 'solid-js';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import * as yup from 'yup';
import { Field } from '@components';

type Schema = {
  policy: boolean;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  policy: yup.boolean().required().oneOf([true], 'Field must be checked'),
});

export const CheckboxImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));

  return (
    <>
      <div>
        <h3>Checkbox implementation</h3>

        <Field
          formHandler={formHandler}
          mode="checkbox"
          name="policy"
          render={(field) => (
            <>
              <div style="display: flex; align-items: center">
                <input {...field.props} type="checkbox" data-testid="test-checkbox" />
                <label for={field.props.id}>Accept terms and conditions</label>
              </div>
              <Show when={field.helpers.error}>
                <small style="color: red">{field.helpers.errorMessage}</small>
              </Show>
            </>
          )}
        ></Field>
      </div>
    </>
  );
};
