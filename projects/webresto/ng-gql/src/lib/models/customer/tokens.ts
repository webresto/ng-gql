import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Phone} from './customer';

/**
 * InjectionToken с объектом ValuesOrBoolean<Phone>.
 */
export const PHONE_FRAGMENT = new InjectionToken<ValuesOrBoolean<Phone>>('PHONE_FRAGMENTS', {
  factory: (): ValuesOrBoolean<Phone> => ({
    number: true,
    code: true,
    additionalNumber: true,
  }),
});
