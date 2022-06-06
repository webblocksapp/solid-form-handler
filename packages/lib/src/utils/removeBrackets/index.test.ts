import { removeBrackets } from '@utils';

describe('removeBrackets', () => {
  it('removes brackets from string', () => {
    expect(removeBrackets('[0].key1')).toBe('0.key1');
  });
});
