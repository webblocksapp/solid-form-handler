import { IsTuple, TupleKeys, Paths } from '@interfaces';

export type NestedPaths<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]: Paths<T[K], `${K & string}`>;
      }[TupleKeys<T>]
    : Paths<V, number>
  : {
      [K in keyof T]-?: Paths<T[K], `${K & string}`>;
    }[keyof T];
