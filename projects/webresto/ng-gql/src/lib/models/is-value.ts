/**  Функция-хелпер для проверки, что переданное значение не является null или undefined. 
 * Может пригодиться в ситуациях, где требуется более сложная проверка, чем при использовании optional chaining (оператора "??"), 
 * либо защиты от ложно-положительных срабатываний при проверке наличия значения 
 * Например :
 * ...
 * interface Foo {
 *  value? :number | undefinded
 * }
 * ...
 * const a:Foo = {
 *  value: 0
 * };
 * if (a) {
 *  block_a
 *  } else {
 *  block_b
 *  }.
 * ...
 * В этом примере block_a не будет выполнен, поскольку приведение к типу boolean значения 0 в результате дает false.
 * А проверка isValue(a) - вернет true.
 *  */

export function isValue<T extends any>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}