const n=`//@ts-nocheck
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
`;export{n as default};
//# sourceMappingURL=ComponentFieldApi-1aa0d009.js.map
