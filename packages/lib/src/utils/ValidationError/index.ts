export class ValidationError extends Error {
  path: string;

  constructor(path: string, message: string) {
    super(message);
    this.path = path;
    this.message = message;
    this.name = 'ValidationError';
  }
}
