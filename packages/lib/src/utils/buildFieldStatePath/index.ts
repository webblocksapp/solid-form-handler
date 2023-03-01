import {
  CHILDREN_KEY,
  ENDS_WITH_DOT_STATE_REGEXP,
  FIELDSETS_KEY,
  STARTS_WITH_NUMBER_DOT_REGEXP,
  STATE_KEY,
} from '@constants';
import { isNumber } from '@utils';

/**
 * Function that build the field state path when is given a normal path.
 */
export const buildFieldStatePath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = '';

  if (path === '') return `${FIELDSETS_KEY}.${STATE_KEY}`;

  for (let i = 0; i < arrPath.length; i++) {
    const dot = builtPath ? '.' : '';
    const currentPath = arrPath[i];
    const nextPath = arrPath[i + 1];

    if (nextPath === undefined && !isNumber(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.${STATE_KEY}`;
    } else if (nextPath && !isNumber(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.${CHILDREN_KEY}`;
    } else {
      builtPath = `${builtPath}${dot}${currentPath}`;
    }
  }

  if (isNumber(builtPath)) {
    builtPath = `${FIELDSETS_KEY}.${STATE_KEY}`;
  } else if (builtPath.match(STARTS_WITH_NUMBER_DOT_REGEXP)) {
    builtPath = `${FIELDSETS_KEY}.${CHILDREN_KEY}.${builtPath}`;
  }

  if (builtPath.match(ENDS_WITH_DOT_STATE_REGEXP)) return builtPath;
};
