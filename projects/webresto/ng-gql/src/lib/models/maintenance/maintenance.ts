import type { BaseModelWithCustomData } from "../base/base-model-with-custom-data";

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
