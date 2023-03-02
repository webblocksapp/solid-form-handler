import { IS_INTEGER_REGEXP } from '@constants';

export const isInteger = (input: any = '') => {
  return Boolean(String(input)?.match(IS_INTEGER_REGEXP)?.length);
};
