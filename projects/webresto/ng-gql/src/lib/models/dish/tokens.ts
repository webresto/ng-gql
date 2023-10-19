import {InjectionToken, inject} from '@angular/core';
import {GROUP_MODIFIER_FRAGMENTS} from '../group-modifier';
import {IMAGE_FRAGMENTS} from '../image';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Dish} from './dish';
/**
 * InjectionToken с объектом ValuesOrBoolean<Dish>, используемым в запросе блюд.
 */
export const DISH_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Dish>>('DISH_FRAGMENTS', {
  factory: () => {
    const imageFragments = inject(IMAGE_FRAGMENTS);
    const groupModifierFragments = inject(GROUP_MODIFIER_FRAGMENTS);
    return {
      customData: true,
      id: true,
      name: true,
      description: true,
      price: true,
      weight: true,
      balance: true,
      sortOrder: true,
      tags: true,
      additionalInfo: true,
      carbohydrateAmount: true,
      carbohydrateFullAmount: true,
      energyAmount: true,
      discountAmount: true,
      discountType: true,
      energyFullAmount: true,
      fatAmount: true,
      fatFullAmount: true,
      fiberAmount: true,
      fiberFullAmount: true,
      measureUnit: true,
      images: imageFragments,
      modifiers: groupModifierFragments,
      groupId: true,
      parentGroup: {
        id: true,
        dishesPlaceholder: imageFragments,
      },
    };
  },
});
