export type FieldState = {
  __state?: true;
  __cache?: {
    mounted?: Omit<FieldState, '__cache'>;
    unmounted?: Omit<FieldState, '__cache'>;
  };
  dataType: string;
  errorMessage: string;
  isInvalid: boolean;
  htmlElement?: HTMLElement;
  defaultValue: any;
  initialValue: any;
  touched: boolean;
  dirty: boolean;
};
