import { ErrorMap } from '@interfaces';

export class ValidationError extends Error {
  path: string;
  children: ErrorMap = [];

  constructor(path: string, message: string, children: ErrorMap) {
    super(message);
    this.path = path;
    this.message = message;
    this.children = children;
    this.name = 'ValidationError';
  }
}
