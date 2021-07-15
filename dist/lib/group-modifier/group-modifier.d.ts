import { Modifier } from '../modifier/modifier';
export declare class GroupModifier {
    modifierId: string;
    maxAmount: number;
    minAmount: number;
    required: boolean;
    childModifiers: Modifier[];
    group: {
        id: string;
    };
    totalAmount: number;
}
