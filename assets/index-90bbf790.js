const index = "import { Component, For } from 'solid-js';\nimport { useFormHandler } from 'solid-form-handler';\nimport { yupSchema } from 'solid-form-handler/yup';\nimport { Product } from './types';\nimport { productSchema } from './schema';\nimport { TextInput } from '@components';\n\nexport const ProductsForm: Component = () => {\n  const formHandler = useFormHandler<Product[]>(yupSchema(productSchema));\n  const { formData } = formHandler;\n  const limit = 3;\n\n  const submit = async (event: Event) => {\n    event.preventDefault();\n    try {\n      await formHandler.validateForm();\n      alert('Data sent with success: ' + JSON.stringify(formData()));\n      formHandler.resetForm();\n    } catch (error) {\n      console.error(error);\n    }\n  };\n\n  const fill = () => {\n    formHandler.fillForm([\n      { name: 'Shirt', quantity: 100 },\n      { name: 'Shoes', quantity: 100 },\n    ]);\n  };\n\n  const reset = () => {\n    formHandler.resetForm();\n  };\n\n  return (\n    <>\n      <form autocomplete=\"off\" onSubmit={submit}>\n        <h4 class=\"mb-3\">Using yup schema</h4>\n        <h3>\n          Products inventory {formData().length} of {limit}\n        </h3>\n        <For each={formData()}>\n          {(_, i) => (\n            <fieldset class=\"border m-3\">\n              {formData().length > 1 && (\n                <div class=\"bg-primary p-2 text-white d-flex justify-content-end\">\n                  {i() < formData().length - 1 && (\n                    <i\n                      style=\"cursor: pointer\"\n                      class=\"fa fa-chevron-down\"\n                      aria-hidden=\"true\"\n                      onClick={() => formHandler.moveFieldset(i(), i() + 1)}\n                    ></i>\n                  )}\n                  {i() > 0 && (\n                    <i\n                      style=\"cursor: pointer\"\n                      class=\"fa fa-chevron-up\"\n                      aria-hidden=\"true\"\n                      onClick={() => formHandler.moveFieldset(i(), i() - 1)}\n                    ></i>\n                  )}\n                </div>\n              )}\n              <div class=\"p-2\">\n                <div class=\"mb-3\">\n                  <TextInput\n                    label=\"Name\"\n                    name={`${i()}.name`}\n                    formHandler={formHandler}\n                  />\n                </div>\n                <div class=\"mb-3\">\n                  <TextInput\n                    label=\"Quantity\"\n                    name={`${i()}.quantity`}\n                    type=\"number\"\n                    formHandler={formHandler}\n                  />\n                </div>\n                {formData().length > 1 && (\n                  <button\n                    class=\"btn btn-danger\"\n                    type=\"button\"\n                    onClick={() => formHandler.removeFieldset(i())}\n                  >\n                    Remove\n                  </button>\n                )}\n              </div>\n            </fieldset>\n          )}\n        </For>\n        <div class=\"w-100\">\n          {formData().length < limit && (\n            <button\n              class=\"btn btn-info me-2 text-white\"\n              type=\"button\"\n              onClick={() => formHandler.addFieldset()}\n            >\n              Add product\n            </button>\n          )}\n        </div>\n        <div class=\"my-5 w-100\">\n          <button class=\"btn btn-primary me-2 mt-2\">Submit</button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            disabled={formHandler.isFormInvalid()}\n          >\n            Submit\n          </button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            onClick={fill}\n            type=\"button\"\n          >\n            Fill\n          </button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            onClick={reset}\n            type=\"button\"\n          >\n            Reset\n          </button>\n        </div>\n      </form>\n      <p class=\"mt-5\">\n        <b>Form data:</b>\n      </p>\n      <pre class=\"mt-3 border bg-light p-3\">\n        <code>{JSON.stringify(formData(), null, 2)}</code>\n      </pre>\n    </>\n  );\n};\n";

export { index as default };
