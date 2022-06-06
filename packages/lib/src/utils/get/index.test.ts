import { get } from '@utils';

describe('get', () => {
  it('gets a nested value from an object', () => {
    const value = get({ key1: { key2: { key3: 'Hello world' } } }, 'key1.key2.key3');
    expect(value).toBe('Hello world');
  });

  it('gets a nested value from an array', () => {
    const obj = [{ name: 'Julia' }, { name: 'Leo' }];
    const value1 = get(obj, '[0].name');
    const value2 = get(obj, '1.name');

    expect(value1).toBe('Julia');
    expect(value2).toBe('Leo');
  });
});
