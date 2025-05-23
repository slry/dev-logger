type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type CamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object
        ? CamelCase<U>[]
        : U[]
      : CamelCase<T[K]>
    : T[K];
};

export const snakeToCamelCase = <T extends object>(data: T): CamelCase<T> => {
  const camelCaseData = {} as CamelCase<T>;
  for (const key in data) {
    const camelCaseKey = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace('-', '').replace('_', ''),
    );

    // @ts-expect-error too lazy to fix this
    camelCaseData[camelCaseKey] = data[key];

    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      // @ts-expect-error too lazy to fix this
      camelCaseData[camelCaseKey] = snakeToCamelCase(data[key]);
    } else if (Array.isArray(data[key])) {
      // @ts-expect-error too lazy to fix this
      camelCaseData[camelCaseKey] = data[key].map((item) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
          return snakeToCamelCase(item);
        }
        return item;
      });
    }
  }
  return camelCaseData;
};
