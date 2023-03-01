import { isNumber } from '@utils';

/**
 * Function that build the field state path when is given a normal path.
 */
export const buildFieldStatePath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = '';

  if (path === '') return `fieldsets.state`;

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

  if (isNumber(builtPath)) {
    builtPath = `fieldsets.state`;
  } else if (builtPath.match(/^\d+\./)) {
    builtPath = `fieldsets.children.${builtPath}`;
  }

  if (builtPath.match(/\.state$/)) return builtPath;
};
