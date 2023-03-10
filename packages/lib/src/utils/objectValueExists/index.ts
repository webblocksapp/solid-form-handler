import { get } from '@utils';

export const objectValueExists = (data: any, path: string) => {
  return get(data, path) === undefined ? false : true;
};
