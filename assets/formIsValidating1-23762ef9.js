const formIsValidating1 = "//@ts-nocheck\nformHandler.validateForm();\n\ncreateEffect(() => {\n  console.log(formHandler.formIsValidating());\n});\n";

export { formIsValidating1 as default };
