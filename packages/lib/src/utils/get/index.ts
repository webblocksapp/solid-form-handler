import { formatObjectPath } from '@utils';

/**
 * Gets the value from a nested object path.
 */
export const get = (data: any, path: string): any => {
  path = formatObjectPath(path);
  const [key, ...rest] = path.split('.');
  const value = data[key];

  if (typeof data[key] === 'object') {
    return get(value, rest.join('.'));
  } else {
    return value;
  }
};
