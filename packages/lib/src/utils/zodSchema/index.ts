import { ZodArray, ZodObject, ZodSchema, ZodTypeDef } from 'zod';
import { set, get, ValidationError } from '@utils';
import { ValidationSchema } from '@interfaces';

export const zodSchema = <T>(schema: ZodSchema<T>): ValidationSchema<T> => {
  /**
   * Checks if the field is part of the given yup schema.
   * Fields that are not part of the schema are considered as metadata
   * and doesn't require validation. e.g. id, timestamp, foreignId, etc...
   */
  const isFieldFromSchema = (path: string) => {
    let isFromSchema = true;
    try {
      //TODO add logic for check if the field is part of the zod schema.
    } catch (_) {
      isFromSchema = false;
    }
    return isFromSchema;
  };

  /**
   * Validates a single field of the form.
   */
  const validateAt: ValidationSchema<T>['validateAt'] = async (path, data) => {
    //TODO add logic for validate at.
  };

  /**
   * Builds a default object from a zod schema.
   */
  const buildDefault = (_schema: ZodSchema = schema, path?: string, object?: any): T => {
    let obj = object;
    path = path ? `${path}.` : '';
    const targetPath = path.replace(/\.$/, '');
    const { type, getDefault } = getSchemaDef(_schema);

    if (type === 'ZodArray') {
      const arrSchema = _schema as ZodArray<any>;

      if (getDefault()) {
        set(obj, targetPath, getDefault());
      } else {
        obj = obj ? set(obj, targetPath, []) : [];
        /**
         * When the schema is an array without a default value, it reach the 0 index of the array for getting
         * the inner yup schema (it can be an object, array or a primitive schema).
         */
        const reachedSchema = arrSchema.element;
        obj = buildDefault(reachedSchema, `${path}0`, obj);
      }
    } else if (type === 'ZodObject') {
      const objSchema = _schema as ZodObject<any>;
      const zodSchemas = objSchema.shape; //Gives inner zod schemas for every key of the ZodObject.
      obj = obj ? set(obj, targetPath, {}) : {};
      /**
       * Iterates every schema key to check if it is an ArraySchema or ObjectSchema.
       * If no, the default empty value is assigned to the object.
       */
      Object.keys(zodSchemas).forEach((key) => {
        const reachedSchema = get<ZodObject<any>>(zodSchemas, key);
        obj = buildDefault(reachedSchema, `${path}${key}`, obj);
      });
    } else {
      /**
       * It checks if the target path is an array or no.
       * For example if target path is:
       * key1.key2 -> obj is threated as an object
       * key1.key2.0 -> obj is threated as an array, so is taken
       * prevTargetPath key1.key2 for assigning an empty array.
       */
      const prevTargetPath = targetPath.split('.').slice(0, -1).join('.');
      obj = Array.isArray(get(obj, prevTargetPath))
        ? set(obj, prevTargetPath, getDefault() ?? [])
        : set(obj, targetPath, getDefault() ?? buildDefaultValue(_schema));
    }

    return obj;
  };

  const buildDefaultValue = (schema: ZodSchema) => {
    switch (schema._type) {
      case 'boolean':
        return false;
      default:
        return '';
    }
  };

  const getFieldDataType = (path: string) => {
    /**
     * Array indexes are not needed for reaching the Zod schema.
     * Paths with indexes must be treated as follows:
     *
     * key1.0.key2.1 ==> key1.key2
     * key1.11.key2.22 ==> key1.key2
     */
    path = path.replace(/\.\d+\./g, '.').replace(/\.\d+\$/g, '');
    const reachedSchema = reach(schema, path);
    const { type } = getSchemaDef(reachedSchema);
    return type.replace(/Zod/g, '').toLowerCase();
  };

  /**
   * Returns the Zod schema definition
   */
  const getSchemaDef = (schema: ZodSchema) => {
    const schemaDef = schema._def as ZodTypeDef & { typeName?: string; defaultValue?: () => any };
    return {
      type: schemaDef?.typeName || '',
      getDefault: () => schemaDef?.defaultValue?.(),
    };
  };

  /**
   * For nested schemas, reach will retrieve an inner schema based on the provided path.
   */
  const reach = (schema: ZodSchema, path: string): ZodSchema => {
    let [currentPath, ...rest] = path.split('.');
    let currentSchema = schema;
    const { type } = getSchemaDef(currentSchema);

    if (type === 'ZodArray') {
      const element = (schema as ZodArray<any>).element;
      currentSchema = element?.shape?.[currentPath] || element;
    } else if (type === 'ZodObject') {
      currentSchema = (schema as ZodObject<any>).shape[currentPath];
    }

    if (rest.length === 0) {
      return currentSchema;
    } else {
      return reach(currentSchema, rest.join('.'));
    }
  };

  return {
    isFieldFromSchema,
    validateAt,
    buildDefault,
    getFieldDataType,
  };
};
