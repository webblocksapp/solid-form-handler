import { buildFieldChildrenPath } from '@utils';
import { CHILDREN_KEY, ROOT_KEY } from '@constants';

describe('buildFieldChildrenPath', () => {
  it('CASE-1', () => {
    expect(buildFieldChildrenPath('key1.key2.key3')).toBe(
      `${ROOT_KEY}.${CHILDREN_KEY}.key1.${CHILDREN_KEY}.key2.${CHILDREN_KEY}.key3.${CHILDREN_KEY}`
    );
  });

  it('CASE-2', () => {
    expect(buildFieldChildrenPath('0.1.key1')).toBe(undefined);
  });

  it('CASE-3', () => {
    expect(buildFieldChildrenPath('0.1.2')).toBe(undefined);
  });

  it('CASE-4', () => {
    expect(buildFieldChildrenPath('key1.0')).toBe(`${ROOT_KEY}.${CHILDREN_KEY}.key1.${CHILDREN_KEY}`);
  });
});
