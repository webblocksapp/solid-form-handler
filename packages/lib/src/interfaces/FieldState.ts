export type FieldState = {
  errorMessage: string;
  isInvalid: boolean;
  field?: HTMLElement;
  initialValue: any;
  touched: boolean;
  dirty: boolean;
};
