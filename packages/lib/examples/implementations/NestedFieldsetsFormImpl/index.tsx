import { useFormHandler } from '@hooks';
import { Component, onMount, For } from 'solid-js';
import { yupSchema } from '@utils';
import * as yup from 'yup';

type Schema = {
  nested: Array<{
    name: string;
    age: number;
  }>;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  nested: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().typeError('Invalid age value'),
    })
  ),
});

export const NestedFieldsetsFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const submit = async () => {
    alert(JSON.stringify(formData()));
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

  const addFieldset = () => {
    formHandler.addFieldset({ basePath: 'nested' });
  };

  const addFieldsetWithData = () => {
    formHandler.addFieldset<Schema['nested'][0]>({ basePath: 'nested', data: { name: 'Mary', age: 17 } });
  };

  onMount(() => {
    fillForm();
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
      <button data-testid="add" onClick={addFieldset} type="button">
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
