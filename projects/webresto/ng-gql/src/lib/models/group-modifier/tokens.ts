import { InjectionToken, inject } from "@angular/core";
import { ValuesOrBoolean } from "../values-or-boolean";
import { GroupModifier } from "./group-modifier.gql";
import { MODIFIER_FRAGMENTS } from "../modifier";

/**
 * InjectionToken с объектом ValuesOrBoolean<GroupModifier>, используемым в запросе GroupModifier с сервера.
 */
export const GROUP_MODIFIER_FRAGMENTS = new InjectionToken<
  ValuesOrBoolean<GroupModifier>
>('GROUP_MODIFIER_FRAGMENTS', {
  factory: () => {
    const modifierFragments = inject(MODIFIER_FRAGMENTS);
    return {
      modifierId: true,
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
});