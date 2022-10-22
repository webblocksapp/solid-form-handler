import { Component, onMount } from 'solid-js';
import { TextInput } from '@components';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';
import { yupSchema } from '@utils';

const schema = yup.object({
  password: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['passwordConfirm'];
      },
      message: "Password doesn't match",
    }),
  passwordConfirm: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['password'];
      },
      message: "Password doesn't match",
    }),
});

export const DependantValidationImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema), { delay: 300 });
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = async () => {
    await formHandler.resetForm();
    console.log('Form has been reset');
  };

  const fill = () => {
    formHandler.fillForm({ password: 'abc', passwordConfirm: 'abc' });
  };

  const setValues = () => {
    formHandler.setFieldValue('password', 'abc');
    formHandler.setFieldValue('passwordConfirm', 'ab');
  };

  formHandler.setFieldTriggers('password', ['passwordConfirm']);
  formHandler.setFieldTriggers('passwordConfirm', ['password']);

  return (
    <>
      <form onSubmit={submit}>
        <TextInput label="Password" name="password" formHandler={formHandler} />
        <TextInput label="Password Confirm" name="passwordConfirm" formHandler={formHandler} />
        <button>Submit</button>
        <button disabled={formHandler.isFormInvalid()}>Submit</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={fill}>
          Fill
        </button>
        <button type="button" onClick={setValues}>
          Set values
        </button>
      </form>
    </>
  );
};
