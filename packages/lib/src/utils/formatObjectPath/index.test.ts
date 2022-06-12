import { formatObjectPath } from '@utils';

describe('formatObjectPath', () => {
  it('removes brackets from string', () => {
    expect(formatObjectPath('[0].key1')).toBe('0.key1');
  });
});
