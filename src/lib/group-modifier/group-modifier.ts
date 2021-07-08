import { Modifier } from '../modifier/modifier';

export class GroupModifier {
	modifierId: string;
	maxAmount: number;
	minAmount: number;
	required: boolean;
	childModifiers: Modifier[];
	group: { id:string }
	totalAmount: number = 0;
}
