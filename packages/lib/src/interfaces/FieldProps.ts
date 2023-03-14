import { FormHandler } from '@interfaces';

export type FieldProps = {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  name?: string;
  triggers?: string[];
  value?: any;
};
