const touchField1 = "//@ts-nocheck\n<input\n  name=\"name\"\n  placeholder=\"Write your name\"\n  oninput={({ currentTarget: { name, value } }) =>\n    formHandler.setFieldValue(name, value)\n  }\n  onBlur={({ currentTarget: { name } }) => {\n    formHandler.validateField(name);\n    formHandler.touchField(name); //Marks the field as touched\n  }}\n></input>;\n";

export { touchField1 as default };
