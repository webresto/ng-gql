import { ModifierFragments } from '../modifier/modifier.gql';
import type { Modifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface GroupModifier extends Exclude<Modifier, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Modifier[];
	group: {
		id: string;
		name: string;
	};
	totalAmount: number;
}

export const GroupModifierFragments = {
	vOb: <ValuesOrBoolean<GroupModifier>> {
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

