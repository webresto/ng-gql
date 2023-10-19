import {InjectionToken, inject} from '@angular/core';
import {IMAGE_FRAGMENTS} from '../image';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Group} from './group';

/**
 * InjectionToken с объектом ValuesOrBoolean<Group>, используемым в запросе Group с сервера.
 */
export const GROUP_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Group>>('GROUP_FRAGMENTS', {
  factory: () => {
    const imageFragments = inject(IMAGE_FRAGMENTS);
    const groupFragment: ValuesOrBoolean<Group> = {
      id: true,
      description: true,
      name: true,
      sortOrder: true,
      visible: true,
      slug: true,
      discount: true,
      dishesPlaceholder: imageFragments,
      dishes: {
        id: true,
      },
      parentGroup: {
        id: true,
        dishesPlaceholder: imageFragments,
      },
    };
    return {
      ...groupFragment,
      childGroups: groupFragment,
    };
  },
});
