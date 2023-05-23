import { InjectionToken } from '@angular/core';
import { ValuesOrBoolean } from '../values-or-boolean';
import { Image } from './image.gql';

/**
 * InjectionToken с объектом ValuesOrBoolean<Image>, используемым в запросе Image с сервера.
 */

export const IMAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Image>>(
  'IMAGE_FRAGMENTS',
  {
    factory: () => ({ id: true, uploadDate: true, images: true }),
  }
);
