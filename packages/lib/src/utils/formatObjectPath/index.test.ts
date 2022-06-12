import { formatObjectPath } from '@utils';

describe('formatObjectPath', () => {
  it('formats brackets path notation to dots', () => {
    expect(formatObjectPath('[0].key1')).toBe('0.key1');
    expect(formatObjectPath('["0"].key1[2]')).toBe('0.key1.2');
    expect(formatObjectPath('[0]["1"].key1["3"][2].key5')).toBe('0.1.key1.3.2.key5');
  });
});
