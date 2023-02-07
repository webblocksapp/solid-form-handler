import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@utils';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'name is a required field'),
  email: z.string().email(),
});

export const TextInputImpl: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));

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
