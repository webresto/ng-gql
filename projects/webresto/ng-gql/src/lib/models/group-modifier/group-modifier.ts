import type {Dish} from '../dish/dish';
import type {Modifier} from '../modifier/modifier';

export interface GroupModifier<T extends Dish = Dish>
  extends Omit<
    Modifier<T>,
    'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'
  > {
  required: boolean;
  childModifiers: Array<Partial<Modifier<T>>>;
  group: Partial<{
    id: string;
    name: string;
  }>;
  totalAmount: number;
}
