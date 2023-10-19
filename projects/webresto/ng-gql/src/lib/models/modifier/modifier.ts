import type {Dish} from '../dish/dish';

export interface OrderModifier<T extends Dish = Dish> {
  id: string;
  amount?: number;
  groupId: string;
  dish: Omit<Partial<T>, 'modifiers'>;
}

export interface Modifier<T extends Dish = Dish> {
  groupId?: string;
  maxAmount: number;
  minAmount: number;
  amount?: number;
  defaultAmount: number;
  dish: Pick<
    T,
    | 'id'
    | 'additionalInfo'
    | 'name'
    | 'description'
    | 'oldPrice'
    | 'price'
    | 'weight'
    | 'balance'
    | 'tags'
    | 'groupId'
    | 'parentGroup'
    | 'images'
  >;
}
