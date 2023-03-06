import { ROOT_KEY } from '@constants';
import { ErrorMap, ValidationSchema } from '@interfaces';
import { set, get, ValidationError } from '@utils';
import { ZodArray, ZodEffects, ZodError, ZodIssue, ZodObject, ZodSchema, ZodTypeDef } from 'zod';

export const zodSchema = <T>(schema: ZodSchema<T>): ValidationSchema<T> => {
  /**
   * Checks if the field is part of the given yup schema.
   * Fields that are not part of the schema are considered as metadata
   * and doesn't require validation. e.g. id, timestamp, foreignId, etc...
   */
  const isFieldFromSchema = (path: string) => {
    const { schema: reachedSchema } = reach(schema, path);
    return reachedSchema ? true : false;
  };

  /**
   * Validates a single field of the form.
   */
  const validateAt: ValidationSchema<T>['validateAt'] = async (path, data) => {
    /**
     * If ROOT_KEY is given, the whole data is validated.
     */
    if (path === ROOT_KEY) {
      try {
        await schema.parseAsync(data);
      } catch (error) {
        if (error instanceof ZodError) {
          const children = buildErrorMap(error.errors);
          throw new ValidationError(path, 'Data is invalid', children);
        }
      }

      return;
    }

    /**
     * A portion of the schema is reached to avoid re-validating the whole schema. If it
     * contains a superRefine, it will get the closest parent effect for doing
     * dependant validations.
     */
    let { schema: reachedSchema, store } = reach(schema, path);

    //Effects is a special zod schema which is generated when superRefine fn is used.
    if (store.effects) {
      reachedSchema = store.effects;
      const arrPath = path.split('.');
      const lastKey = arrPath.pop() || '';
      let value: any;

      /**
       * If the path is nested and contains a superRefine, prev path is used for
       * getting the data to validate.
       *
       * e.g.
       *
       * key1.key2.keyToValidate --> key1.key2
       * store.effects is located at key1.key2
       * so it needs the data from prev path.
       */
      if (arrPath.length > 1) {
        const prevPath = arrPath.join('.');
        value = get(data, prevPath);
      }

      //No nested path is provided
      if (arrPath.length <= 1) {
        value = data;
      }

      try {
        await reachedSchema.parseAsync(value);
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessage = error.errors.find((item) => item.path.includes(lastKey))?.message || '';
          throw new ValidationError(path, errorMessage);
        } else {
          console.error(error);
        }
      }
    }

    //When no superRefine is used code block
    if (store.effects === undefined) {
      const value = get(data, path);

      try {
        await reachedSchema.parseAsync(value);
      } catch (error) {
        if (error instanceof ZodError) {
          const {
            formErrors: [message],
          } = error.flatten();
          throw new ValidationError(path, message);
        } else {
          console.error(error);
        }
      }
    }
  };

  /**
   * Returns an array with the field path and error message.
   */
  const buildErrorMap = (error: ZodError['errors'], errorMap: ErrorMap = []) => {
    error?.forEach((error) => {
      errorMap.push({ path: error.path.join('.'), message: error.message });
    });
    return errorMap;
  };

  /**
   * Builds a default object from a zod schema.
   */
  const buildDefault = (_schema: ZodSchema = schema, path?: string, object?: any): T => {
    let obj = object;
    path = path ? `${path}.` : '';
    const targetPath = path.replace(/\.$/, '');
    const { type, getDefault } = getSchemaDef(_schema);

    if (type === 'effects') {
      obj = buildDefault((_schema as ZodEffects<any>)._def.schema, targetPath, obj);
    } else if (type === 'array') {
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
    } else if (type === 'object') {
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
    const { type } = getSchemaDef(schema);

    switch (type) {
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
    const { schema: reachedSchema } = reach(schema, path);
    const { type } = getSchemaDef(reachedSchema);
    return type.replace(/Zod/g, '').toLowerCase();
  };

  /**
   * Returns the Zod schema definition
   */
  const getSchemaDef = (schema: ZodSchema) => {
    const schemaDef = schema?._def as ZodTypeDef & { typeName?: string; defaultValue?: () => any };
    //Parses ZodObject, ZodArray, ... into object, array, ...
    const type = (schemaDef?.typeName || '').replace(/Zod/g, '').toLowerCase();

    return {
      type,
      getDefault: () => schemaDef?.defaultValue?.(),
    };
  };

  /**
   * For nested schemas, reach will retrieve an inner schema based on the provided path.
   */
  const reach = (
    schema: ZodSchema,
    path: string,
    store: { effects?: ZodEffects<any> } = {}
  ): { schema: ZodSchema; store: { effects?: ZodEffects<any> } } => {
    let [currentPath, ...rest] = path.split('.');
    let currentSchema = schema;
    const { type } = getSchemaDef(currentSchema);

    /**
     * Effects are created when zod superRefine fn is used.
     * Only is stored the parent effect of the given path.
     */
    if (type === 'effects') {
      const effects = schema as ZodEffects<any>;
      store.effects = effects;
      currentSchema = effects._def.schema;
      return reach(currentSchema, path, store);
    } else if (type === 'array') {
      const element = (schema as ZodArray<any>).element;
      currentSchema = element?.shape?.[currentPath] || element;
    } else if (type === 'object') {
      currentSchema = (schema as ZodObject<any>).shape[currentPath];
    }

    if (rest.length === 0) {
      return { schema: currentSchema, store };
    } else {
      return reach(currentSchema, rest.join('.'), store);
    }
  };

  return {
    isFieldFromSchema,
    validateAt,
    buildDefault,
    getFieldDataType,
  };
};
