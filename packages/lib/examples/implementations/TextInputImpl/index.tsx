import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';

type Schema = {
  name: string;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
});

export const TextInputImpl: Component = () => {
  const formHandler = useFormHandler(schema);

  return (
    <>
      <div>
        <h3>Text input implementation</h3>
        <label>Name</label>
        <br />
        <input
          data-testid="test-input"
          name="name"
          placeholder="Write your name"
          oninput={({ currentTarget: { name, value } }) => formHandler.setFieldValue(name, value)}
          onblur={({ currentTarget: { name } }) => formHandler.validateField(name)}
        ></input>
        {formHandler.fieldHasError('name') && (
          <>
            <br />
            <small style="color: red">{formHandler.getFieldError('name')}</small>
          </>
        )}
      </div>
    </>
  );
};
