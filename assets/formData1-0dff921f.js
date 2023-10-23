const formData1 = "//@ts-nocheck\nconst formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));\nconst { formData } = formHandler;\n\nconsole.log(formData().name); //''\nconsole.log(formData().age); //''\nconsole.log(formData());\n/**\n * -- Output: --\n * {name: '', age: ''}\n */\n\nformHandler.fillForm({ name: 'John', age: 28 });\nconsole.log(formData().name); //John\nconsole.log(formData().age); //28\nconsole.log(formData());\n/**\n * -- Output: --\n * {name: 'John', age: 28}\n */\n";

export { formData1 as default };
