import { Component, For } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import * as yup from 'yup';

type SelectableOption = {
  value: number | string;
  label: string;
};

type Schema = {
  favoriteFoods: number[];
};

const schema: yup.SchemaOf<Schema> = yup.object({
  favoriteFoods: yup.array(yup.number().required()).min(2),
});

const favoriteFoods: SelectableOption[] = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Hot Dog' },
  { value: 3, label: 'Hamburger' },
  { value: 4, label: 'Ice Cream' },
  { value: 5, label: 'Sushi' },
];

export const Form: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
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
      <h4 class="mb-3">Using yup schema</h4>
      <div class="mb-3">
        <For each={favoriteFoods}>
          {(favoriteFood, i) => (
            <div
              class="form-check"
              classList={{
                'is-invalid': formHandler.fieldHasError('favoriteFoods'),
              }}
            >
              <input
                class="form-check-input"
                id={`favoriteFoods-${i()}`}
                type="checkbox"
                value={favoriteFood.value}
                classList={{
                  'is-invalid': formHandler.fieldHasError('favoriteFoods'),
                }}
                name="favoriteFoods"
                checked={formHandler
                  .getFieldValue('favoriteFoods')
                  .some((item: any) => item == favoriteFood.value)}
                onChange={({ currentTarget: { name, checked, value } }) => {
                  if (checked) {
                    formHandler.setFieldValue(name, [
                      ...formHandler.getFieldValue('favoriteFoods'),
                      value,
                    ]);
                  } else {
                    formHandler.setFieldValue(
                      name,
                      formHandler
                        .getFieldValue('favoriteFoods')
                        .filter((item: any) => value != item)
                    );
                  }
                }}
              />
              <label for={`favoriteFoods-${i()}`} class="form-check-label">
                {favoriteFood.label}
              </label>
            </div>
          )}
        </For>
        {formHandler.fieldHasError('favoriteFoods') && (
          <div class="invalid-feedback">
            {formHandler.getFieldError('favoriteFoods')}
          </div>
        )}
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2">Submit</button>
        <button class="btn btn-primary me-2" onClick={reset} type="button">
          Reset
        </button>
        <button class="btn btn-primary me-2" onClick={fill} type="button">
          Fill
        </button>
      </div>
      <p>
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
