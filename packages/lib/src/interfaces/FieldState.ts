export type FieldState = {
  dataType: string;
  errorMessage: string;
  isInvalid: boolean;
  htmlElement?: HTMLElement;
  defaultValue: any;
  initialValue: any;
  currentValue: any;
  touched: boolean;
  dirty: boolean;
  triggers: string[];
  validating: boolean;
  validationId: string;
};
