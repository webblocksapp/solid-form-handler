import { flattenObject, set } from '@utils';

export const clone = <T>(data: T): T | undefined => {
  let obj: any = undefined;
  if (data === undefined) return obj;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) obj = [];
  if (!Array.isArray(data)) obj = {};

  const flattenedObject = flattenObject(data);

  Object.keys(flattenedObject).forEach((path) => {
    const value = flattenedObject[path];
    set(obj, path, value);
  });

  return obj;
};
