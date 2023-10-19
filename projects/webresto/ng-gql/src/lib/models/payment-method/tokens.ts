import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {PaymentMethod} from './payment-method';

/**
 * InjectionToken с объектом ValuesOrBoolean<PaymentMethod>, используемым в запросе PaymentMethod с сервера.
 */
export const PAYMENT_METHOD_FRAGMENTS = new InjectionToken<ValuesOrBoolean<PaymentMethod>>(
  'PAYMENT_METHOD_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<PaymentMethod> => ({
      ...{
        id: true,
        type: true,
        title: true,
        description: true,
        isCash: true,
        adapter: true,
        sortOrder: true,
        enable: true,
        customData: true,
      },
    }),
  },
);
