import { Component } from 'solid-js';
import { TextInput } from '@components';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';
import { yupSchema } from '@utils';

const asyncSchema = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .test('emailExists', (value, context) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if (value !== 'test@mail.com') {
            res(true);
          } else {
            rej(context.createError({ message: `Email ${value} already exists.` }));
          }
        }, 200);
      });
    }),
});

export const AsyncValidationImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(asyncSchema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await formHandler.validateForm();
      alert(formData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <TextInput label="Email" name="email" formHandler={formHandler} />
        <div>
          {formHandler.isFormInvalid() ? (
            <span style="color: red">Invalid</span>
          ) : (
            <span style="color: green">Valid</span>
          )}
        </div>
        <button>Submit</button>
        <button disabled={formHandler.isFormInvalid()}>Submit</button>
      </form>
    </>
  );
};
