import {WorkTime} from '@webresto/worktime';

export interface PickupPoint {
  id: string | null;
  order: number | null;
  address: string | null;
  title: string | null;
  enable?: boolean | null;
  worktime?: WorkTime[] | null;
  active?: boolean | null;
  phone?: string | null;
}
