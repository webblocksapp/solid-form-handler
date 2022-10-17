import { FormFieldError } from '@interfaces';

export class FormErrorsException {
  validationResult: FormFieldError[];

  constructor(errors: FormFieldError[]) {
    this.validationResult = errors;
  }
}
