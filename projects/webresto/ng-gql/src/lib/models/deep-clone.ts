import { isValue } from './is-value';

type ArrayElement<T> = T extends Array<infer U> ? U : never;

/**
 * @function deepClone()
 * Функция для "глубокого" рекурсивного клонирования любых объектов
 * @param source - объект, который требуется скопировать
 * @returns полная копия объекта объекта, полученного в качестве аргумента
 */
export function deepClone<T extends unknown>(source: T): T {
  return Array.isArray(source) ?
    <T> source.map(
      (sourceItem: ArrayElement<T>) => deepClone<ArrayElement<T>>(sourceItem)
    ) :
    !isValue(source) ?
      source :
      typeof source === 'object' ?
        (<(keyof T)[]> Object.keys(<Object> source)).reduce<T>(
          (accumulator, current) => {

            accumulator[ current ] = deepClone(source[ current ]);

            return accumulator;
          }, <T> {}
        ) :
        source;
}