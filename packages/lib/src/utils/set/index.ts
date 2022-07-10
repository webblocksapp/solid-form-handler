import { formatObjectPath } from '@utils';

export const set = (object: any, path: string, value: any) => {
  let obj = object;
  const arrPath = formatObjectPath(path).split('.');

  arrPath.forEach((key, i) => {
    const nextKey = arrPath[i + 1];
    if (obj[key] === undefined && isNaN(nextKey as any)) obj[key] = {};
    if (obj[key] === undefined && !isNaN(nextKey as any)) obj[key] = [];
    if (nextKey !== undefined) obj = obj[key];
    if (nextKey === undefined) obj[key] = value;
  });

  return object;
};
