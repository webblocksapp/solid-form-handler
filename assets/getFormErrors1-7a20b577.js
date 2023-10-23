const getFormErrors1 = "//@ts-nocheck\nawait formHandler.validateForm();\nconsole.log(formHandler.getFormErrors());\n/**\n * -- Output: --\n * [\n *   { path: 'name', errorMessage: 'name is required' },\n *   { path: 'age', errorMessage: 'age is required' }\n * ]\n */\n";

export { getFormErrors1 as default };
