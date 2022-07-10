import { FieldState } from '@interfaces';

export type FormState = {
  [x: string]: {
    state: FieldState;
  } & { [x: string]: FormState };
};
