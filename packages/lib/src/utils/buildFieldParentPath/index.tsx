import { ROOT_KEY } from '@constants';
import { isInteger } from '@utils';

export const buildFieldParentPath = (path: string) => {
  const arrPath = path.split('.');
  let builtPath = ROOT_KEY;
  arrPath.pop();

  for (let i = arrPath.length - 1; i >= 0; i--) {
    if (!isInteger(arrPath[i])) {
      builtPath = arrPath.join('.');
      break;
    }

    arrPath.pop();
  }

  return builtPath;
};
