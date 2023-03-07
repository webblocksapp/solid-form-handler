import { ROOT_KEY } from '@constants';
import { buildFieldParentPath } from '@utils';

describe('getParentPath', () => {
  it('CASE-1', () => {
    expect(buildFieldParentPath('key1')).toBe(`${ROOT_KEY}`);
  });

  it('CASE-2', () => {
    expect(buildFieldParentPath('key1.0.name')).toBe(`key1`);
  });

  it('CASE-3', () => {
    expect(buildFieldParentPath('key1.0.contact.0.1')).toBe(`key1.0.contact`);
  });
});
