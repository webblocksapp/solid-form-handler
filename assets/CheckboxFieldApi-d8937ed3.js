const CheckboxFieldApi = "//@ts-nocheck\ntype CheckboxFieldProps = CommonFieldProps & {\n  mode: 'checkbox';\n  onChange?: CommonEvent;\n  onChangeOptions?: SetFieldValueOptions;\n  checked?: boolean;\n  uncheckedValue?: any;\n  render: (field: CheckboxFieldStore) => JSXElement;\n};\n";

export { CheckboxFieldApi as default };
