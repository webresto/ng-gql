import type { Dish } from '../dish/dish.gql';

export interface OrderModifier<T extends Dish = Dish> {
  id: string;
  amount?: number;
  groupId: string;
  dish: Omit<Partial<T>, 'modifiers'>;
}

export interface Modifier<T extends Dish = Dish> {
  modifierId: string;
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
