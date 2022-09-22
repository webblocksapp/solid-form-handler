/**
 * Util function for flattening a nested tree data structure
 */
import { Tree, Flatten } from '@interfaces';
import { clone } from '../clone';

export const flattenTree = <T extends Array<Flatten<T>>>(
  data: Tree<Flatten<T>> = [],
  flattenedTree: Tree<Flatten<T>> = []
): Tree<Flatten<T>> => {
  clone(data).forEach((item) => {
    flattenedTree.push(item);

    if (item.children) {
      flattenTree(item.children, flattenedTree);
      delete item.children;
    }
  });

  return flattenedTree;
};
