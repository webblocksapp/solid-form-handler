export type ValidationSchema<T> = {
  isFieldFromSchema: (path: string) => boolean;
  validateAt: (path: string, data: T, options?: { recursive?: boolean; abortEarly?: boolean }) => Promise<void>;
  buildDefault: (schema?: any, path?: string, object?: T) => any;
  getFieldDataType: (path: string) => string;
};
