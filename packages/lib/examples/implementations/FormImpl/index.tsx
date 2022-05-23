import { useFormHandler } from '@hooks';
import { FormErrorsException } from '@utils';
import { Component, createSignal } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().typeError('Age is required'),
});

export const FormImpl: Component = () => {
  const formHandler = useFormHandler(schema);
  const [error, setError] = createSignal('');

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    try {
      setError('');
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formHandler.getFormData())}`);
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(
          JSON.stringify(
            error.validationResult.map((item) => item.errorMessage),
            null,
            2
          )
        );
      }
    }
  };

  return (
    <form>
      <h3>Form Implementation</h3>
      <div>
        <label>Name</label>
        <br />
        <input name="name" onInput={onInput}></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('name')}</small>
      </div>
      <div>
        <label>Age</label>
        <br />
        <input name="age" onInput={onInput}></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('age')}</small>
      </div>
      <br />
      <button type="button" onClick={submit}>
        Submit
      </button>
      <br />
      <pre style="color: red">
        <code>{error()}</code>
      </pre>
    </form>
  );
};
