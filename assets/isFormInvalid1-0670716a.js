const isFormInvalid1 = "//@ts-nocheck\nconsole.log(formHandler.isFormInvalid()); //true\n\n//Form filled with the expected schema data\nformHandler.fillForm({ name: 'John', age: 28 });\nconsole.log(formHandler.isFormInvalid()); //false\n";

export { isFormInvalid1 as default };
