import { flattenTree } from './index';
import { MENU } from './mocks';

describe('flattenTree', () => {
  it('Flattens a nested tree data structure', () => {
    const flattenedTree = flattenTree(MENU);
    expect(flattenedTree).toMatchObject([
      {
        text: 'Getting started',
        section: true,
      },
      { text: 'Introduction', route: 'introduction' },
      {
        text: 'Validations',
        route: 'validations',
        section: true,
      },
    ]);
  });
});
