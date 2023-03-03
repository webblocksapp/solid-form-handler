import { CHILDREN_KEY, STATE_KEY } from '@constants';
import { FieldState } from '@interfaces';

export type FormState = {
  [x: string]: {
    [STATE_KEY]: FieldState;
    [CHILDREN_KEY]: FormState | Array<FormState>;
  };
};
