import { objectPaths } from '@utils';

describe('objectPaths', () => {
  it('CASE-1', () => {
    const data = [1, 2, 3, 4];
    expect(objectPaths(data)).toEqual(expect.arrayContaining(['0', '1', '2', '3']));
  });

  it('CASE-2', () => {
    const data = [[1], [2], [3], [4]];
    expect(objectPaths(data)).toEqual(expect.arrayContaining(['0.0', '1.0', '2.0', '3.0']));
  });

  it('CASE-3', () => {
    const data = 'Hello World';
    expect(objectPaths(data)).toMatchObject([]);
  });

  it('CASE-4', () => {
    const data = { key1: { key11: { key111: '' } }, key2: { key21: '' } };
    expect(objectPaths(data)).toEqual(
      expect.arrayContaining(['key1', 'key1.key11', 'key1.key11.key111', 'key2', 'key2.key21'])
    );
  });

  it('CASE-5', () => {
    const data = { key1: { key11: { key111: [{ name: '' }] } }, key2: { key21: [1, 2, 3] } };
    expect(objectPaths(data)).toEqual(
      expect.arrayContaining([
        'key1',
        'key1.key11',
        'key1.key11.key111',
        'key1.key11.key111.0',
        'key1.key11.key111.0.name',
        'key2',
        'key2.key21',
        'key2.key21.0',
        'key2.key21.1',
        'key2.key21.2',
      ])
    );
  });
});
