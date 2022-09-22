import { Flatten } from '@interfaces';

export type Tree<T> = Array<Flatten<T> & { children?: Tree<T> }>;
