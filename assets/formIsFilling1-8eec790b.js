const formIsFilling1 = "//@ts-nocheck\nformHandler.fillForm({ name: 'John', age: 28 });\n\ncreateEffect(() => {\n  console.log(formHandler.formIsFilling());\n});\n";

export { formIsFilling1 as default };
