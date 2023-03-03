import { ErrorMap } from '@interfaces';

export class FormErrorsException {
  validationResult: ErrorMap;

  constructor(errors: ErrorMap) {
    this.validationResult = errors;
  }
}
