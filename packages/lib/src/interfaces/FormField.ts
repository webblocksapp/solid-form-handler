export type FormField = {
  errorMessage: string;
  isInvalid: boolean;
  field: Object;
  initialValue: any;
  value: any;
  touched: boolean;
  dirty: boolean;
};
