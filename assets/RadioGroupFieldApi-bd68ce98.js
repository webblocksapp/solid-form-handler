const RadioGroupFieldApi = "//@ts-nocheck\ntype RadioGroupFieldProps = CommonFieldProps & {\n  mode: 'radio-group';\n  onChange?: CommonEvent;\n  onChangeOptions?: SetFieldValueOptions;\n  render: (field: RadioGroupFieldStore) => JSXElement;\n};\n";

export { RadioGroupFieldApi as default };
