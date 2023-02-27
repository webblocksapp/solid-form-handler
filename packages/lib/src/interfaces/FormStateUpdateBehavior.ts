import { ValidateFieldBehavior } from '@interfaces';

export type FormStateUpdateBehavior = {
  updateParent?: boolean;
  updateChild?: boolean;
  validateFieldBehavior?: ValidateFieldBehavior;
};
