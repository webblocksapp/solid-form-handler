import { reorderArray } from '@utils';

describe('reorderArray', () => {
  it('CASE-1', () => {
    expect(reorderArray([1, 2, 3], 1, 0)).toMatchObject([2, 1, 3]);
  });

  it('CASE-2', () => {
    expect(reorderArray([1, 2, 3], 2, 0)).toMatchObject([3, 1, 2]);
  });
});
