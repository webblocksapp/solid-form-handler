const ValidatingTextInput1 = "//@ts-nocheck\nimport { Field, useFormHandler } from 'solid-form-handler';\nimport { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';\n\n// ...\n\nconst formHandler = useFormHandler(__VALIDATOR__Schema(schema));\n\n// ...\n<Field\n  mode=\"input\"\n  name=\"email\"\n  formHandler={formHandler}\n  render={(field) => (\n    <>\n      <label class=\"form-label\" for={field.props.id}>\n        Email\n      </label>\n      <input\n        {...field.props}\n        class=\"form-control\"\n        classList={{ 'is-invalid': field.helpers.error }}\n      />\n      <Show when={field.helpers.error}>\n        <div class=\"invalid-feedback\">{field.helpers.errorMessage}</div>\n      </Show>\n    </>\n  )}\n/>;\n";

export { ValidatingTextInput1 as default };
