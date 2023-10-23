const formIsResetting1 = "//@ts-nocheck\nformHandler.resetForm();\n\ncreateEffect(() => {\n  console.log(formHandler.formIsResetting());\n});\n";

export { formIsResetting1 as default };
