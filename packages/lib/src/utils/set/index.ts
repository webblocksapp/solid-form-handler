import { formatObjectPath } from '@utils';

export const set = (object: any, path: string, value: any) => {
  let obj = object;
  const arrPath = formatObjectPath(path).split('.');

  arrPath.forEach((key, i) => {
    if (obj[key] === undefined && isNaN(key as any)) obj[key] = {};
    if (obj[key] === undefined && !isNaN(key as any)) obj[key] = [];

    if (i === arrPath.length - 1) {
      obj[key] = value;
    } else {
      obj = obj[key];
    }
  });

  return object;
};
