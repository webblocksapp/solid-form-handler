const e=`//@ts-nocheck
import { useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';
import { Checkbox, Checkboxes, Radios, Select, TextInput } from '@components';
import { z } from 'z';

export const userSchema = z.object({
  name: z.string().min(1, 'Required field'),
  email: z.string().email(),
  country: z.coerce.number().min(1, 'Required field'),
  favoriteFoods: z.array(z.number()).min(2),
  gender: z
    .string()
    .refine((value) =>
      ['male', 'female', 'other'].some((item) => item === value)
    ),
  subscribed: z.boolean(),
});

export const App: Component = () => {
  const formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));
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
      <Checkbox
        label="Subscribe to newsletter"
        name="subscribed"
        formHandler={formHandler}
      />
      <button disabled={formHandler.isFormInvalid()}>Submit</button>
    </form>
  );
};
`;export{e as default};
