import {
  CHILDREN_KEY,
  ENDS_WITH_DOT_CHILDREN_REGEXP,
  ENDS_WITH_DOT_STATE_REGEXP,
  ROOT_KEY,
  STARTS_WITH_NUMBER_DOT_REGEXP,
  STATE_KEY,
} from '@constants';
import { isInteger } from '@utils';

/**
 * Function that build the field state path when is given a normal path.
 */
export const buildFieldStatePath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = `${ROOT_KEY}.${CHILDREN_KEY}`;

  //${ROOT_KEY} ==> ${ROOT_KEY}.${STATE_KEY}
  if (path === ROOT_KEY) return `${ROOT_KEY}.${STATE_KEY}`;

  for (let i = 0; i < arrPath.length; i++) {
    const currentPath = arrPath[i];
    const nextPath = arrPath[i + 1];

    //key1.0 ==> ${ROOT_KEY}.${CHILDREN_KEY}.key1.${STATE_KEY}
    if (nextPath === undefined && isInteger(currentPath)) {
      builtPath = builtPath.replace(ENDS_WITH_DOT_CHILDREN_REGEXP, `.${STATE_KEY}`);
      //key1.key2 ==> ${ROOT_KEY}.${CHILDREN_KEY}.key1.${CHILDREN_KEY}.key2.${STATE_KEY}
    } else if (nextPath === undefined && !isInteger(currentPath)) {
      builtPath = `${builtPath}.${currentPath}.${STATE_KEY}`;
    } else if (nextPath && !isInteger(currentPath)) {
      builtPath = `${builtPath}.${currentPath}.${CHILDREN_KEY}`;
    } else {
      builtPath = `${builtPath}.${currentPath}`;
    }
  }

  if (isInteger(builtPath)) {
    builtPath = `${ROOT_KEY}.${STATE_KEY}`;
  } else if (builtPath.match(STARTS_WITH_NUMBER_DOT_REGEXP)) {
    builtPath = `${ROOT_KEY}.${CHILDREN_KEY}.${builtPath}`;
  }

  if (builtPath.match(ENDS_WITH_DOT_STATE_REGEXP)) return builtPath;
};
