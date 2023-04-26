export type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
