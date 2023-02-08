import { Component } from 'solid-js';
import { useFormHandler, zodSchema } from 'solid-form-handler';
import { personSchema } from './schema';
import { TextInput } from '@components';

export const PersonForm: Component = () => {
  const formHandler = useFormHandler(zodSchema(personSchema));
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

  const fill = () => {
    formHandler.fillForm({
      name: 'John',
      age: 28,
      contact: {
        email: 'john@test.com',
        phone: '3122121',
        address: 'Street 123',
      },
    });
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <form class="container" onSubmit={submit}>
      <h4 class="mb-3">Using zod schema</h4>
      <div class="row gy-3">
        <div class="col-sm-12 col-md-6">
          <TextInput label="Name" name="name" formHandler={formHandler} />
        </div>
        <div class="col-sm-12 col-md-6">
          <TextInput
            label="Age"
            name="age"
            type="number"
            formHandler={formHandler}
          />
        </div>
        <div class="col-12">
          <div class="row gy-3 border my-3 mx-1 p-3">
            <h6>Contact:</h6>
            <div class="col-sm-12 col-md-6">
              <TextInput
                label="Email"
                name="contact.email"
                formHandler={formHandler}
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <TextInput
                label="Phone"
                name="contact.phone"
                formHandler={formHandler}
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <TextInput
                label="Address"
                name="contact.address"
                formHandler={formHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 w-100">
        <button class="btn btn-primary me-2 mt-2">Submit</button>
        <button
          class="btn btn-primary me-2 mt-2"
          disabled={formHandler.isFormInvalid()}
        >
          Submit
        </button>
        <button class="btn btn-primary me-2 mt-2" onClick={fill} type="button">
          Fill
        </button>
        <button class="btn btn-primary me-2 mt-2" onClick={reset} type="button">
          Reset
        </button>
      </div>
      <p class="mt-5">
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
