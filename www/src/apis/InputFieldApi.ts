//@ts-nocheck
type InputFieldProps = CommonFieldProps & {
  mode: 'input';
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
  render: (field: InputFieldStore) => JSXElement;
};
