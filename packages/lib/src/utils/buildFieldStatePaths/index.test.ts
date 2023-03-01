import { buildFieldStatePaths } from '@utils';

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
        'key1.state',
        'key1.children.key11.state',
        'key1.children.key11.children.key111.state',
        'key2.state',
        'key2.children.key21.state',
      ])
    );
  });

  it('CASE-5', () => {
    const data = { key1: { key11: { key111: [{ name: '' }] } }, key2: { key21: [1, 2, 3] } };
    expect(buildFieldStatePaths(data).fieldStatePaths).toEqual(
      expect.arrayContaining([
        'key1.state',
        'key1.children.key11.state',
        'key1.children.key11.children.key111.state',
        'key1.children.key11.children.key111.children.0.name.state',
        'key2.state',
        'key2.children.key21.state',
      ])
    );
  });
});
