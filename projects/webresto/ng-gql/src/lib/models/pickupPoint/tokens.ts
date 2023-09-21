import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {PickupPoint} from './pickupPoint';

/**
 * InjectionToken с объектом ValuesOrBoolean<PickupPoint>, используемым в запросе PickupPoint с сервера.
 */
export const PICKUP_POINT_FRAGMENTS = new InjectionToken<ValuesOrBoolean<PickupPoint>>(
  'PICKUP_POINT_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<PickupPoint> => {
      return {
        id: true,
        address: true,
        title: true,
        order: true,
        enable: true,
        phone: true,
      };
    },
  },
);
