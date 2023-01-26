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
    const schemaDef = _schema._def as ZodTypeDef & { typeName?: string; defaultValue?: () => any };
    const schemaType = schemaDef?.typeName;
    const getDefault = () => schemaDef?.defaultValue?.();

    if (schemaType === 'ZodArray') {
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
    } else if (schemaType === 'ZodObject') {
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
    //TODO add logic to get field data type.
    return '';
  };

  return {
    isFieldFromSchema,
    validateAt,
    buildDefault,
    getFieldDataType,
  };
};
