const fillForm1 = "//@ts-nocheck\nconst formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));\nformHandler.fillForm({ name: 'John', age: 28 });\nconsole.log(formHandler.formData());\n/**\n * -- Output: --\n * {name: 'John', age: 28}\n */\n";

export { fillForm1 as default };
