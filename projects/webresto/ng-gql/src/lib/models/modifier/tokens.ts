import {inject, InjectionToken} from '@angular/core';
import {IMAGE_FRAGMENTS} from '../image';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Modifier} from './modifier';

/**
 * InjectionToken с объектом ValuesOrBoolean<Modifier>, используемым в запросе Modifier с сервера.
 */

export const MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Modifier>>(
  'MODIFIER_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<Modifier> => {
      const imageFragments = inject(IMAGE_FRAGMENTS);
      return {
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
  },
);
