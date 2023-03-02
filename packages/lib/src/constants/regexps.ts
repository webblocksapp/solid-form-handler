import { CHILDREN_KEY, ROOT_KEY, STATE_KEY } from '@constants';

export const ENDS_WITH_DOT_STATE_REGEXP = new RegExp(`\.${STATE_KEY}$`);
export const ENDS_WITH_DOT_CHILDREN_REGEXP = new RegExp(`\.${CHILDREN_KEY}$`);
export const ENDS_WITH_DOT_STATE_OR_DOT_CHILDREN_REGEXP = new RegExp(`(\.${STATE_KEY}|\.${CHILDREN_KEY}$)`, 'gi');
export const STARTS_WITH_ROOT_KEY_DOT_CHILDREN_REGEXP = new RegExp(`^${ROOT_KEY}\.${CHILDREN_KEY}\.`);
export const IS_ROOT_KEY_DOT_STATE_REGEXP = new RegExp(`^${ROOT_KEY}\.${STATE_KEY}$`);
export const STARTS_WITH_NUMBER_DOT_REGEXP = new RegExp(`^\\d+\.`);
export const IS_INTEGER_REGEXP = new RegExp(`^[-]?\\d+\$`);
export const MATCHES_CHILDREN_KEY_REGEXP = new RegExp(`${CHILDREN_KEY}`, 'g');
