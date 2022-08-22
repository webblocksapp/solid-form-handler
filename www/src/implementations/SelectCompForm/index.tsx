import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';
import { Select } from '@components';

type Schema = {
  country: number;
  animal: number;
  jsFramework: 'solidjs' | 'reactjs' | 'angular';
};

const schema: yup.SchemaOf<Schema> = yup.object({
  country: yup.number().required().typeError('country is required'),
  animal: yup.number().required().typeError('animal is required'),
  jsFramework: yup.mixed().required().oneOf(['solidjs', 'reactjs', 'angular']),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(schema);
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
    formHandler.fillForm({ country: 2, animal: 3, jsFramework: 'solidjs' });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div class="mb-3">
        <Select
          label="Country"
          name="country"
          options={[
            { value: '', label: 'Select a country' },
            { value: 1, label: 'Colombia' },
            { value: 2, label: 'Argentina' },
            { value: 3, label: 'Venezuela' },
          ]}
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <Select
          label="Animal"
          name="animal"
          options={[
            { value: '', label: 'Select an animal' },
            { value: 1, label: 'Dog' },
            { value: 2, label: 'Cat' },
            { value: 3, label: 'Fish' },
          ]}
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <Select
          label="Javascript Framework"
          name="jsFramework"
          options={[
            { value: '', label: 'Select a js framework' },
            { value: 'solidjs', label: 'SolidJS' },
            { value: 'angular', label: 'Angular' },
            { value: 'reactjs', label: 'ReactJS' },
          ]}
          formHandler={formHandler}
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
      <p>
        <b>Form state:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
