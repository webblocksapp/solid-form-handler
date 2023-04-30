import { useFormHandler } from '@hooks';
import { Component, onMount, For } from 'solid-js';
import { yupSchema } from '@adapters';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
};

const schema: yup.Schema<Schema[]> = yup
  .array()
  .of(
    yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().typeError('Invalid age value'),
    })
  )
  .min(1)
  .required();

export const FieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema[]>(yupSchema(schema));
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    alert(JSON.stringify(formData()));
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

  const setFieldset1DefaultValue = () => {
    formHandler.setFieldDefaultValue('0', {
      name: 'Laura',
      age: 22,
    });
  };

  const setFieldset2DefaultValue = () => {
    formHandler.setFieldDefaultValue('1.name', 'Matt');
  };

  onMount(() => {
    fillForm();
  });

  return (
    <form>
      <h5>Fieldsets</h5>
      <For each={formData()}>
        {(fieldset, i) => (
          <fieldset data-testid="fieldset">
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
      <button onClick={fillForm} type="button">
        Fill form
      </button>
      <button onClick={() => formHandler.resetForm()} type="button">
        Reset form
      </button>
      <button onClick={setFieldset1DefaultValue} type="button">
        Set FS1 def. value
      </button>
      <button onClick={setFieldset2DefaultValue} type="button">
        Set FS2 def. value
      </button>
      <pre>
        <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
