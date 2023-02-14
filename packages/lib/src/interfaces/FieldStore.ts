import { CommonEvent, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';

export type FieldStore = {
  props: {
    value?: any;
    id?: string;
    name?: string;
    onBlur?: CommonEvent;
    onChange?: CommonEvent;
    onInput?: CommonEvent;
    checked?: boolean;
  };
  helpers: {
    errorMessage: string;
    error: boolean;
    onValueChange: (value: any, options?: SetFieldValueOptions) => void;
    onFieldBlur: (options?: ValidateFieldOptions) => void;
  };
};
