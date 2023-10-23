const CheckboxGroupFieldApi = "//@ts-nocheck\ntype CheckboxGroupFieldProps = CommonFieldProps & {\n  mode: 'checkbox-group';\n  onChange?: CommonEvent;\n  onChangeOptions?: SetFieldValueOptions;\n  render: (field: CheckboxGroupFieldStore) => JSXElement;\n};\n";

export { CheckboxGroupFieldApi as default };
