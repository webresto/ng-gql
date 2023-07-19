import { Inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client';
import { createSubject, deepClone, isValue } from '@axrl/common';
import type { ExtraSubscriptionOptions } from 'apollo-angular';
import type { Observable } from 'rxjs';
import { BehaviorSubject, exhaustMap, filter, map, of, tap } from 'rxjs';
import type {
  CheckPhoneCodeInput,
  CheckPhoneResponse,
  Dish,
  GQLRequestVariables,
  Group,
  Maintenance,
  NavbarMenuLink,
  Navigation,
  NavigationBase,
  NavigationLoader,
  NgGqlConfig,
  Phone,
  PhoneKnowledge,
  VCriteria,
  ValuesOrBoolean,
} from '../models';
import {
  DISH_FRAGMENTS,
  GROUP_FRAGMENTS,
  MAINTENANCE_FRAGMENTS,
  NAVIGATION_FRAGMENTS,
} from '../models';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { QueryGenerationParam, RequestService } from './request.service';

/** @internal */
interface SlugAndConcept {
  slug: string;
  concept: string | 'origin';
}

@Injectable()
/** Основной сервис для работы с библиотекой. Содержит все необходимые методы для управления сайтом. */
export class NgGqlService {
  constructor(
    private requestService: RequestService,
    private storage: NgGqlStorageService,
    @Inject('NG_GQL_CONFIG') private config: NgGqlConfig,
    @Inject(NAVIGATION_FRAGMENTS)
    private defaultNavigationFragments: ValuesOrBoolean<Navigation>,
    @Inject(MAINTENANCE_FRAGMENTS)
    private defaultMaintenanceFragments: ValuesOrBoolean<Maintenance>,
    @Inject(GROUP_FRAGMENTS)
    private defaultGroupFragments: ValuesOrBoolean<Group>,
    @Inject(DISH_FRAGMENTS) private defaultDishFragments: ValuesOrBoolean<Dish>
  ) {}

  private _pendingLoadNavBar = createSubject<boolean>(false);
  private _pendingLoadNavigation = createSubject<boolean>(false);

  getNgGqlConfig(): NgGqlConfig {
    return deepClone(this.config);
  }

  private _initGroupSlug$ = createSubject<SlugAndConcept | null>(null);

  updateInitGroupSlug(initGroupSlug: string, concept: string | 'origin') {
    this._initGroupSlug$.next({
      slug: initGroupSlug,
      concept,
    });
  }

  /**
   * @method getNavigation$()
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * @param options - объект NavigationLoader. Обязателен, при использовании нестандартной схемы навигации в приложении.
   * @see @interface NavigationLoader<T>
   */
  getNavigation$<T extends NavigationBase>(
    options: NavigationLoader<T>
  ): Observable<T[]>;

  /**
   * @method getNavigation$()
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * Если приложение использует стандартную механику навигации, параметр `options` - не требуется.
   */
  getNavigation$(): Observable<Navigation[]>;

  /**
   * @method getNavigation$()
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * Если приложение использует стандартную механику навигации, параметр `options` - не требуется.
   * Если приложение использует нестандартную механику навигации, параметр `options` - обязательный.
   * @param options - объект NavigationLoader.
   * Обязателен, при использовании нестандартной схемы навигации в приложении.
   * @see @interface NavigationLoader<T>
   */
  getNavigation$<T extends NavigationBase = Navigation>(
    options?: NavigationLoader<T>
  ): Observable<T[]> {
    return this.requestService
      .queryAndSubscribe(
        options?.nameQuery ?? 'navigation',
        options?.nameSubscribe ?? 'navigation',
        options?.queryObject ??
          <NavigationLoader<T>['queryObject']>this.defaultNavigationFragments,
        options?.uniqueKeyForCompareItem ??
          <NavigationLoader<T>['uniqueKeyForCompareItem']>'mnemonicId'
      )
      .pipe(
        map((navigationData) => {
          this.storage.updateNavigation(navigationData);
          return navigationData;
        })
      );
  }

  getMaintenance$(): Observable<Maintenance> {
    return this.requestService
      .queryAndSubscribe(
        'maintenance',
        'maintenance',
        this.defaultMaintenanceFragments,
        'id'
      )
      .pipe(
        filter((result) => result.length > 0),
        map((res) => res[0])
      );
  }

  /**
   * Внутренний метод, используемый для загрузки основного - "корневого" списка групп.
   * @param slug - init- slug.
   * Либо принимается извне через внутренний поток `initGroupSlug$`, либо формируется на основании данных в массиве Navigation[], загруженном на старте приложения.
   * Чтобы обновлять значение в `initGroupSlug$` используется метод `updateInitGroupSlug`
   * @returns
   */
  getGroup(slug: string, concept: string = 'origin') {
    const getIdsFromPartialDish = (dishes?: Partial<Group>[]) =>
      dishes
        ?.map((dish) => dish.id)
        .filter((id): id is string => isValue(id)) ?? [];

    return this.storage.groups.pipe(
      exhaustMap((groups) => {
        const group = groups.find((g) => g.slug === slug);
        if (isValue(group)) {
          return of(group);
        } else {
          return this.requestService
            .customQuery$<Group, 'group', VCriteria>(
              'group',
              this.defaultGroupFragments,
              {
                criteria: {
                  slug,
                  concept,
                },
              }
            )
            .pipe(
              map((data) => {
                const group = deepClone(
                  Array.isArray(data.group) ? data.group[0] : data.group
                );

                group.dishesIds = getIdsFromPartialDish(group.dishes);
                group.childGroups.forEach((childGroup) => {
                  childGroup.dishesIds = getIdsFromPartialDish(
                    childGroup.dishes
                  );
                });
                groups.push(group);
                this.storage.updateMenuGroups(groups);
                return group;
              })
            );
        }
      })
    );
  }

  /**
   * @method addAmountToDish()
   * Метод-хелпер, используемый для добавления модификаторам блюда параметра amount и установки ему значения, в случае, если они у него имеются.
   * @param sourceDish - объект с исходными данными блюда.
   * @returns новый, дополненный объект с данными блюда.
   */
  addAmountToDish(sourceDish: Dish): Dish {
    return {
      ...sourceDish,
      modifiers: sourceDish.modifiers
        ? sourceDish.modifiers.map((groupModifier, groupIndex) => ({
            ...groupModifier,
            childModifiers: groupModifier.childModifiers
              ?.filter((childModifier) => isValue(childModifier.dish))
              .map((childModifier, childIndex) => ({
                ...childModifier,
                amount:
                  groupIndex === 0 &&
                  childIndex === 0 &&
                  groupModifier.childModifiers?.length === 2 &&
                  groupModifier.minAmount === 1 &&
                  groupModifier.maxAmount === 1
                    ? 1
                    : childModifier.defaultAmount ?? 0,
              })),
          }))
        : [],
    };
  }

  getDishes$(ids: string[]): Observable<Dish[]> {
    return this.storage.dishes.pipe(
      exhaustMap((dishes) => {
        const dishesInStock = dishes.filter((item) => ids.includes(item.id));

        if (dishesInStock.length == ids.length) {
          return of(dishesInStock);
        } else {
          const dishesNotInStock = ids.filter(
            (dishId) => !dishes.find((dish) => dish.id === dishId)
          );
          return this.requestService
            .customQuery$<Dish, 'dish', VCriteria>(
              'dish',
              this.defaultDishFragments,
              {
                criteria: {
                  id: dishesNotInStock,
                },
              }
            )
            .pipe(
              map((loadedDishes) => {
                const result = (
                  Array.isArray(loadedDishes.dish)
                    ? loadedDishes.dish
                    : [loadedDishes.dish]
                ).map((dish) => this.addAmountToDish(dish));
                dishes.push(...result);
                this.storage.updateDishes(dishes);
                return [...dishesInStock, ...result];
              })
            );
        }
      })
    );
  }

  getNavBarMenu(
    concept?: string,
    topLevelGroupId?: string
  ): Observable<NavbarMenuLink[]> {
    return this._pendingLoadNavBar.asObservable().pipe(
      filter((pending) => !pending),
      exhaustMap(() => this._loadNavBarMenu(concept, topLevelGroupId))
    );
  }

  private _loadNavBarMenu(concept?: string, topLevelGroupId?: string) {
    this._pendingLoadNavBar.next(true);
    return this.storage.navBarMenus.pipe(
      exhaustMap((items) => {
        const item = items.find(
          (element) =>
            element.concept === concept &&
            element.topLevelGroupId === topLevelGroupId
        );
        return isValue(item)
          ? of(item.menu)
          : this.requestService
              .customQuery$<NavbarMenuLink, 'menu'>('menu', {
                name: true,
                slug: true,
                id: true,
                icon: true,
              })
              .pipe(
                map((data) => {
                  const result = Array.isArray(data.menu)
                    ? data.menu
                    : [data.menu];
                  const newItems = [
                    ...items,
                    { concept, topLevelGroupId, menu: result },
                  ];
                  this.storage.updateNavBarMenus(newItems);
                  return result;
                })
              );
      }),
      tap( () => this._pendingLoadNavBar.next(false))
    );
  }

  /**
   * @method isKnownPhone$
   * Проверяет переданный номер телефона на "знакомость".
   * @param phone - Объект с данными номера телефона.
   * @returns
   */
  isKnownPhone$(
    phone: Phone,
    customvOb?: ValuesOrBoolean<PhoneKnowledge>
  ): Observable<PhoneKnowledge[]> {
    const phonevOb: ValuesOrBoolean<PhoneKnowledge> = {
      id: true,
      phone: true,
      isFirst: true,
      isConfirm: true,
      codeTime: true,
      confirmCode: true,
    };
    const vOb = customvOb ? { ...phonevOb, ...customvOb } : phonevOb;
    return this.requestService
      .customQuery$<PhoneKnowledge, 'isKnownPhone', { phone: Phone }>(
        'isKnownPhone',
        vOb,
        { phone },
        { fieldsTypeMap: new Map([['phone', 'Phone!']]) }
      )
      .pipe(
        map((data) =>
          Array.isArray(data.isKnownPhone)
            ? data.isKnownPhone
            : [data.isKnownPhone]
        )
      );
  }

  phoneKnowledgeGetCode$(phone: Phone): Observable<CheckPhoneResponse[]> {
    return this.requestService
      .customQuery$<
        CheckPhoneResponse,
        'phoneKnowledgeGetCode',
        { phone: Phone }
      >(
        'phoneKnowledgeGetCode',
        {
          type: true,
          title: true,
          message: true,
          confirmed: true,
          firstbuy: true,
        },
        { phone },
        { fieldsTypeMap: new Map([['phone', 'Phone!']]) }
      )
      .pipe(
        map((data) =>
          Array.isArray(data.phoneKnowledgeGetCode)
            ? data.phoneKnowledgeGetCode
            : [data.phoneKnowledgeGetCode]
        )
      );
  }

  phoneKnowledgeSetCode$(
    data: CheckPhoneCodeInput
  ): Observable<CheckPhoneResponse> {
    return this.requestService
      .customMutation$<
        CheckPhoneResponse,
        'phoneKnowledgeSetCode',
        CheckPhoneCodeInput
      >(
        'phoneKnowledgeSetCode',
        {
          type: true,
          title: true,
          message: true,
          confirmed: true,
          firstbuy: true,
        },
        data,
        {
          fieldsTypeMap: new Map([
            ['phone', 'Phone!'],
            ['code', 'String!'],
          ]),
        }
      )
      .pipe(map((result) => result.phoneKnowledgeSetCode));
  }

  destroy() {
    Object.values(this)
      .filter(
        (property): property is BehaviorSubject<unknown> =>
          property instanceof BehaviorSubject
      )
      .forEach((property) => property.complete());
  }

  /** @deprecated. Use RequestService methods instead */
  customQuery$<
    T extends {},
    N extends `${string}`,
    V extends OperationVariables = GQLRequestVariables
  >(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V>
  ): Observable<Record<N, T | T[]>> {
    return this.requestService.customQuery$(
      name,
      queryObject,
      variables,
      paramOptions
    );
  }

  /** @deprecated. Use RequestService methods instead */
  customMutation$<T extends {}, N extends `${string}`, V = GQLRequestVariables>(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables: V,
    paramOptions?: QueryGenerationParam<V>
  ): Observable<Record<N, T>> {
    return this.requestService.customMutation$(
      name,
      queryObject,
      variables,
      paramOptions
    );
  }

  /** @deprecated. Use RequestService methods instead */
  customSubscribe$<
    T extends {},
    N extends `${string}`,
    V = GQLRequestVariables
  >(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V>,
    extra?: ExtraSubscriptionOptions
  ): Observable<Record<N, T>[N]> {
    return this.requestService.customSubscribe$(
      name,
      queryObject,
      variables,
      paramOptions,
      extra
    );
  }

  /** @deprecated. Use RequestService methods instead */
  queryAndSubscribe<
    T extends {},
    NQuery extends `${string}`,
    NSubscribe extends `${string}`,
    VQ extends OperationVariables = Exclude<
      GQLRequestVariables,
      'query' | 'subscribe'
    >,
    VS = Exclude<GQLRequestVariables, 'query' | 'subscribe'>
  >(
    nameQuery: NQuery,
    nameSubscribe: NSubscribe,
    queryObject: ValuesOrBoolean<T>,
    uniqueKeyForCompareItem: keyof T,
    variables?: {
      query?: VQ;
      subscribe?: VS;
    },
    paramOptions?: {
      query?: QueryGenerationParam<VQ>;
      subscribe?: QueryGenerationParam<VS>;
    }
  ): Observable<T[]> {
    return this.requestService.queryAndSubscribe(
      nameQuery,
      nameSubscribe,
      queryObject,
      uniqueKeyForCompareItem,
      variables,
      paramOptions
    );
  }
}
