import { Paths } from '@interfaces';

export type FlattenPaths<T> = Exclude<Paths<T, ''>, ''>;
