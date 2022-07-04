import { TreeMenu } from '@interfaces';

export const SIDEBAR_MENU: TreeMenu[] = [
  {
    text: 'Getting started',
    section: true,
    children: [
      { text: 'Introduction', route: 'introduction' },
      { text: 'Setup', route: 'setup' },
    ],
  },
  {
    text: 'Implementation',
    section: true,
    children: [
      { text: 'Validation schema', route: 'validation-schema' },
      { text: 'Form validation', route: 'form-validation' },
    ],
  },
];
