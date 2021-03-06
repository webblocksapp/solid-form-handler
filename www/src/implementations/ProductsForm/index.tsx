import { Component, createSignal, For } from 'solid-js';
import { useFormHandler, FormErrorsException } from 'solid-form-handler';
import * as yup from 'yup';

/**
 * Entity type definition
 */
type Product = {
  name: string;
  quantity: number;
};

/**
 * Schema definition through entity
 */
const productSchema: yup.SchemaOf<Product[]> = yup.array(
  yup.object({
    name: yup.string().required('Required field'),
    quantity: yup
      .number()
      .required('Quantity is required')
      .typeError('Write a valid quantity'),
  })
);

export const ProductsForm: Component = () => {
  const formHandler = useFormHandler<Product[]>(productSchema);
  const [error, setError] = createSignal<string>('');
  const { formData } = formHandler;
  const limit = 3;

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      setError('');
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(JSON.stringify(error, null, 2));
      }
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
            <fieldset class="border p-2 m-3">
              <legend>Product {i() + 1}</legend>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  class="form-control"
                  classList={{
                    'is-invalid': formHandler.fieldHasError(`${i()}.name`),
                  }}
                  name={`${i()}.name`}
                  value={formHandler.getFieldValue(`${i()}.name`)}
                  onInput={({ currentTarget: { name, value } }) =>
                    formHandler.setFieldValue(name, value)
                  }
                  onBlur={({ currentTarget: { name, value } }) =>
                    formHandler.setFieldValue(name, value)
                  }
                />
                {formHandler.fieldHasError(`${i()}.name`) && (
                  <div class="invalid-feedback">
                    {formHandler.getFieldError(`${i()}.name`)}
                  </div>
                )}
              </div>
              <div class="mb-3">
                <label class="form-label">Quantity</label>
                <input
                  class="form-control"
                  classList={{
                    'is-invalid': formHandler.fieldHasError(`${i()}.quantity`),
                  }}
                  type="number"
                  name={`${i()}.quantity`}
                  value={formHandler.getFieldValue(`${i()}.quantity`)}
                  onInput={({ currentTarget: { name, value } }) =>
                    formHandler.setFieldValue(name, value)
                  }
                  onBlur={({ currentTarget: { name, value } }) =>
                    formHandler.setFieldValue(name, value)
                  }
                />
                {formHandler.fieldHasError(`${i()}.quantity`) && (
                  <div class="invalid-feedback">
                    {formHandler.getFieldError(`${i()}.quantity`)}
                  </div>
                )}
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
      {error() && (
        <>
          <p class="mt-5">
            <b>Errors on submit:</b>
          </p>
          <pre class="mt-3 border bg-light p-3">
            <code class="text-danger">{error()}</code>
          </pre>
        </>
      )}
    </>
  );
};
