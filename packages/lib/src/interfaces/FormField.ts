export type FormField = {
  errorMessage: string;
  isInvalid: boolean;
  field: HTMLElement;
  initialValue: any;
  value: any;
  touched: boolean;
  dirty: boolean;
};
