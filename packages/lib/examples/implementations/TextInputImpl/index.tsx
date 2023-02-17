import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { ValidationSchema } from '@interfaces';

export const TextInputImpl: Component<{ schema: ValidationSchema<any> }> = (props) => {
  const formHandler = useFormHandler(props.schema);

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
        {formHandler.isFieldInvalid('name') && (
          <>
            <br />
            <small style="color: red">{formHandler.getFieldError('name')}</small>
          </>
        )}
      </div>
    </>
  );
};
