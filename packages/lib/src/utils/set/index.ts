import { formatObjectPath } from '@utils';

export const set = (object: any, path: string, value: any) => {
  let obj = object;
  const arrPath = formatObjectPath(path).split('.');

  arrPath.forEach((key, i) => {
    if (i === arrPath.length - 1) {
      obj[key] = value;
    } else {
      obj = obj[key];
    }
  });

  return object;
};
