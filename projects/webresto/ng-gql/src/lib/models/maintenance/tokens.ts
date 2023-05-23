import { InjectionToken } from '@angular/core';
import { ValuesOrBoolean } from '../values-or-boolean';
import { Maintenance } from './maintenance';

/**
 * InjectionToken с объектом ValuesOrBoolean<Maintenance>, используемым в запросе Maintenance с сервера.
 */

export const MAINTENANCE_FRAGMENTS = new InjectionToken<
  ValuesOrBoolean<Maintenance>
>('MAINTENANCE_FRAGMENTS', {
  factory: () => ({
    id: true,
    title: true,
    description: true,
    enable: true,
    startDate: true,
    stopDate: true,
    customData: true,
  }),
});
