import { Checkbox, TextInput } from '@components';
import { useFormHandler, zodSchema } from 'solid-form-handler';
import { Component, createEffect, Match, Show, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import { schema } from './schema';

export const Form: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;
  const [store, setStore] = createStore({ isAdult: 0, email: 0 });

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = async () => {
    await formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm(
      { email: '', isAdult: true },
      { silentValidation: false }
    );
  };

  createEffect(() => {
    formHandler.isFieldValidating('isAdult') &&
      setStore((prev) => ({ ...prev, isAdult: prev.isAdult + 1 }));
  });

  createEffect(() => {
    formHandler.isFieldValidating('email') &&
      setStore((prev) => ({ ...prev, email: prev.email + 1 }));
  });

  return (
    <form onSubmit={submit}>
      <h4 class="mb-3">Using zod schema</h4>
      <div class="row gy-3">
        <div class="col-sm-12">
          <Checkbox
            label="Is Adult"
            name="isAdult"
            checked={false}
            formHandler={formHandler}
            triggers={['email']}
          />
        </div>
        <Show when={formData().isAdult}>
          <div class="col-sm-12">
            <TextInput label="Email" name="email" formHandler={formHandler} />
          </div>
        </Show>
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
      <div>
        <Switch>
          <Match when={!formHandler.isFormInvalid()}>
            <span class="text-success">Form is valid</span>
          </Match>
          <Match when={formHandler.isFormInvalid()}>
            <span class="text-danger">Form is invalid</span>
          </Match>
        </Switch>
      </div>
      <p class="mt-5">
        <b>Form data:</b>
      </p>
      <pre class="border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
      <p class="mt-5">
        <b>Times validated:</b>
      </p>
      <pre class="border bg-light p-3">
        <code>{JSON.stringify(store, null, 2)}</code>
      </pre>
    </form>
  );
};
