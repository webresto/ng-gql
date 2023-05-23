import { inject, InjectionToken } from '@angular/core';
import { IMAGE_FRAGMENTS } from "../image";
import { Modifier } from './modifier.gql';
import { ValuesOrBoolean } from '../values-or-boolean';

/**
 * InjectionToken с объектом ValuesOrBoolean<Modifier>, используемым в запросе Modifier с сервера.
 */

export const MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Modifier>>(
  'MODIFIER_FRAGMENTS',
  {
    factory: () => {
      const imageFragments = inject(IMAGE_FRAGMENTS);
      return {
        modifierId: true,
        maxAmount: true,
        minAmount: true,
        defaultAmount: true,
        dish: {
          id: true,
          name: true,
          description: true,
          price: true,
          weight: true,
          balance: true,
          tags: true,
          groupId: true,
          parentGroup: {
            id: true,
            dishesPlaceholder: imageFragments,
          },
          images: imageFragments,
        },
      };
    },
  }
);
