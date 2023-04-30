import { useFormHandler } from '@hooks';
import { Component, onMount, For } from 'solid-js';
import { yupSchema } from '@adapters';
import * as yup from 'yup';

type Schema = {
  nested: Array<{
    name: string;
    age: number;
  }>;
};

const schema: yup.Schema<Schema> = yup.object({
  nested: yup
    .array(
      yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required().typeError('Invalid age value'),
      })
    )
    .min(2)
    .required(),
});

export const NestedFieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema), { delay: 200 });
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formData()));
    } catch (error) {
      console.error(error);
    }
  };

  const fillForm = () => {
    formHandler.fillForm({
      nested: [
        {
          name: 'John',
          age: 22,
        },
      ],
    });
  };

  const setNested = () => {
    formHandler.setFieldValue('nested', [
      { name: 'Laura', age: 28 },
      { name: 'Jorge', age: 34 },
    ]);
  };

  const addFieldset = () => {
    formHandler.addFieldset({ basePath: 'nested' });
  };

  const setFieldset0DefaultValue = () => {
    formHandler.setFieldDefaultValue('nested.0', {
      name: 'Laura',
      age: 22,
    });
  };

  onMount(() => {
    //  fillForm();
  });

  return (
    <form>
      <h5>Nested Fieldsets</h5>
      <For each={formData().nested}>
        {(fieldset, i) => (
          <fieldset data-testid="fieldset">
            <legend>Record {i() + 1}</legend>
            <div style="margin-bottom: 10px">
              <label>Name</label>
              <input value={fieldset.name} name={`nested.${i()}.name`} onInput={onInput}></input>
              <br />
              <small style="color: red;">{formHandler.getFieldError(`${i()}.name`)}</small>
            </div>
            <div style="margin-bottom: 10px">
              <label>Age</label>
              <input value={fieldset.age} name={`nested.${i()}.age`} onInput={onInput}></input>
              <br />
              <small style="color: red;">{formHandler.getFieldError(`${i()}.age`)}</small>
            </div>
            <button
              data-testid={`remove-${i()}`}
              type="button"
              onClick={() => formHandler.removeFieldset(i(), 'nested')}
            >
              X
            </button>
          </fieldset>
        )}
      </For>

      <button onClick={submit} disabled={formHandler.isFormInvalid()} type="button">
        Submit
      </button>
      <button onClick={setNested} type="button">
        Set Nested
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
      <button onClick={setFieldset0DefaultValue} type="button">
        Set FS0 def. value
      </button>
      <pre>
        <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
