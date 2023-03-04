import { ValidateOptions } from '@interfaces';

export type ValidateFieldOptions = ValidateOptions & {
  force?: boolean;
  delay?: number;
  validateOn?: string[];
  omitTriggers?: boolean;
};
