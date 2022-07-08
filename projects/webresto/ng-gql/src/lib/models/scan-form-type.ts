import type { FormGroup, FormArray, FormControl } from '@angular/forms';

/** @private */
export type ScanFormType<T> = T extends FormGroup<infer U> ?
  FormGroup<U> :
  T extends FormArray<infer U> ?
  FormArray<U> :
  T extends FormControl<infer U> ?
  FormControl<U> :
  T extends Array<infer U> ?
  FormArray<ScanFormType<U>> :
  T extends null | undefined ?
  never :
  T extends (string | number | boolean | symbol | null | undefined) ? FormControl<T> :
  FormGroup<{ [ K in (keyof T & string) ]: ScanFormType<T[ K ]>; }>;