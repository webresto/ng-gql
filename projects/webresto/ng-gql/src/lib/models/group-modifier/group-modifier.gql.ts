import { gql } from 'apollo-angular';
import { ModifierFragments } from '../modifier/modifier.gql';
import type { Modifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface GroupModifier extends Exclude<Modifier, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Modifier[];
	group: {
		id: string;
		name: string;
	}
	totalAmount: number;
}

export const GroupModifierFragments = {
	groupModifier: gql`
		fragment GroupModifierFragment on GroupModifier {
			modifierId
			maxAmount
			minAmount
			required
			childModifiers {
				...ModifierFragment
			}
			group {
				id
				name
			}
		}
		${ModifierFragments.modifier}
	`, vOb: <ValuesOrBoolean<GroupModifier>>{
		modifierId: true,
		maxAmount: true,
		minAmount: true,
		required: true,
		childModifiers: ModifierFragments.vOb,
		group: {
			id: true,
			name: true,
		}
	}
};

