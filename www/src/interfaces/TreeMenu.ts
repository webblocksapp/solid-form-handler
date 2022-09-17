import { Menu } from '@interfaces';

export type TreeMenu = Menu & {
  children?: TreeMenu[];
  section?: boolean;
};
