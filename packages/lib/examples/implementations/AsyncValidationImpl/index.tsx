import { Component, createEffect } from 'solid-js';
import { TextInput } from '@components';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';
import { yupSchema } from '@utils';
import { createStore } from 'solid-js/store';

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
  const [store, setStore] = createStore({ email: 0 });

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await formHandler.validateForm();
      alert(formData());
    } catch (error) {
      console.error(error);
    }
  };

  const fill = () => {
    formHandler.fillForm({ email: 'test@mail.com' }, { silentValidation: false });
  };

  createEffect(() => {
    formHandler.isFieldValidating('email') && setStore((prev) => ({ ...prev, email: prev.email + 1 }));
  });

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
        <button onClick={fill} type="button">
          Fill
        </button>
        <button disabled={formHandler.isFormInvalid()}>Submit</button>
        <p class="mt-5">
          <b>Times validated:</b>
        </p>
        <pre>
          <code>{JSON.stringify(store, null, 2)}</code>
        </pre>
      </form>
    </>
  );
};
