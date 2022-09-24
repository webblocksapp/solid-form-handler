export type FieldState = {
  __state: true;
  errorMessage: string;
  isInvalid: boolean;
  htmlElement?: HTMLElement;
  defaultValue: any;
  initialValue: any;
  touched: boolean;
  dirty: boolean;
};
