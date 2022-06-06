import { CommonObject } from '@interfaces';

/**
 * Converts a nested object into a plain data structure.
 */
export const flattenObject = (data: any, path: string = '', flattenedObject: CommonObject = {}) => {
  if (typeof data === 'object') {
    for (let key in data) {
      flattenedObject = flattenObject(data[key], `${path}.${key}`, flattenedObject);
    }
  } else {
    path = path.replace(/^\./, '').replace(/\.$/, '');
    flattenedObject[path] = data;
  }

  return flattenedObject;
};
