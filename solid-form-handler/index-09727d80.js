const n=`import { Component, createEffect } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import { TextInput } from '@components';
import { schema } from './schema';
import { createStore } from 'solid-js/store';

export const Form: Component = () => {
  const formHandler = useFormHandler(yupSchema(schema), {
    delay: 300,
  });
  const { formData } = formHandler;
  const [store, setStore] = createStore({ name: 0, email: 0 });

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
      { name: 'John', email: 'test@mail.com' },
      { silentValidation: false }
    );
  };

  createEffect(() => {
    formHandler.isFieldValidating('name') &&
      setStore((prev) => ({ ...prev, name: prev.name + 1 }));
  });

  createEffect(() => {
    formHandler.isFieldValidating('email') &&
      setStore((prev) => ({ ...prev, email: prev.email + 1 }));
  });

  return (
    <>
      <form onSubmit={submit}>
        <h4 class="mb-3">Using yup schema</h4>
        <div class="row gy-3">
          <div class="col-sm-12 col-md-6">
            <TextInput label="Name" name="name" formHandler={formHandler} />
          </div>
          <div class="col-sm-12 col-md-6">
            <TextInput label="Email" name="email" formHandler={formHandler} />
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
        <p class="mt-5">
          <b>Form data:</b>
        </p>
        <pre class="mt-3 border bg-light p-3">
          <code>{JSON.stringify(formData(), null, 2)}</code>
        </pre>
        <p class="mt-5">
          <b>Times validated:</b>
        </p>
        <pre class="mt-3 border bg-light p-3">
          <code>{JSON.stringify(store, null, 2)}</code>
        </pre>
      </form>
    </>
  );
};
`;export{n as default};
//# sourceMappingURL=index-09727d80.js.map
