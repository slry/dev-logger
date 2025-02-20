export type IsSameType<T, U> = T extends U ? (U extends T ? true : false) : false;
export type Expect<T extends true> = T;
