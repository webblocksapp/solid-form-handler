import { Component } from 'solid-js';
import { TextInput } from '@example-components';
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
  const formHandler = useFormHandler(yupSchema(schema));
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

  const setValues = async () => {
    console.log('Setting values');
    await Promise.allSettled([
      formHandler.setFieldValue('password', 'abc'),
      formHandler.setFieldValue('passwordConfirm', 'ab'),
      formHandler.setFieldValue('password', 'ab'),
    ]);
    console.log('Values set');
  };

  return (
    <>
      <form onSubmit={submit}>
        <TextInput
          data-testid="test-password"
          label="Password"
          name="password"
          formHandler={formHandler}
          triggers={['passwordConfirm']}
        />
        <TextInput
          data-testid="test-passwordConfirm"
          label="Password Confirm"
          name="passwordConfirm"
          formHandler={formHandler}
          triggers={['password']}
        />
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
