import { ValidationResult } from '@interfaces';

export class FormErrorsException {
  validationResult: ValidationResult[];

  constructor(errors: ValidationResult[]) {
    this.validationResult = errors;
  }
}
