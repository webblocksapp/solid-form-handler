import * as yup from 'yup';
import { flattenObject, set } from '@utils';

/**
 * Builds a default object using a yup schema
 */
export const buildDefault = (schema: yup.AnySchema, path?: string, object?: any) => {
  let obj = object;
  path = path ? `${path}.` : '';
  const targetPath = path.replace(/\.$/, '');

  if (schema instanceof yup.ArraySchema) {
    obj = obj ? set(obj, targetPath, []) : [];
    const reachedSchema = yup.reach(schema, '0') as yup.AnySchema;
    obj = buildDefault(reachedSchema, `${path}0`, obj);
  } else if (schema instanceof yup.ObjectSchema) {
    obj = obj ? set(obj, targetPath, {}) : {};
    Object.keys(flattenObject(schema.getDefault())).forEach((key) => {
      const reachedSchema = yup.reach(schema, key);
      obj = buildDefault(reachedSchema, `${path}${key}`, obj);
    });
  } else {
    console.log(targetPath);
    obj = set(obj, targetPath, '');
  }

  return obj;
};
