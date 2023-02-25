import { FieldState } from '@interfaces';

export type FormState = {
  [x: string]: {
    state: FieldState;
    children: FormState | Array<FormState>;
  };
};
