import { Image } from '../image/image';
export declare class Modifier {
    modifierId: string;
    maxAmount: number;
    minAmount: number;
    amount?: number;
    defaultAmount: number;
    hideIfDefaultAmount: boolean;
    dish: {
        id: string;
        name: string;
        description: string;
        price: number;
        weight: number;
        balance: number;
        tags: any[];
        images: Image[];
    };
}
//# sourceMappingURL=modifier.d.ts.map