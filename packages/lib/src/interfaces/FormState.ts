import { FieldState } from '@interfaces';

export type FormState = {
  [x: string]: FieldState & { [x: string]: FormState };
};
