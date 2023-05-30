import { Inject, Injectable } from '@angular/core';
import type { ExtraSubscriptionOptions } from 'apollo-angular';
import {
  BehaviorSubject,
  of,
  filter,
  map,
  switchMap,
  mergeWith,
  exhaustMap,
} from 'rxjs';
import type { Observable } from 'rxjs';
import type {
  NgGqlConfig,
  GQLRequestVariables,
  Group,
  PartialGroupNullable,
  ValuesOrBoolean,
  Dish,
  PhoneKnowledge,
  CheckPhoneResponse,
  Navigation,
  NavigationBase,
  NavigationLoader,
  CheckPhoneCodeInput,
  VCriteria,
  Maintenance,
  Phone,
} from '../models';
import { isValue, deepClone } from '@axrl/common';
import {
  NAVIGATION_FRAGMENTS,
  GROUP_FRAGMENTS,
  DISH_FRAGMENTS,
  MAINTENANCE_FRAGMENTS,
} from '../models';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { OperationVariables } from '@apollo/client';
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

  getNgGqlConfig(): NgGqlConfig {
    return deepClone(this.config);
  }

  private _initGroupSlug$ = new BehaviorSubject<SlugAndConcept | null>(null);

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
  private _loadGroups(slug: string, concept: string | 'origin') {
    return this.requestService
      .customQuery$<
        { childGroups: PartialGroupNullable[] },
        'group',
        VCriteria
      >(
        'group',
        {
          childGroups: {
            slug: true,
            id: true,
          },
        },
        {
          criteria: {
            slug,
            concept,
          },
        }
      )
      .pipe(
        map((group) => {
          const array = (<Array<{ childGroups: PartialGroupNullable[] }>>(
            group.group
          )).map((item) => ({ ...item }));
          return {
            concept,
            groups: array.length == 0 ? [] : array[0].childGroups,
          };
        })
      );
  }

  readonly rootGroups$: Observable<{
    concept: string | 'origin';
    groups: PartialGroupNullable[];
  }> = this.storage.navigation.pipe(
    filter(
      (navigationData): navigationData is Navigation[] =>
        !!navigationData &&
        Array.isArray(navigationData) &&
        !!navigationData[0] &&
        'mnemonicId' in navigationData[0]
    ),
    switchMap((navigationData) => {
      const menuItem = navigationData.find(
        (item) => item.mnemonicId === 'menu'
      )!;
      return menuItem.options.behavior?.includes('navigationmenu')
        ? of({
            concept: menuItem.options?.concept ?? 'origin',
            groups: menuItem.navigation_menu.map((item) => ({
              slug: item.groupSlug,
              id: null,
            })),
          })
        : this._loadGroups(
            menuItem.options.initGroupSlug,
            menuItem.options?.concept ?? 'origin'
          );
    }),
    mergeWith(
      this._initGroupSlug$.asObservable().pipe(
        filter(
          (slugAndConcept): slugAndConcept is SlugAndConcept => !!slugAndConcept
        ),
        switchMap((slugAndConcept) =>
          this._loadGroups(slugAndConcept.slug, slugAndConcept.concept)
        )
      )
    )
  );

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

  getMenu$(
    slug: string | string[] | undefined
  ): Observable<Partial<Group>[] | undefined | null> {
    return this.rootGroups$
      .pipe(
        switchMap((rootGroupsData) => {
          const rootGroups = rootGroupsData.groups;
          const nesting = this.config.nesting ?? 2;
          const queryObject: ValuesOrBoolean<Group> = new Array(nesting)
            .fill(nesting)
            .reduce(
              (accumulator: ValuesOrBoolean<Group>) => {
                const item = { ...this.defaultGroupFragments };
                item.childGroups = accumulator;
                return item;
              },
              {
                ...this.defaultGroupFragments,
                childGroups: { ...this.defaultGroupFragments },
              }
            );
          const criteria = isValue(rootGroups[0]?.id)
            ? {
                id: rootGroups.map((rootGroup) => rootGroup.id),
                concept: rootGroupsData.concept,
              }
            : {
                slug: rootGroups.map((rootGroup) => rootGroup.slug),
                concept: rootGroupsData.concept,
              };
          return this.requestService
            .queryAndSubscribe<Group, 'group', 'group', VCriteria>(
              'group',
              'group',
              queryObject,
              'id',
              {
                query: {
                  criteria,
                },
                subscribe: {
                  criteria,
                },
              }
            )
            .pipe(
              map((groups) => ({
                concept: rootGroupsData.concept,
                groups,
              }))
            );
        }),
        switchMap((groupsData) => {
          const groups = groupsData.groups;
          const addGroup = (items: Partial<Group>[], item: Partial<Group>) => {
            if (!items.find((value) => value.id === item.id)) {
              items.push(item);
            }
          };
          const getGroups = (items: Partial<Group>[]) =>
            items.reduce<Partial<Group>[]>((accumulator, current) => {
              addGroup(accumulator, current);
              if (current.childGroups && current.childGroups.length > 0) {
                getGroups(current.childGroups).forEach((child) =>
                  addGroup(accumulator, child)
                );
              }
              return accumulator;
            }, []);
          const allNestingsGroups = getGroups(groups);
          const allNestingsIds = allNestingsGroups.map((group) => group.id);

          return this.requestService
            .queryAndSubscribe<Dish, 'dish', 'dish', VCriteria>(
              'dish',
              'dish',
              this.defaultDishFragments,
              'id',
              {
                query: {
                  criteria: {
                    parentGroup: allNestingsIds,
                    concept: groupsData.concept,
                  },
                },
                subscribe: {
                  criteria: {
                    parentGroup: allNestingsIds,
                    concept: groupsData.concept,
                  },
                },
              }
            )
            .pipe(
              map((data) => {
                const dishes = data.map((dataDish) =>
                  this.addAmountToDish(dataDish)
                );

                this.storage.updateDishes(dishes);
                const groupsById = allNestingsGroups.reduce<{
                  [key: string]: Partial<Group>;
                }>((accumulator, current) => {
                  if (!current.childGroups) {
                    current.childGroups = [];
                  }
                  if (!current.dishes) {
                    current.dishes = [];
                  }
                  if (current.id) {
                    accumulator[current.id] = current;
                  }
                  return accumulator;
                }, {});

                const groupIdsBySlug: {
                  [key: string]: string;
                } = {};

                // Inserting dishes by groups
                for (let dish of dishes) {
                  const groupId = dish.parentGroup?.id || dish.groupId;
                  if (!isValue(groupId)) {
                    continue;
                  }

                  if (!isValue(groupsById[groupId])) {
                    continue;
                  }

                  const groupDishes = groupsById[groupId].dishes;
                  if (isValue(groupDishes)) {
                    const checkDishIndex = groupDishes.findIndex(
                      (item) => item.id === dish.id
                    );
                    if (checkDishIndex === -1) {
                      groupDishes.push(dish);
                    } else {
                      groupDishes[checkDishIndex] = dish;
                    }
                  } else {
                    groupsById[groupId].dishes = [dish];
                  }
                }
                // Create groups hierarchy
                for (let groupId in groupsById) {
                  const group = groupsById[groupId];
                  const parentGroupId = group.parentGroup?.id;
                  groupIdsBySlug[group.slug!] = groupId;
                  if (!parentGroupId) continue;
                  if (!groupsById[parentGroupId]) continue;
                  if (
                    groupsById[parentGroupId].childGroups?.find(
                      (chGroup) => chGroup.id === group.id
                    )
                  )
                    continue;
                  groupsById[parentGroupId].childGroups?.push(group);
                }
                return { groupsById, groupIdsBySlug };
              })
            );
        })
      )
      .pipe(
        map(({ groupsById, groupIdsBySlug }) => {
          if (isValue(slug)) {
            if (typeof slug === 'string') {
              if (!groupIdsBySlug[slug]) {
                return [];
              } else {
                return groupsById[groupIdsBySlug[slug]].childGroups;
              }
            } else {
              if (slug.length == 0) {
                return [];
              } else {
                return slug
                  .map((s) => groupsById[groupIdsBySlug[s]])
                  .sort((g1, g2) => (g1.sortOrder ?? 0) - (g2.sortOrder ?? 0));
              }
            }
          } else {
            return Object.values(groupsById).sort(
              (g1, g2) => (g1.sortOrder ?? 0) - (g2.sortOrder ?? 0)
            );
          }
        })
      );
  }

  getDishes$(id?: string | string[]): Observable<Dish[]> {
    return this.storage.dishes.pipe(
      exhaustMap((dishes) => {
        const ids = typeof id === 'string' ? [id] : id;
        const dishesInStock = dishes.filter((item) =>
          typeof id === 'string' ? item.id === id : id?.includes(item.id)
        );
        if (!ids) {
          return of(dishes);
        } else {
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
                  const result = Array.isArray(loadedDishes.dish)
                    ? loadedDishes.dish
                    : [loadedDishes.dish];
                  dishes.push(...result);
                  this.storage.updateDishes(dishes);
                  return [...dishesInStock, ...result];
                })
              );
          }
        }
      })
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
