import { TreeMenu } from '@interfaces';

export const MENU: TreeMenu[] = [
  {
    text: 'Getting started',
    section: true,
    children: [{ text: 'Introduction', route: 'introduction' }],
  },
  {
    text: 'Validations',
    route: 'validations',
    section: true,
  },
];
