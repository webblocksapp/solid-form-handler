import { flattenObject } from '@utils';

export const equals = (value1: any, value2: any) => {
  if (typeof value1 !== typeof value2) return false;

  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const flattenedValue1 = flattenObject(value1);
    const flattenedValue2 = flattenObject(value2);

    if (Object.keys(flattenedValue1).length !== Object.keys(flattenedValue2).length) return false;
    if (Object.keys(flattenedValue1).length === 0 && Object.keys(flattenedValue2).length === 0) return true;

    for (let key in flattenedValue1) {
      if (equals(flattenedValue1[key], flattenedValue2[key]) === false) return false;
    }

    return true;
  }

  if (value1 === value2) {
    return true;
  }

  return false;
};
