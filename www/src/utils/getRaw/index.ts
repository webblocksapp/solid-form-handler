import { snippetsStore } from '@utils';

export const getRaw = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in snippetsStore.snippets) {
    if (key.match(`/${path}`)) {
      return snippetsStore.snippets[key];
    }
  }

  return '';
};
