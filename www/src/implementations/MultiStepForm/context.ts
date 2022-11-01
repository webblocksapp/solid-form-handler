import { FormHandler } from 'solid-form-handler';
import { createContext, useContext } from 'solid-js';
import { Schema } from './types';

export const FormContext = createContext<{
  formHandler: FormHandler<Schema>;
}>({} as any);

export const useFormContext = () => useContext(FormContext);
