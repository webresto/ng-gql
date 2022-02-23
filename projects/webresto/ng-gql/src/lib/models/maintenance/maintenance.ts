import type { ValuesOrBoolean } from "../values-or-boolean";

/**
 * Данные для отображения на странице сайта в период его отключения/недоступности.
 */
export interface Maintenance {
  id: string
  title: string
  description: string
  enable: boolean
  worktime: any
  startDate: string
  stopDate: string
  customData: {
    [key: string]: unknown
  } | null
}

export const maintenanceFragment = {
  vOb: <ValuesOrBoolean<Maintenance>> {
    id:true,
    title:true,
    description:true,
    enable:true,
    startDate:true,
    stopDate:true,
    customData:true
  }
}
