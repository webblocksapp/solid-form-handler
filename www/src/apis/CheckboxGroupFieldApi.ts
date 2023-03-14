//@ts-nocheck
type CheckboxGroupFieldProps = CommonFieldProps & {
  mode: 'checkbox-group';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: CheckboxGroupFieldStore) => JSXElement;
};
