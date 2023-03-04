import { ENDS_WITH_DOT_STATE_REGEXP, ROOT_KEY } from '@constants';
import { buildFieldStatePath, getFieldsPaths, objectPaths } from '@utils';

/**
 * Obtains recursively the object paths.
 */
export const buildFieldStatePaths = (data: any) => {
  const fieldsPaths = getFieldsPaths(data);
  const fieldStatePaths: string[] = [];

  if (typeof data === 'object') {
    fieldsPaths.forEach((fieldPath) => {
      const fieldStatePath = buildFieldStatePath(fieldPath);

      if (fieldStatePath?.match(ENDS_WITH_DOT_STATE_REGEXP)) {
        fieldStatePaths.push(fieldStatePath);
      }
    });
  }

  return { fieldStatePaths, fieldsPaths };
};
