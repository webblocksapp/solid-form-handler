import { Checkbox, TextInput } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { Component } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  isAdult: boolean;
  email?: string;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  isAdult: yup.boolean().required(),
  email: yup.string().when('isAdult', { is: true, then: yup.string().email().required() }),
});

export const ConditionalFormImpl: Component = () => {
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

  return (
    <form onSubmit={submit}>
      <Checkbox label="isAdult" name="isAdult" checked={false} formHandler={formHandler} />
      {formData().isAdult && <TextInput label="Email" name="email" formHandler={formHandler} />}
      <button>Submit</button>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
