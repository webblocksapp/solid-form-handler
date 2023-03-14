//@ts-nocheck
type CheckboxFieldProps = CommonFieldProps & {
  mode: 'checkbox';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  checked?: boolean;
  uncheckedValue?: any;
  render: (field: CheckboxFieldStore) => JSXElement;
};
