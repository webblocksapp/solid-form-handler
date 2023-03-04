import { ENDS_WITH_DOT_NUMBER_REGEXP, ROOT_KEY } from '@constants';
import { isInteger, objectPaths } from '@utils';

export const getFieldsPaths = (data: any) => {
  const paths = objectPaths(data).filter(
    (path) => !path.match(ENDS_WITH_DOT_NUMBER_REGEXP)?.length && !isInteger(path)
  );
  paths.unshift(ROOT_KEY);
  return paths;
};
