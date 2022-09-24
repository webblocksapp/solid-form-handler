import { useFormHandler } from '@hooks';
import { Component, onMount, For } from 'solid-js';
import { yupSchema } from '@utils';
import * as yup from 'yup';
import { TextInput } from '@components';

type Schema = {
  name: string;
  age: number;
};

const schema: yup.SchemaOf<Schema[]> = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().typeError('Invalid age value'),
  })
);

export const FieldsetsFormStress1: Component = () => {
  const formHandler = useFormHandler<Schema[]>(yupSchema(schema));
  const { formData } = formHandler;

  const submit = async () => {
    alert(JSON.stringify(formData()));
  };

  const addFieldset = () => {
    formHandler.addFieldset();
  };

  onMount(() => {
    formHandler
      .fillForm([
        {
          name: 'John',
          age: 22,
        },
      ])
      .then(() => {
        formHandler.addFieldset();
        formHandler.addFieldset();
      });
  });

  return (
    <form>
      <h5>Fieldsets</h5>
      <For each={formData()}>
        {(_, i) => (
          <fieldset data-testid="fieldset">
            <legend>Record {i() + 1}</legend>
            <div style="margin-bottom: 10px">
              <TextInput label="Name" name={`${i()}.name`} formHandler={formHandler} />
            </div>
            <div style="margin-bottom: 10px">
              <TextInput label="Age" name={`${i()}.age`} formHandler={formHandler} />
            </div>
            <button data-testid={`remove-${i()}`} type="button" onClick={() => formHandler.removeFieldset(i())}>
              X
            </button>
          </fieldset>
        )}
      </For>

      <button onClick={submit} disabled={formHandler.isFormInvalid()} type="button">
        Submit
      </button>
      <button data-testid="add" onClick={addFieldset} type="button">
        Add
      </button>
      <button onClick={() => formHandler.resetForm()} type="button">
        Reset form
      </button>
      <pre>
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
