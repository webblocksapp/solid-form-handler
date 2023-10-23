const n=`import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import * as yup from 'yup';
import { TextInput } from '@components';

type Schema = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

const schema: yup.Schema<Schema> = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().required().typeError('age must be a numeric value'),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema));
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
    formHandler.fillForm({
      firstName: 'John',
      lastName: 'Wick',
      email: 'test@mail.com',
      age: 42,
    });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4 class="mb-3">Using yup schema</h4>
      <div class="mb-3">
        <TextInput
          label="First Name"
          name="firstName"
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <TextInput
          label="Last Name"
          name="lastName"
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <TextInput label="Email" name="email" formHandler={formHandler} />
      </div>
      <div class="mb-3">
        <TextInput label="Age" name="age" formHandler={formHandler} />
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
`;export{n as default};
//# sourceMappingURL=index-99c17d0d.js.map
