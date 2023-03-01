import { CHILDREN_KEY, FIELDSETS_KEY, STATE_KEY } from '@constants';

export const ENDS_WITH_DOT_STATE_REGEXP = new RegExp(`\\.${STATE_KEY}$`);
export const ENDS_WITH_DOT_STATE_OR_DOT_CHILDREN_REGEXP = new RegExp(`(\\.${STATE_KEY}|\\.${CHILDREN_KEY})`, 'gi');
export const STARTS_WITH_FIELDSETS_REGEXP = new RegExp(`^${FIELDSETS_KEY}`);
export const STARTS_WITH_NUMBER_DOT_REGEXP = new RegExp(`^\\d+\\.`);
