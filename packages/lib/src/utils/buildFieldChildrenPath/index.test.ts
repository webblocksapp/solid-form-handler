import { buildFieldChildrenPath } from '@utils';

describe('buildFieldChildrenPath', () => {
  it('CASE-1', () => {
    expect(buildFieldChildrenPath('key1.key2.key3')).toBe('key1.children.key2.children.key3.children');
  });

  it('CASE-2', () => {
    expect(buildFieldChildrenPath('0.1.key1')).toBe('0.1.key1.children');
  });

  it('CASE-3', () => {
    expect(buildFieldChildrenPath('0.1.2')).toBe(undefined);
  });

  it('CASE-4', () => {
    expect(buildFieldChildrenPath('key1.0')).toBe(undefined);
  });
});
