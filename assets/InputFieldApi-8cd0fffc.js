const InputFieldApi = "//@ts-nocheck\ntype InputFieldProps = CommonFieldProps & {\n  mode: 'input';\n  onInput?: CommonEvent;\n  onInputOptions?: SetFieldValueOptions;\n  render: (field: InputFieldStore) => JSXElement;\n};\n";

export { InputFieldApi as default };
