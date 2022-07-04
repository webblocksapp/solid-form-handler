const implementations = import.meta.glob('../../implementations/**/*.tsx', { as: 'raw' });
const schemas = import.meta.glob('../../schemas/*.ts', { as: 'raw' });
const modules = { ...implementations, ...schemas };

export const getRaw = async (path: string) => {
  for (let key in modules) {
    if (key.match(path)) {
      return modules[key] as unknown as Promise<string>;
    }
  }
};
