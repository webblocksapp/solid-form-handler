import { FormHandler } from '@interfaces';

export interface BaseFieldProps {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  name?: string;
  triggers?: string[];
  value?: any;
}
