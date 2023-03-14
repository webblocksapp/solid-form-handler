//@ts-nocheck
function Field(props: FieldComponentProps): JSXElement;

type FieldComponentProps = CommonFieldProps &
  (
    | InputFieldProps
    | CheckboxFieldProps
    | CheckboxGroupFieldProps
    | RadioGroupFieldProps
  );

interface CommonFieldProps extends FieldProps {
  onBlur?: CommonEvent;
  onBlurOptions?: ValidateFieldOptions;
}

type FieldProps = {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  name?: string;
  triggers?: string[];
  value?: any;
};
