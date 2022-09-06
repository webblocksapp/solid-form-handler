import { useFormHandler } from '@hooks';

export type FormHandler<T = any> = Omit<ReturnType<typeof useFormHandler>, 'fillForm' | 'formData'> & {
  fillForm: (data: T) => Promise<void>;
  formData: () => T;
};
