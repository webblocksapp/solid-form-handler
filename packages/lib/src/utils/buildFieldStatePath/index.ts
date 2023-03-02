import {
  CHILDREN_KEY,
  ENDS_WITH_DOT_CHILDREN_REGEXP,
  ENDS_WITH_DOT_STATE_REGEXP,
  FIELDSETS_KEY,
  STARTS_WITH_NUMBER_DOT_REGEXP,
  STATE_KEY,
} from '@constants';
import { isInteger } from '@utils';

/**
 * Function that build the field state path when is given a normal path.
 */
export const buildFieldStatePath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = '';

  if (path === '' || isInteger(path)) return `${FIELDSETS_KEY}.${STATE_KEY}`;

  for (let i = 0; i < arrPath.length; i++) {
    const dot = builtPath ? '.' : '';
    const currentPath = arrPath[i];
    const nextPath = arrPath[i + 1];

    //key1.0 ==> key1.${STATE_KEY}
    if (nextPath === undefined && isInteger(currentPath)) {
      builtPath = builtPath.replace(ENDS_WITH_DOT_CHILDREN_REGEXP, `${dot}${STATE_KEY}`);
      //key1.key2 ==> key1.${CHILDREN_KEY}.key2.${STATE_KEY}
    } else if (nextPath === undefined && !isInteger(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.${STATE_KEY}`;
    } else if (nextPath && !isInteger(currentPath)) {
      builtPath = `${builtPath}${dot}${currentPath}.${CHILDREN_KEY}`;
    } else {
      builtPath = `${builtPath}${dot}${currentPath}`;
    }
  }

  if (isInteger(builtPath)) {
    builtPath = `${FIELDSETS_KEY}.${STATE_KEY}`;
  } else if (builtPath.match(STARTS_WITH_NUMBER_DOT_REGEXP)) {
    builtPath = `${FIELDSETS_KEY}.${CHILDREN_KEY}.${builtPath}`;
  }

  if (builtPath.match(ENDS_WITH_DOT_STATE_REGEXP)) return builtPath;
};
