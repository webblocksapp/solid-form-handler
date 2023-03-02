import { ENDS_WITH_DOT_STATE_REGEXP, ROOT_KEY, STATE_KEY } from '@constants';
import { buildFieldStatePath, objectPaths } from '@utils';

/**
 * Obtains recursively the object paths.
 */
export const buildFieldStatePaths = (data: any) => {
  const paths = objectPaths(data);
  const fieldStatePaths: string[] = [`${ROOT_KEY}.${STATE_KEY}`];

  paths.forEach((path) => {
    const fieldStatePath = buildFieldStatePath(path);

    if (fieldStatePath?.match(ENDS_WITH_DOT_STATE_REGEXP) && !fieldStatePaths.includes(fieldStatePath)) {
      fieldStatePaths.push(fieldStatePath);
    }
  });

  return { fieldStatePaths, paths };
};
