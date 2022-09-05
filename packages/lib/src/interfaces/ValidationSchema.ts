import { SchemaOf } from 'yup';

export type ValidationSchema<T> = {
  isFieldFromSchema: (path: string) => boolean;
  validateAt: (path: string, data: T) => Promise<void>;
  buildDefault: (schema?: SchemaOf<T>, path?: string, object?: T) => any;
};
