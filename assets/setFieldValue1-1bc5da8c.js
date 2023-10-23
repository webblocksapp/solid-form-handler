const setFieldValue1 = "//@ts-nocheck\n<input\n  name=\"name\"\n  placeholder=\"Write your name\"\n  onInput={({ currentTarget: { name, value } }) =>\n    formHandler.setFieldValue(name, value)\n  }\n></input>;\n";

export { setFieldValue1 as default };
