import { buildFieldStatePath } from '@utils';
import { CHILDREN_KEY, ROOT_KEY, STATE_KEY } from '@constants';

describe('buildFieldStatePath', () => {
  it('CASE-1', () => {
    expect(buildFieldStatePath('key1.key2.key3')).toBe(`key1.${CHILDREN_KEY}.key2.${CHILDREN_KEY}.key3.${STATE_KEY}`);
  });

  it('CASE-2', () => {
    expect(buildFieldStatePath('0.1.key1')).toBe(`${ROOT_KEY}.${CHILDREN_KEY}.0.1.key1.${STATE_KEY}`);
  });

  it('CASE-3', () => {
    expect(buildFieldStatePath('0.1.2')).toBe(undefined);
  });

  it('CASE-4', () => {
    expect(buildFieldStatePath('key1.0')).toBe(`key1.${STATE_KEY}`);
  });

  it('CASE-5', () => {
    expect(buildFieldStatePath(ROOT_KEY)).toBe(`${ROOT_KEY}.${STATE_KEY}`);
  });

  it('CASE-6', () => {
    expect(buildFieldStatePath('')).toBe(`${ROOT_KEY}.${STATE_KEY}`);
  });
});
