import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';
import { Radios } from '@components';

const schema = z.object({
  country: z.number().min(1, 'country is required'),
  animal: z.number().min(1, 'animal is required'),
  jsFramework: z
    .string()
    .refine((value) =>
      ['solidjs', 'reactjs', 'angular'].some((item) => item === value)
    ),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
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
      <h4 class="mb-3">Using zod schema</h4>
      <div class="mb-3">
        <Radios
          label="Choose a country"
          name="country"
          options={[
            { value: 1, label: 'Colombia' },
            { value: 2, label: 'Argentina' },
            { value: 3, label: 'Venezuela' },
          ]}
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <Radios
          label="Choose an animal"
          name="animal"
          options={[
            { value: 1, label: 'Dog' },
            { value: 2, label: 'Cat' },
            { value: 3, label: 'Fish' },
          ]}
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <Radios
          label="Choose a javascript framework"
          name="jsFramework"
          options={[
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
    </form>
  );
};
