import { SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';

export type BaseFieldStore = {
  props: {
    value?: any;
    id?: string;
    name?: string;
  };
  helpers: {
    errorMessage: string;
    error: boolean;
    onValueChange: (value: any, options?: SetFieldValueOptions) => void;
    onFieldBlur: (options?: ValidateFieldOptions) => void;
  };
};
