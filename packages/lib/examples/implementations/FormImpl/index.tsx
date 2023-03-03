import { useFormHandler } from '@hooks';
import { FormErrorsException } from '@utils';
import { Component, createSignal } from 'solid-js';
import { yupSchema } from '@utils';
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
  const formHandler = useFormHandler(yupSchema(schema));
  const [error, setError] = createSignal('');
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    try {
      setError('');
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formData())}`);
      formHandler.resetForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(
          JSON.stringify(
            error.validationResult.map((item) => item.message),
            null,
            2
          )
        );
      }
    }
  };

  formHandler.setFieldValue('name', '');

  return (
    <form>
      <h3>Form Implementation</h3>
      <div>
        <label>Name</label>
        <br />
        <input
          data-testid="name"
          name="name"
          onInput={onInput}
          value={formHandler.getFieldValue('name', (value) => String(value))}
        ></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('name')}</small>
      </div>
      <div>
        <label>Age</label>
        <br />
        <input
          data-testid="age"
          name="age"
          onInput={onInput}
          value={formHandler.getFieldValue('age', (value) => String(value))}
        ></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('age')}</small>
      </div>
      <br />
      <button data-testid="submit" type="button" onClick={submit}>
        Submit
      </button>
      <br />
      <pre style="color: red">
        <code data-testid="error">{error()}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
