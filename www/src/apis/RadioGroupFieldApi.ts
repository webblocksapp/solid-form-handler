//@ts-nocheck
type RadioGroupFieldProps = CommonFieldProps & {
  mode: 'radio-group';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: RadioGroupFieldStore) => JSXElement;
};
