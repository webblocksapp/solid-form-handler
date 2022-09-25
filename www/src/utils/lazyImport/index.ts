import { lazy } from 'solid-js';

export const lazyImport = (path: string) => {
  return lazy(async () => {
    const component = path.split('/').pop();
    const module = await import(`../../${path}`);
    return { default: module[component as string] };
  });
};
