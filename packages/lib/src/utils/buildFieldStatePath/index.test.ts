import { buildFieldStatePath } from '@utils';

describe('buildFieldStatePath', () => {
  it('CASE-1', () => {
    expect(buildFieldStatePath('key1.key2.key3')).toBe('key1.children.key2.children.key3.state');
  });

  it('CASE-2', () => {
    expect(buildFieldStatePath('0.1.key1')).toBe('0.1.key1.state');
  });

  it('CASE-3', () => {
    expect(buildFieldStatePath('0.1.2')).toBe(undefined);
  });

  it('CASE-4', () => {
    expect(buildFieldStatePath('key1.0')).toBe(undefined);
  });
});
