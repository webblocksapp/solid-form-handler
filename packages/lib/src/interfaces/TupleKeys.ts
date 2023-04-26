export type TupleKeys<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
