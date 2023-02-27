import { buildFieldStatePath, objectPaths } from '@utils';

/**
 * Obtains recursively the object paths.
 */
export const buildFormStatePaths = (data: any) => {
  const paths = objectPaths(data);
  const formStatePaths: string[] = [];

  paths.forEach((path) => {
    const formStatePath = buildFieldStatePath(path);

    if (formStatePath?.match(/\.state$/)) {
      formStatePaths.push(formStatePath);
    }
  });

  return { formStatePaths, paths };
};
