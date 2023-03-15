const implementations = import.meta.glob(
  '../../implementations/**/*.(ts|tsx)',
  {
    as: 'raw',
  }
);
const schemas = import.meta.glob('../../schemas/*.ts', { as: 'raw' });
const apis = import.meta.glob('../../apis/**/*.ts', { as: 'raw' });
const codeSnippets = import.meta.glob('../../code-snippets/**/*.(ts|tsx)', {
  as: 'raw',
});
const components = import.meta.glob('../../components/**/*.tsx', { as: 'raw' });
const modules = {
  ...implementations,
  ...schemas,
  ...apis,
  ...codeSnippets,
  ...components,
};

export const getRaw = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in modules) {
    if (key.match(`/${path}`)) {
      return modules[key] as unknown as string;
    }
  }

  return '';
};
