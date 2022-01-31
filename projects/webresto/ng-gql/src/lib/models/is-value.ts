export function isValue<T extends any>(value:T):value is NonNullable<T> {
  return value !== null && value !== undefined;
}