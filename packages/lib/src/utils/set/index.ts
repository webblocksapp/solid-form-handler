import { formatObjectPath } from '@utils';

/**
 * Sets the value to a nested object path.
 */
export const set = <T>(object: T, data: any, path: string): T => {
  const arrPath = formatObjectPath(path).split('.');
  const lastKey = arrPath[arrPath.length - 1];
  let currentObj: any = object;

  arrPath.forEach((key) => {
    if (typeof currentObj[key] === 'object' && key !== lastKey) {
      currentObj = currentObj[key];
    } else {
      currentObj[key] = data;
    }
  });

  return object;
};
