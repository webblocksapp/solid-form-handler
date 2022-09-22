import { flattenTree } from './index';
import { MENU } from './mocks';

describe('flattenTree', () => {
  it('Flattens a nested tree data structure', () => {
    const flattenedTree = flattenTree(MENU);

    expect(flattenedTree).toMatchObject([
      {
        text: 'Getting started',
        section: true,
        __id: '1',
        __level: 1,
      },
      { text: 'Introduction', route: 'introduction', __id: '1-1', __level: 2 },
      {
        text: 'Validations',
        route: 'validations',
        section: true,
        __id: '2',
        __level: 1,
      },
    ]);
  });
});
