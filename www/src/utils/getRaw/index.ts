import { snippets } from '@utils';

export const getRaw = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in snippets) {
    if (key.match(`/${path}`)) {
      return snippets[key];
    }
  }

  return '';
};
