import * as yup from 'yup';
import { flattenObject, set, get } from '@utils';

/**
 * Builds a default object using a yup schema
 */
export const buildDefault = (schema: yup.AnySchema, path?: string, object?: any) => {
  let obj = object;
  path = path ? `${path}.` : '';
  const targetPath = path.replace(/\.$/, '');

  if (schema instanceof yup.ArraySchema) {
    obj = obj ? set(obj, targetPath, []) : [];
    /**
     * When the schema is an array, it reach the 0 index of the array for getting
     * the inner yup schema (it can be an object, array or a primitive schema).
     */
    const reachedSchema = yup.reach(schema, '0') as yup.AnySchema;
    obj = buildDefault(reachedSchema, `${path}0`, obj);
  } else if (schema instanceof yup.ObjectSchema) {
    obj = obj ? set(obj, targetPath, {}) : {};
    /**
     * Iterates every schema key to check if it is an ArraySchema or ObjectSchema.
     * If no, the default empty value is assigned to the object.
     */
    Object.keys(flattenObject(schema.getDefault())).forEach((key) => {
      const reachedSchema = yup.reach(schema, key);
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
    obj = Array.isArray(get(obj, prevTargetPath)) ? set(obj, prevTargetPath, []) : set(obj, targetPath, '');
  }

  return obj;
};
