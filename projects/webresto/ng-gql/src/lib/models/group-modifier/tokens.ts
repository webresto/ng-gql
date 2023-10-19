import {InjectionToken, inject} from '@angular/core';
import {MODIFIER_FRAGMENTS} from '../modifier';
import {ValuesOrBoolean} from '../values-or-boolean';
import {GroupModifier} from './group-modifier';

/**
 * InjectionToken с объектом ValuesOrBoolean<GroupModifier>, используемым в запросе GroupModifier с сервера.
 */
export const GROUP_MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<GroupModifier>>(
  'GROUP_MODIFIER_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<GroupModifier> => {
      const modifierFragments = inject(MODIFIER_FRAGMENTS);
      return {
        maxAmount: true,
        minAmount: true,
        required: true,
        childModifiers: modifierFragments,
        group: {
          id: true,
          name: true,
        },
      };
    },
  },
);
