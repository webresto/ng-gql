import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Navigation} from './navigation';

/**
 * InjectionToken с объектом ValuesOrBoolean<Navigation>, используемым в запросе Navigation с сервера.
 */
export const NAVIGATION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Navigation>>(
  'NAVIGATION_FRAGMENTS',
  {
    factory: () => ({
      mnemonicId: true,
      description: true,
      options: true,
      id: true,
      navigation_menu: true,
    }),
  },
);
