export class ValidationResult {
  path: string;
  errorMessage: string;

  constructor(path: string, errorMessage: string) {
    this.path = path;
    this.errorMessage = errorMessage;
  }
}
