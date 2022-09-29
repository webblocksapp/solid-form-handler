import { JSX } from 'solid-js';

export type MenuItem = {
  text: string;
  route?: string;
  section?: boolean;
  icon?: JSX.Element;
  external?: boolean;
};
