import { useFormHandler } from '@hooks';
import { Component, createSignal, onMount, For } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
};

const schema: yup.SchemaOf<Schema[]> = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().typeError('Age is required'),
  })
);

export const FieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema[]>(schema);
  const [error, setError] = createSignal('');

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {};

  const fillForm = () => {
    formHandler.fillForm([
      {
        name: 'John',
        age: 22,
      },
    ]);
  };

  onMount(() => {
    fillForm();
  });

  return (
    <form>
      <For each={formHandler.getFormData()}>
        {(fieldset, i) => (
          <fieldset>
            <legend>Record {i() + 1}</legend>
            <div style="margin-bottom: 10px">
              <label>Name</label>
              <input value={fieldset.name} name={`${i()}.name`}></input>
            </div>
            <div style="margin-bottom: 10px">
              <label>Age</label>
              <input value={fieldset.age} name={`${i()}.age`}></input>
            </div>
          </fieldset>
        )}
      </For>

      <button onClick={fillForm} type="button">
        Fill form
      </button>
    </form>
  );
};
