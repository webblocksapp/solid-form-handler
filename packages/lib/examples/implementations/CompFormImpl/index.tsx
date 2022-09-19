import { TextInput, Select } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { Component } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
  country: number;
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  country: yup.number().required(),
});

export const CompFormImpl: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));
  const { formData } = formHandler;

  const submit = async () => {
    try {
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formData())}`);
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <form>
      <h3>Form Implementation</h3>
      <div>
        <TextInput label="Name" name="name" formHandler={formHandler} />
      </div>
      <div>
        <TextInput label="Age" name="age" type="number" value="2" formHandler={formHandler} />
      </div>
      <div>
        <Select
          label="Country"
          name="country"
          placeholder="Select a country"
          options={[
            { value: 1, label: 'Colombia' },
            { value: 2, label: 'Peru' },
            { value: 3, label: 'Argentina' },
          ]}
          formHandler={formHandler}
        />
      </div>
      <br />
      <button data-testid="submit" type="button" onClick={submit}>
        Submit
      </button>
      <button data-testid="reset" type="button" onClick={reset}>
        Reset
      </button>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
