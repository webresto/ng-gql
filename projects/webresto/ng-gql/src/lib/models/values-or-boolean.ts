export type ValuesOrBoolean<T> = {
  [K in keyof Partial<T>]: boolean | (
    T[K] extends string | number | bigint | symbol | boolean | undefined | null ?
    boolean :
    T[K] extends (Array<infer U> | undefined | null) ?
    ValuesOrBoolean<U> :
    ValuesOrBoolean<T[K]>
  )
};
