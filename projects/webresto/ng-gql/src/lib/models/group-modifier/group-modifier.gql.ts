import { modifierFragments } from '../modifier/modifier.gql';
import type { Modifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import {  InjectionToken } from '@angular/core';

export interface GroupModifier extends Exclude<Modifier, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Modifier[];
	group: {
		id: string;
		name: string;
	};
	totalAmount: number;
}

export const groupModifierFragments: ValuesOrBoolean<GroupModifier> = {
	modifierId: true,
	maxAmount: true,
	minAmount: true,
	required: true,
	childModifiers: modifierFragments,
	group: {
		id: true,
		name: true,
	}
}

/**
 * InjectionToken с объектом ValuesOrBoolean<GroupModifier>, используемым в запросе GroupModifier с сервера.
 */
export const GROUP_MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<GroupModifier>>(
	'GROUP_MODIFIER_FRAGMENTS', {
	providedIn: 'root',
		factory: () => (groupModifierFragments)
});

