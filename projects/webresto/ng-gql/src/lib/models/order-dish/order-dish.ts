import type {DiscountType, Dish} from '../dish/dish';
import type {OrderModifier} from '../modifier/modifier';

export interface OrderDish<T extends Dish = Dish> {
  id: number;
  amount: number;
  dish: Partial<T>;
  itemTotal: number;
  itemTotalBeforeDiscount?: number;
  discountTotal: number | null;
  discountType: DiscountType | null;
  discountMessage: string | null;
  discountAmount: number | null;
  comment: string | null;
  totalWeight: number;
  total?: number;
  /** Кто добавил позицию: 'promotion' — акция (например, подарок), гость её не меняет */
  addedBy?: 'user' | 'promotion' | 'core' | 'custom';
  modifiers: Array<Partial<OrderModifier<T>>>;
}
