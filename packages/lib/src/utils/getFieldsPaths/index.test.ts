import { ROOT_KEY } from '@constants';
import { getFieldsPaths } from '@utils';

describe('getFieldsPaths', () => {
  it('CASE-1', () => {
    const value = getFieldsPaths([]);
    expect(value).toMatchObject([ROOT_KEY]);
  });

  it('CASE-2', () => {
    const value = getFieldsPaths([{ name: 'John' }]);
    expect(value).toMatchObject([ROOT_KEY, '0.name']);
  });

  it('CASE-3', () => {
    const value = getFieldsPaths([{ name: 'John', contacts: [{ email: 'mail@mail.com' }] }]);
    expect(value).toEqual(expect.arrayContaining([ROOT_KEY, '0.name', '0.contacts', '0.contacts.0.email']));
  });

  it('CASE-4', () => {
    const data = { key1: { key11: { key111: '' } }, key2: { key21: '' } };
    expect(getFieldsPaths(data)).toEqual(
      expect.arrayContaining([ROOT_KEY, 'key1', 'key1.key11', 'key1.key11.key111', 'key2', 'key2.key21'])
    );
  });
});
