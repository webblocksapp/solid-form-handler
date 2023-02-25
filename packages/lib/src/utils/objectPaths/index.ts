/**
 * Retrieves all the object paths in a recursive way.
 */
export const objectPaths = (data: any, path: string = '', paths: Array<string> = []) => {
  path = path ? `${path}.` : '';

  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      let nextPath = `${path}${key}`;

      if (typeof data[key] === 'object') {
        objectPaths(data[key], nextPath, paths);
      }

      paths.push(nextPath);
    });
  }

  return paths;
};
