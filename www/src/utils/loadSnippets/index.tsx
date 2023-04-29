const snippets: {
  [key: string]: any;
} = {};

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

export const loadSnippets = async () => {
  const promises: Promise<void>[] = [];

  for (let [key, value] of Object.entries(modules)) {
    promises.push(
      new Promise(async (resolve) => {
        snippets[key] = await value();
        resolve();
      })
    );
  }

  await Promise.all(promises);
};

export { snippets };
