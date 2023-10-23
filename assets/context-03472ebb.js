const o=`import { FormHandler } from 'solid-form-handler';
import { createContext, useContext } from 'solid-js';
import { Schema } from './types';

export const FormContext = createContext(
  {} as {
    formHandler: FormHandler<Schema>;
  }
);

export const useFormContext = () => useContext(FormContext);
`;export{o as default};
