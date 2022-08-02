import { Component, For } from 'solid-js';
import { useFormHandler } from '@hooks';
import * as yup from 'yup';

type SelectableOption = {
  value: number | string;
  label: string;
};

type CheckboxesSchema = {
  favoriteFoods: number[];
};

const checkboxesSchema: yup.SchemaOf<CheckboxesSchema> = yup.object({
  favoriteFoods: yup.array(yup.number().required()).min(2),
});

const favoriteFoods: SelectableOption[] = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Hot Dog' },
  { value: 3, label: 'Hamburger' },
  { value: 4, label: 'Ice Cream' },
  { value: 5, label: 'Sushi' },
];

export const CheckboxesImpl: Component = () => {
  const formHandler = useFormHandler<CheckboxesSchema>(checkboxesSchema);
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    if (await formHandler.validateForm()) {
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm({ favoriteFoods: [1, 4] });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div>
        <For each={favoriteFoods}>
          {(favoriteFood) => (
            <div>
              <label>{favoriteFood.label}</label>
              <input
                type="checkbox"
                value={favoriteFood.value}
                name="favoriteFoods"
                checked={formHandler.getFieldValue('favoriteFoods').some((item: any) => item == favoriteFood.value)}
                onChange={({ currentTarget: { name, checked, value } }) => {
                  if (checked) {
                    formHandler.setFieldValue(name, [...formHandler.getFieldValue('favoriteFoods'), value]);
                  } else {
                    formHandler.setFieldValue(
                      name,
                      formHandler.getFieldValue('favoriteFoods').filter((item: any) => value != item)
                    );
                  }
                }}
              />
            </div>
          )}
        </For>
        {formHandler.fieldHasError('favoriteFoods') && (
          <div style={{ color: 'red' }}>{formHandler.getFieldError('favoriteFoods')}</div>
        )}
      </div>
      <div>
        <button>Submit</button>
        <button onClick={reset} type="button">
          Reset
        </button>
        <button onClick={fill} type="button">
          Fill
        </button>
      </div>
      <p>
        <b>Form data:</b>
      </p>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
