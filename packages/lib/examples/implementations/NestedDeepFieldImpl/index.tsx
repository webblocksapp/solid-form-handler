import { useFormHandler } from '@hooks';
import { zodSchema } from '@adapters';
import { Component, For, Show } from 'solid-js';
import { z } from 'zod';
import { TextInput } from '@example-components';

const schema = z.object({
  contacts: z
    .array(
      z.object({
        name: z.object({
          first: z.string().min(2, 'Minimum 2 characters'),
          last: z.string().min(2, 'Minimum 2 characters'),
        }),
        email: z.string().email('Incorrect contact email'),
        phone: z.string().min(5, 'Minimum 5 characters').optional().or(z.literal('')),
        password: z.string().min(8, 'Minimum 8 characters').optional().or(z.literal('')),
        createUser: z.boolean().default(false),
      })
    )
    .min(1, 'There must be at least one (1) contact person for a client'),
});

export const NestedDeepFieldImpl: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formData())}`);
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h3 class="h2">Contacts</h3>
      <section>
        <ul>
          <For each={formHandler.formData().contacts}>
            {(contact, index) => (
              <li>
                <div class="col-span-2 flex w-full items-center justify-end gap-x-2">
                  {formHandler.formData().contacts.length > 1 && (
                    <div class="text-sm text-gray-400"># {index() + 1}</div>
                  )}
                  {index() > 0 && (
                    <button onClick={() => formHandler.removeFieldset(index(), 'contacts')}>Remove contact</button>
                  )}
                </div>
                <TextInput
                  label="First Name"
                  formHandler={formHandler}
                  autocomplete="off"
                  name={`contacts.${index()}.name.first`}
                />
                <TextInput
                  label="Last Name"
                  formHandler={formHandler}
                  autocomplete="off"
                  name={`contacts.${index()}.name.last`}
                />
                <TextInput
                  label="Email"
                  formHandler={formHandler}
                  autocomplete="off"
                  name={`contacts.${index()}.email`}
                />
                <TextInput
                  label="Phone"
                  formHandler={formHandler}
                  autocomplete="off"
                  name={`contacts.${index()}.phone`}
                />
                <Show when={contact.createUser}>
                  <TextInput
                    label="Password"
                    formHandler={formHandler}
                    autocomplete="off"
                    name={`contacts.${index()}.password`}
                  />
                </Show>
              </li>
            )}
          </For>
        </ul>
        <button type="button" onClick={() => formHandler.addFieldset({ basePath: 'contacts' })}>
          Add contact
        </button>
      </section>
    </form>
  );
};
