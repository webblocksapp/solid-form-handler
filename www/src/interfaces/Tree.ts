export type Tree<T> = Array<{ children?: Tree<T> } & T>;
