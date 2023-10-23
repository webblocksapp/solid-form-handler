const resetForm1 = "//@ts-nocheck\nformHandler.fillForm({ name: 'John', age: 28 });\nconsole.log(formHandler.formData());\n/**\n * -- Output: --\n * {name: 'John', age: 28}\n */\n\nformHandler.resetForm();\nconsole.log(formHandler.formData());\n/**\n * -- Output: --\n * {name: '', age: ''}\n */\n";

export { resetForm1 as default };
