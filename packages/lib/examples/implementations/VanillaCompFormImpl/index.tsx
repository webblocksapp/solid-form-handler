import { TextInput, Select, Checkbox, Checkboxes } from '@vanilla-components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { Component } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
  country: number;
  subscribed: boolean;
  status: 'active' | 'inactive';
  favoriteFoods: number[];
};

const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  country: yup.number().required(),
  subscribed: yup.boolean().required().oneOf([true]),
  status: yup.mixed().required().oneOf(['active', 'inactive']),
  favoriteFoods: yup.array(yup.number().required()).min(2),
});

export const VanillaCompFormImpl: Component = () => {
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
      <h3>Vanilla Form Implementation</h3>
      <div>
        <TextInput label="Name" name="name" formHandler={formHandler} />
      </div>
      <br />
      <div>
        <TextInput label="Age" name="age" type="number" value="2" formHandler={formHandler} />
      </div>
      <br />
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
      <div>
        <Checkbox label="Subscribed" name="subscribed" formHandler={formHandler} />
      </div>
      <br />
      <div>
        <Checkbox
          label="Status"
          name="status"
          value="active"
          uncheckedValue={'inactive'}
          defaultValue={'active'}
          formHandler={formHandler}
        />
      </div>
      <br />
      <div>
        <Checkboxes
          label="Favorite foods"
          name="favoriteFoods"
          options={[
            { value: 1, label: 'Pizza' },
            { value: 2, label: 'Ice cream' },
            { value: 3, label: 'Hamburger' },
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