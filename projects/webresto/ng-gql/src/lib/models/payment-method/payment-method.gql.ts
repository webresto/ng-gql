import type {BaseModelWithCustomData} from '../base/base-model-with-custom-data';

export interface PaymentMethod extends BaseModelWithCustomData {
  id: string;
  type: string;
  title: string;
  description: string;
  isCash: boolean;
  adapter: string;
  sortOrder: number;
  enable: boolean;
}
