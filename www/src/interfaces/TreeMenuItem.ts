import { MenuItem } from '@interfaces';

export type TreeMenuItem<T = MenuItem> = T & {
  children?: TreeMenuItem<T>[];
};
