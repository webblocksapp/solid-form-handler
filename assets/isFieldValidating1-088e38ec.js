const isFieldValidating1 = "//@ts-nocheck\nformHandler.validateForm();\n\ncreateEffect(() => {\n  console.log(\n    formHandler.isFieldValidating('name'),\n    formHandler.isFieldValidating('age')\n  );\n});\n";

export { isFieldValidating1 as default };
