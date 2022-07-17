export type FieldState = {
  __state: true;
  errorMessage: string;
  isInvalid: boolean;
  htmlElement?: HTMLElement;
  initialValue: any;
  touched: boolean;
  dirty: boolean;
};
