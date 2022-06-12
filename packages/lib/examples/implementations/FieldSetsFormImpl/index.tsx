import { useFormHandler } from '@hooks';
import { Component, createSignal, onMount, For } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
};

const objSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
});

const schema: yup.SchemaOf<Schema[]> = yup.array(objSchema).default([objSchema.getDefault()]).min(1);

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

      <button onClick={fillForm} disabled={formHandler.isFormInvalid()} type="button">
        Fill form
      </button>
      <pre style="color: red">
        <code>{JSON.stringify(formHandler.getFormErrors(), null, 4)}</code>
      </pre>
    </form>
  );
};
