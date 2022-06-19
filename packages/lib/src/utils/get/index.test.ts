import { get } from '@utils';

describe('get', () => {
  it('CASE-1', () => {
    const value = get([], '0');
    expect(value).toBe(undefined);
  });

  it('CASE-2', () => {
    const value = get([{ name: 'John' }], '0.name');
    expect(value).toBe('John');
  });

  it('CASE-3', () => {
    const value = get([{ emails: [] }], '0.emails');
    expect(value).toMatchObject([]);
  });

  it('CASE-4', () => {
    const value = get({ key1: { key2: { key3: 'Hello world' } } }, 'key1.key2.key3');
    expect(value).toBe('Hello world');
  });

  it('CASE-5', () => {
    const obj = [{ name: 'Julia' }, { name: 'Leo' }];
    const value1 = get(obj, '[0].name');
    const value2 = get(obj, '1.name');

    expect(value1).toBe('Julia');
    expect(value2).toBe('Leo');
  });
});
