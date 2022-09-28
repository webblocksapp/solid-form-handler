# solidjs-form-handler

## Documentation

**[Documentation is available here.](https://solid-form-handler.com)**

## Overview

**solidjs-form-handler** is a lightweight library for building form components and validating forms with them. Under the hood, it works with the built-in granular reactivity of [SolidJS stores](https://www.solidjs.com/docs/latest/api#stores).

It uses as a third-party library the yup object schema for data assertion however other validators will be supported in the future.

As a big difference from other form validation libraries, it won't provide built-in components like **\<Form \/>**, or magic methods/utilities that append the reactivity and error reporting at form field components, because integrating with third-party UI libraries can become tricky or simply doesn't work.

## Advantages of using solidjs-form-handler:

- Gives full control of your form components definition.
- Integrated with yup to ease form schema definition - Other validators will be supported in the future.
- Full reactivity during form input, validation, and submission.
- Simple manipulation of fieldsets (array of fields or dynamic forms).
- Simple validation of complex data structures.
  Very intuitive APIs.
- Can be used on any SolidJS UI library or CSS framework.

## Quick start:

You can start by creating your own form field [components](https://solid-form-handler.com/docs/components) by using each of the components code given on the docs website. The following is a final implementation of them:

```tsx
import * as yup from 'yup';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { Checkbox, Checkboxes, Radios, Select, TextInput } from '@components';

type User = {
  name: string;
  email: string;
  country: number;
  favoriteFoods: number[];
  gender: 'male' | 'female' | 'other';
  subscribed: boolean;
};

export const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid email').required('Required field'),
  country: yup.number().required().required('Required field').typeError('Country is required'),
  favoriteFoods: yup.array(yup.number().required('Required field')).min(2),
  gender: yup.mixed().oneOf(['male', 'female', 'other'], 'Invalid value').required('Required field'),
  subscribed: yup.boolean().required('Required field'),
});

export const App: Component = () => {
  const formHandler = useFormHandler(yupSchema(userSchema));

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

  return (
    <form onSubmit={submit}>
      <TextInput label="Name" name="name" formHandler={formHandler} />
      <TextInput label="Email" name="email" formHandler={formHandler} />
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
      <Checkbox label="Subscribe to newsletter" name="subscribed" formHandler={formHandler} />
      <button disabled={formHandler.isFormInvalid()}>Submit</button>
    </form>
  );
};
```
