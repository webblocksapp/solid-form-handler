import { flattenObject } from '@utils';

export const isEmpty = (data: any) => {
  if (data === undefined || data === '') return true;
  if (typeof data === 'object') {
    const flattenedObject = flattenObject(data);
    if (Object.keys(flattenedObject).length === 0) return true;
    for (let key in flattenedObject) {
      const value = flattenedObject[key];
      if (value !== '' && value !== undefined) return false;
    }
    return true;
  }

  return false;
};
