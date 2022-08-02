import { CommonObject } from '@interfaces';
import { formatObjectPath } from '@utils';

/**
 * Converts a nested object into a plain data structure.
 */
export const flattenObject = (data: any, path: string = '', flattenedObject: CommonObject = {}) => {
  const addToObject = (data: any, path: string) => {
    path = formatObjectPath(path);
    flattenedObject[path] = data;
  };

  if (Array.isArray(data) && data.length === 0 && path) {
    addToObject(data, path);
  } else if (typeof data === 'object') {
    for (let key in data) {
      flattenedObject = flattenObject(data[key], `${path}.${key}`, flattenedObject);
    }
  } else {
    addToObject(data, path);
  }

  return flattenedObject;
};
