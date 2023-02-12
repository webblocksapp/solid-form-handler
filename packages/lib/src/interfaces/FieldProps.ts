import { FormHandler } from '@interfaces';

export interface FieldProps {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  name?: string;
  triggers?: string[];
  value?: any;
}
