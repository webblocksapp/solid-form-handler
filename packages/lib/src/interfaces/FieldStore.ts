import { CommonEvent, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';

export type FieldStore = {
  props: {
    value?: any;
    id?: string;
    name?: string;
    onInput?: CommonEvent;
    onBlur?: CommonEvent;
  };
  helpers: {
    errorMessage: string;
    error: boolean;
    onValueChange: (value: any, options?: SetFieldValueOptions) => void;
    onFieldBlur: (options?: ValidateFieldOptions) => void;
  };
};
