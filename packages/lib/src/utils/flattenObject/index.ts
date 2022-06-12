import { CommonObject } from '@interfaces';
import { formatObjectPath } from '@utils';

/**
 * Converts a nested object into a plain data structure.
 */
export const flattenObject = (data: any, path: string = '', flattenedObject: CommonObject = {}) => {
  if (typeof data === 'object') {
    for (let key in data) {
      flattenedObject = flattenObject(data[key], `${path}.${key}`, flattenedObject);
    }
  } else {
    path = formatObjectPath(path);
    flattenedObject[path] = data;
  }

  return flattenedObject;
};
