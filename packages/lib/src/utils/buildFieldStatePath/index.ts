import { isNumber } from '@utils';

/**
 * Function that build the field state path when is given a normal path.
 */
export const buildFieldStatePath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = '';

  for (let i = 0; i < arrPath.length; i++) {
    const dot = builtPath ? '.' : '';
    const currentPath = arrPath[i];
    const nextPath = arrPath[i + 1];

    if (nextPath === undefined && !isNumber(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.state`;
    } else if (nextPath && !isNumber(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.children`;
    } else {
      builtPath = `${builtPath}${dot}${currentPath}`;
    }
  }

  return builtPath;
};
