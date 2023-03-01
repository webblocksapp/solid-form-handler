import { CHILDREN_KEY, ENDS_WITH_DOT_STATE_REGEXP } from '@constants';
import { buildFieldStatePath } from '@utils';

/**
 * Function that build the field children path when is given a normal path.
 */
export const buildFieldChildrenPath = (path: string) => {
  return buildFieldStatePath(path)?.replace?.(ENDS_WITH_DOT_STATE_REGEXP, `.${CHILDREN_KEY}`);
};
