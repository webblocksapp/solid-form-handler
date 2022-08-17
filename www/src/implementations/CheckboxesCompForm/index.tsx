import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';
import { Checkboxes } from '@components';

type Schema = {
  favoriteFoods: number[];
  jsFrameworks: Array<'solidjs' | 'reactjs' | 'angular'>;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  favoriteFoods: yup.array(yup.number().required()).min(2),
  jsFrameworks: yup
    .array(yup.mixed().oneOf(['solidjs', 'reactjs', 'angular']))
    .min(2),
});

export const Form: Component = () => {
  const formHandler = useFormHandler<Schema>(schema);
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
    formHandler.fillForm({
      favoriteFoods: [1, 4],
      jsFrameworks: ['solidjs', 'angular'],
    });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div class="mb-3">
        <Checkboxes
          label="Favorite foods"
          name="favoriteFoods"
          formHandler={formHandler}
          options={[
            { value: 1, label: 'Pizza' },
            { value: 2, label: 'Hot Dog' },
            { value: 3, label: 'Hamburger' },
            { value: 4, label: 'Ice Cream' },
            { value: 5, label: 'Sushi' },
          ]}
        />
      </div>
      <div class="mb-3">
        <Checkboxes
          label="JS Frameworks"
          name="jsFrameworks"
          formHandler={formHandler}
          options={[
            { value: 'solidjs', label: 'SolidJS' },
            { value: 'angular', label: 'Angular' },
            { value: 'reactjs', label: 'ReactJS' },
          ]}
        />
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
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
