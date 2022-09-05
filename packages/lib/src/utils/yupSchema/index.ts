import { ValidationSchema } from '@interfaces';
import { flattenObject, set, get, ValidationResult } from '@utils';
import { SchemaOf, ValidationError, reach } from 'yup';
import * as yup from 'yup';

/**
 * Yup schema adapter for solid form handler.
 */
export const yupSchema = <T>(schema: SchemaOf<T>): ValidationSchema<T> => {
  /**
   * Checks if the field is part of the given yup schema.
   * Fields that are not part of the schema are considered as metadata
   * and doesn't require validation. e.g. id, timestamp, foreignId, etc...
   */
  const isFieldFromSchema = (path: string) => {
    let isFromSchema = true;
    try {
      reach(schema, path);
    } catch (_) {
      isFromSchema = false;
    }
    return isFromSchema;
  };

  /**
   * Validates a single field of the form.
   */
  const validateAt: ValidationSchema<T>['validateAt'] = async (path, data) => {
    try {
      await schema.validateAt(path, data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationResult(path, error.message);
      } else {
        console.error(error);
      }
    }
  };

  /**
   * Builds a default object from a yup schema
   */
  const buildDefault = (_schema: yup.AnySchema = schema, path?: string, object?: any): T => {
    let obj = object;
    path = path ? `${path}.` : '';
    const targetPath = path.replace(/\.$/, '');

    if (_schema instanceof yup.ArraySchema) {
      if (_schema.getDefault()) {
        set(obj, targetPath, _schema.getDefault());
      } else {
        obj = obj ? set(obj, targetPath, []) : [];
        /**
         * When the schema is an array without a default value, it reach the 0 index of the array for getting
         * the inner yup schema (it can be an object, array or a primitive schema).
         */
        const reachedSchema = reach(_schema, '0') as yup.AnySchema;
        obj = buildDefault(reachedSchema, `${path}0`, obj);
      }
    } else if (_schema instanceof yup.ObjectSchema) {
      obj = obj ? set(obj, targetPath, {}) : {};
      /**
       * Iterates every schema key to check if it is an ArraySchema or ObjectSchema.
       * If no, the default empty value is assigned to the object.
       */
      Object.keys(flattenObject(_schema.getDefault())).forEach((key) => {
        const reachedSchema = reach(_schema, key);
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
        ? set(obj, prevTargetPath, _schema.getDefault() ?? [])
        : set(obj, targetPath, _schema.getDefault() ?? '');
    }

    return obj;
  };

  return { isFieldFromSchema, validateAt, buildDefault };
};
