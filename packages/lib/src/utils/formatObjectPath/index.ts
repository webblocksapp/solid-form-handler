export const formatObjectPath = (string: string) => {
  return string
    .replace(/\[/g, '.')
    .replace(/\]/g, '.')
    .replace(/\.\"/g, '.')
    .replace(/\"\./g, '.')
    .replace(/\.\./g, '.')
    .replace(/^\./, '')
    .replace(/\.$/, '');
};
