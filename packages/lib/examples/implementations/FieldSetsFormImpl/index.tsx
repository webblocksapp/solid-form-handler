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
    contacts: yup.array(yup.object({ name: yup.string(), age: yup.string() })),
  })
);

export const FieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema[]>(schema);

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
          </fieldset>
        )}
      </For>

      <button onClick={fillForm} disabled={formHandler.isFormInvalid()} type="button">
        Fill form
      </button>
      <br />
      <span>Errors</span>
      <pre style="color: red">
        <code>{JSON.stringify(formHandler.getFormErrors(), null, 2)}</code>
      </pre>
    </form>
  );
};
