import type { Modifier } from '../modifier/modifier';

export interface GroupModifier extends Exclude<Modifier, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Modifier[];
	group: {
		id: string;
		name: string;
	}
	totalAmount: number;
}
