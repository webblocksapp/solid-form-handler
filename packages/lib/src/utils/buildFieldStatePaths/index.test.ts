import { buildFieldStatePaths } from '@utils';
import { CHILDREN_KEY, STATE_KEY } from '@constants';

describe('buildFieldStatePaths', () => {
  it('CASE-1', () => {
    const data = [1, 2, 3, 4];
    expect(buildFieldStatePaths(data).fieldStatePaths).toEqual(expect.arrayContaining([]));
  });

  it('CASE-2', () => {
    const data = [[1], [2], [3], [4]];
    expect(buildFieldStatePaths(data).fieldStatePaths).toEqual(expect.arrayContaining([]));
  });

  it('CASE-3', () => {
    const data = 'Hello World';
    expect(buildFieldStatePaths(data).fieldStatePaths).toMatchObject([]);
  });

  it('CASE-4', () => {
    const data = { key1: { key11: { key111: '' } }, key2: { key21: '' } };
    expect(buildFieldStatePaths(data).fieldStatePaths).toEqual(
      expect.arrayContaining([
        `key1.${STATE_KEY}`,
        `key1.${CHILDREN_KEY}.key11.${STATE_KEY}`,
        `key1.${CHILDREN_KEY}.key11.${CHILDREN_KEY}.key111.${STATE_KEY}`,
        `key2.${STATE_KEY}`,
        `key2.${CHILDREN_KEY}.key21.${STATE_KEY}`,
      ])
    );
  });

  it('CASE-5', () => {
    const data = { key1: { key11: { key111: [{ name: '' }] } }, key2: { key21: [1, 2, 3] } };
    expect(buildFieldStatePaths(data).fieldStatePaths).toEqual(
      expect.arrayContaining([
        `key1.${STATE_KEY}`,
        `key1.${CHILDREN_KEY}.key11.${STATE_KEY}`,
        `key1.${CHILDREN_KEY}.key11.${CHILDREN_KEY}.key111.${STATE_KEY}`,
        `key1.${CHILDREN_KEY}.key11.${CHILDREN_KEY}.key111.${CHILDREN_KEY}.0.name.${STATE_KEY}`,
        `key2.${STATE_KEY}`,
        `key2.${CHILDREN_KEY}.key21.${STATE_KEY}`,
      ])
    );
  });
});
