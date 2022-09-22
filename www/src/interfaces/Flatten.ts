export type Flatten<T> = T extends Array<infer U> ? U : T;
