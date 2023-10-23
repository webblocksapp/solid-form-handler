const index = "import { Component, createEffect } from 'solid-js';\nimport { useFormHandler } from 'solid-form-handler';\nimport { yupSchema } from 'solid-form-handler/yup';\nimport { TextInput } from '@components';\nimport { schema } from './schema';\nimport { createStore } from 'solid-js/store';\n\nexport const Form: Component = () => {\n  const formHandler = useFormHandler(yupSchema(schema), {\n    delay: 300,\n  });\n  const { formData } = formHandler;\n  const [store, setStore] = createStore({ name: 0, email: 0 });\n\n  const submit = async (event: Event) => {\n    event.preventDefault();\n    try {\n      await formHandler.validateForm();\n      alert(JSON.stringify(formData()));\n      formHandler.resetForm();\n    } catch (error) {\n      console.error(error);\n    }\n  };\n\n  const reset = async () => {\n    await formHandler.resetForm();\n  };\n\n  const fill = () => {\n    formHandler.fillForm(\n      { name: 'John', email: 'test@mail.com' },\n      { silentValidation: false }\n    );\n  };\n\n  createEffect(() => {\n    formHandler.isFieldValidating('name') &&\n      setStore((prev) => ({ ...prev, name: prev.name + 1 }));\n  });\n\n  createEffect(() => {\n    formHandler.isFieldValidating('email') &&\n      setStore((prev) => ({ ...prev, email: prev.email + 1 }));\n  });\n\n  return (\n    <>\n      <form onSubmit={submit}>\n        <h4 class=\"mb-3\">Using yup schema</h4>\n        <div class=\"row gy-3\">\n          <div class=\"col-sm-12 col-md-6\">\n            <TextInput label=\"Name\" name=\"name\" formHandler={formHandler} />\n          </div>\n          <div class=\"col-sm-12 col-md-6\">\n            <TextInput label=\"Email\" name=\"email\" formHandler={formHandler} />\n          </div>\n        </div>\n        <div class=\"mb-3 w-100\">\n          <button class=\"btn btn-primary me-2 mt-2\">Submit</button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            disabled={formHandler.isFormInvalid()}\n          >\n            Submit\n          </button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            onClick={fill}\n            type=\"button\"\n          >\n            Fill\n          </button>\n          <button\n            class=\"btn btn-primary me-2 mt-2\"\n            onClick={reset}\n            type=\"button\"\n          >\n            Reset\n          </button>\n        </div>\n        <p class=\"mt-5\">\n          <b>Form data:</b>\n        </p>\n        <pre class=\"mt-3 border bg-light p-3\">\n          <code>{JSON.stringify(formData(), null, 2)}</code>\n        </pre>\n        <p class=\"mt-5\">\n          <b>Times validated:</b>\n        </p>\n        <pre class=\"mt-3 border bg-light p-3\">\n          <code>{JSON.stringify(store, null, 2)}</code>\n        </pre>\n      </form>\n    </>\n  );\n};\n";

export { index as default };
