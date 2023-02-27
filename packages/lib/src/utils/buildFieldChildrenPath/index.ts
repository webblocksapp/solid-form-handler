import { buildFieldStatePath } from '@utils';

/**
 * Function that build the field children path when is given a normal path.
 */
export const buildFieldChildrenPath = (path: string) => {
  return buildFieldStatePath(path)?.replace?.(/\.state$/, '.children');
};
