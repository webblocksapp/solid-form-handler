import { useFormHandler } from '@hooks';
import { Component, onMount, For } from 'solid-js';
import * as yup from 'yup';

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

export const FieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema[]>(schema);

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    alert(JSON.stringify(formHandler.getFormData()));
  };

  const fillForm = () => {
    formHandler.fillForm([
      {
        name: 'John',
        age: 22,
      },
    ]);
  };

  const addFieldset = () => {
    formHandler.addFieldset();
  };

  const addFieldsetWithData = () => {
    formHandler.addFieldset<Schema>({ data: { name: 'Mary', age: 17 } });
  };

  onMount(() => {
    fillForm();
  });

  return (
    <form>
      <h5>Fieldsets</h5>
      <For each={formHandler.getFormData()}>
        {(fieldset, i) => (
          <fieldset>
            <legend>Record {i() + 1}</legend>
            <div style="margin-bottom: 10px">
              <label>Name</label>
              <input value={fieldset.name} name={`${i()}.name`} onInput={onInput}></input>
              <br />
              <small style="color: red;">{formHandler.getFieldError(`${i()}.name`)}</small>
            </div>
            <div style="margin-bottom: 10px">
              <label>Age</label>
              <input value={fieldset.age} name={`${i()}.age`} onInput={onInput}></input>
              <br />
              <small style="color: red;">{formHandler.getFieldError(`${i()}.age`)}</small>
            </div>
            <button onClick={() => formHandler.removeFieldset(i())}>X</button>
          </fieldset>
        )}
      </For>

      <button onClick={submit} disabled={formHandler.isFormInvalid()} type="button">
        Submit
      </button>
      <button onClick={addFieldset} type="button">
        Add
      </button>
      <button onClick={addFieldsetWithData} type="button">
        Add with data
      </button>
      <button onClick={fillForm} type="button">
        Fill form
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
