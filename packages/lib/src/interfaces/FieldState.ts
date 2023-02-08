export type FieldState = {
  __state?: true;
  dataType: string;
  errorMessage: string;
  isInvalid: boolean;
  htmlElement?: HTMLElement;
  defaultValue: any;
  initialValue: any;
  cachedValue: any;
  currentValue: any;
  touched: boolean;
  dirty: boolean;
  triggers: string[];
  validating: boolean;
  validationId: string;
};
