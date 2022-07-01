import { InjectionToken } from '@angular/core';
import type { BaseModelWithCustomData } from "../base/base-model-with-custom-data";
import type { ValuesOrBoolean } from "../values-or-boolean";

/**
 * Данные для отображения на странице сайта в период его отключения/недоступности.
 */
export interface Maintenance extends BaseModelWithCustomData {
  id: string;
  title: string;
  description: string;
  enable: boolean;
  worktime: any;
  startDate: string;
  stopDate: string;
}

export const maintenanceFragments: ValuesOrBoolean<Maintenance> = {
  id: true,
  title: true,
  description: true,
  enable: true,
  startDate: true,
  stopDate: true,
  customData: true
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Maintenance>, используемым в запросе Maintenance с сервера.
 */
export const MAINTENANCE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Maintenance>>(
  'MAINTENANCE_FRAGMENTS', {
  providedIn: 'root',
  factory: () => ({ ...maintenanceFragments })
});