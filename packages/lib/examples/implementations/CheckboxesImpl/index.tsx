import { Component, For, Show } from 'solid-js';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import * as yup from 'yup';
import { Field } from '@components';

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
  const formHandler = useFormHandler<CheckboxesSchema>(yupSchema(checkboxesSchema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
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
        <Field
          mode="checkbox-group"
          name="favoriteFoods"
          formHandler={formHandler}
          render={(field) => (
            <>
              <For each={favoriteFoods}>
                {(favoriteFood, i) => (
                  <div>
                    <label>{favoriteFood.label}</label>
                    <input
                      {...field.props}
                      id={`${field.props.id}-${i()}`}
                      type="checkbox"
                      value={favoriteFood.value}
                      checked={field.helpers.isChecked(favoriteFood.value)}
                    />
                  </div>
                )}
              </For>
              <Show when={field.helpers.error}>
                <div style={{ color: 'red' }}>{field.helpers.errorMessage}</div>
              </Show>
            </>
          )}
        ></Field>
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
