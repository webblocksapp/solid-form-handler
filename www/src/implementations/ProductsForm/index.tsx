import { Component, For } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { Product } from './types';
import { productSchema } from './schema';
import { TextInput } from '@components';

export const ProductsForm: Component = () => {
  const formHandler = useFormHandler<Product[]>(yupSchema(productSchema));
  const { formData } = formHandler;
  const limit = 3;

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
    formHandler.fillForm([
      { name: 'Shirt', quantity: 100 },
      { name: 'Shoes', quantity: 100 },
    ]);
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <>
      <form autocomplete="off" onSubmit={submit}>
        <h3>
          Products inventory {formData().length} of {limit}
        </h3>
        <For each={formData()}>
          {(_, i) => (
            <fieldset class="border m-3">
              {formData().length > 1 && (
                <div class="bg-primary p-2 text-white d-flex justify-content-end">
                  {i() < formData().length - 1 && (
                    <i
                      style="cursor: pointer"
                      class="fa fa-chevron-down"
                      aria-hidden="true"
                      onClick={() => formHandler.moveFieldset(i(), i() + 1)}
                    ></i>
                  )}
                  {i() > 0 && (
                    <i
                      style="cursor: pointer"
                      class="fa fa-chevron-up"
                      aria-hidden="true"
                      onClick={() => formHandler.moveFieldset(i(), i() - 1)}
                    ></i>
                  )}
                </div>
              )}
              <div class="p-2">
                <div class="mb-3">
                  <TextInput
                    label="Name"
                    name={`${i()}.name`}
                    formHandler={formHandler}
                  />
                </div>
                <div class="mb-3">
                  <TextInput
                    label="Quantity"
                    name={`${i()}.quantity`}
                    type="number"
                    formHandler={formHandler}
                  />
                </div>
                {formData().length > 1 && (
                  <button
                    class="btn btn-danger"
                    type="button"
                    onClick={() => formHandler.removeFieldset(i())}
                  >
                    Remove
                  </button>
                )}
              </div>
            </fieldset>
          )}
        </For>
        <div class="w-100">
          {formData().length < limit && (
            <button
              class="btn btn-info me-2 text-white"
              type="button"
              onClick={() => formHandler.addFieldset()}
            >
              Add product
            </button>
          )}
        </div>
        <div class="my-5 w-100">
          <button class="btn btn-primary me-2">Submit</button>
          <button
            class="btn btn-primary me-2"
            disabled={formHandler.isFormInvalid()}
          >
            Submit
          </button>
          <button class="btn btn-primary me-2" onClick={fill} type="button">
            Fill
          </button>
          <button class="btn btn-primary me-2" onClick={reset} type="button">
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
