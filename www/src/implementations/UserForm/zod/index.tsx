import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { userSchema } from './schema';
import { Checkbox, Checkboxes, Radios, Select, TextInput } from '@components';

export const UserForm: Component = () => {
  const formHandler = useFormHandler(zodSchema(userSchema));
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
      email: 'john@mail.com',
      country: 2,
      favoriteFoods: [3, 4],
      gender: 'female',
      subscribed: true,
    });
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <>
      <form autocomplete="off" onSubmit={submit}>
        <h4 class="mb-3">Using zod schema</h4>
        <div class="mb-3">
          <TextInput label="Name" name="name" formHandler={formHandler} />
        </div>
        <div class="mb-3">
          <TextInput label="Email" name="email" formHandler={formHandler} />
        </div>
        <div class="mb-3">
          <Select
            label="Country"
            name="country"
            placeholder="Select a country"
            options={[
              { value: 1, label: 'France' },
              { value: 2, label: 'Spain' },
              { value: 3, label: 'Canada' },
            ]}
            formHandler={formHandler}
          />
        </div>
        <div class="mb-3">
          <Checkboxes
            label="Favorite foods"
            name="favoriteFoods"
            formHandler={formHandler}
            options={[
              { value: 1, label: 'Pizza' },
              { value: 2, label: 'Hamburger' },
              { value: 3, label: 'Spaghetti' },
              { value: 4, label: 'Hot Dog' },
            ]}
          />
        </div>
        <div class="mb-3">
          <Radios
            label="Gender"
            name="gender"
            formHandler={formHandler}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>
        <div class="mb-3">
          <Checkbox
            label="Subscribe to newsletter"
            name="subscribed"
            formHandler={formHandler}
          />
        </div>
        <div class="mb-3 w-100">
          <button class="btn btn-primary me-2 mt-2">Submit</button>
          <button
            class="btn btn-primary me-2 mt-2"
            disabled={formHandler.isFormInvalid()}
          >
            Submit
          </button>
          <button
            class="btn btn-primary me-2 mt-2"
            onClick={fill}
            type="button"
          >
            Fill
          </button>
          <button
            class="btn btn-primary me-2 mt-2"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      <p class="mt-5">
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </>
  );
};
