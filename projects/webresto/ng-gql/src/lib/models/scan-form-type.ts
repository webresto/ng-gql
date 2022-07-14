import type { FormGroup, FormArray, FormControl } from '@angular/forms';
import type { Observable } from 'rxjs';

/** @internal */
type StringKeys<T> = { [ K in keyof T ]: K extends string ? T[ K ] extends Observable<unknown> ? never : K : never; }[ keyof T ];

/**
 * @internal
 * Упрощенная запись для типа объекта FormGroup, образованного из типа T.
 */
type FormGroupType<T> = FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }>;

/**
 * Универсальный тип-утилита.
 * Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
 * ВАЖНО!
 * Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
 * Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) соответствующий элемент формы не создается.
 * ScanFormType это также учитывает.
 */
export type ScanFormType<T> = T extends FormGroup | FormControl | FormArray ?
  T :
  T extends null | undefined ?
  never :
  T extends Array<infer U> ?
  FormArray<ScanFormType<U>> :
  T extends (string | number | boolean | symbol | null | undefined) ?
  FormControl<T> :
  FormGroupType<T>;