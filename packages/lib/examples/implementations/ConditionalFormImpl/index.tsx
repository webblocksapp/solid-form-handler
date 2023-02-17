import { Checkbox, TextInput } from '@components';
import { useFormHandler } from '@hooks';
import { ValidationSchema } from '@interfaces';
import { Component, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

export const ConditionalFormImpl: Component<{ schema: ValidationSchema<any> }> = (props) => {
  const formHandler = useFormHandler(props.schema);
  const [store, setStore] = createStore({ isAdult: 0, email: 0 });
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formData()));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  createEffect(() => {
    formHandler.isFieldValidating('isAdult') && setStore((prev) => ({ ...prev, isAdult: prev.isAdult + 1 }));
  });

  createEffect(() => {
    formHandler.isFieldValidating('email') && setStore((prev) => ({ ...prev, email: prev.email + 1 }));
  });

  return (
    <form onSubmit={submit}>
      <Checkbox triggers={['email']} label="isAdult" name="isAdult" checked={false} formHandler={formHandler} />
      <Show when={formData().isAdult}>
        <TextInput label="Email" name="email" formHandler={formHandler} />
      </Show>

      <button disabled={formHandler.isFormInvalid()}>Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
      {/* <pre>
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre> */}
      <p class="mt-5">
        <b>Times validated:</b>
      </p>
      <pre>
        <code>{JSON.stringify(store, null, 2)}</code>
      </pre>
    </form>
  );
};
