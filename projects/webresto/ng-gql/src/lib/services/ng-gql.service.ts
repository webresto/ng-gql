import {Inject, Injectable} from '@angular/core';
import {
  createObservable,
  createSubject,
  deepClone,
  distinctUntilObjectChanged,
  isValue,
} from '@axrl/common';
import {BehaviorSubject, Observable, exhaustMap, filter, map, tap} from 'rxjs';
import type {
  CheckPhoneCodeInput,
  CheckPhoneResponse,
  Dish,
  Group,
  Maintenance,
  NavBarLinkItem,
  NavbarMenuLink,
  Navigation,
  NavigationBase,
  NavigationLoader,
  NavigationsMenuItem,
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
  NG_GQL_CONFIG,
} from '../models';
import {NgGqlStoreService} from './ng-gql-storage.service';
import {RequestService} from './request.service';

@Injectable()
/** Основной сервис для работы с библиотекой. Содержит все необходимые методы для управления сайтом. */
export class NgGqlService {
  private _pendingLoadNavBar = createSubject<boolean>(false);
  private _pendingLoadNavigation = createSubject<boolean>(false);

  constructor(
    private _requestService: RequestService,
    private _storage: NgGqlStoreService,
    @Inject(NG_GQL_CONFIG) private _config: NgGqlConfig,
    @Inject(NAVIGATION_FRAGMENTS)
    private _defaultNavigationFragments: ValuesOrBoolean<Navigation>,
    @Inject(MAINTENANCE_FRAGMENTS)
    private _defaultMaintenanceFragments: ValuesOrBoolean<Maintenance>,
    @Inject(GROUP_FRAGMENTS)
    private _defaultGroupFragments: ValuesOrBoolean<Group>,
    @Inject(DISH_FRAGMENTS) private _defaultDishFragments: ValuesOrBoolean<Dish>,
  ) {}

  getNgGqlConfig(): NgGqlConfig {
    return deepClone(this._config);
  }

  /**
   * @method getNavigation$()
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * @param options - объект NavigationLoader. Обязателен, при использовании нестандартной схемы навигации в приложении.
   * @see @interface NavigationLoader<T>
   */
  getNavigation$<T extends NavigationBase>(options: NavigationLoader<T>): Observable<T[]>;
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
    options?: NavigationLoader<T>,
  ): Observable<T[]> {
    return this._pendingLoadNavigation.asObservable().pipe(
      filter(pending => !pending),
      exhaustMap(() => this._loadNavigation(options)),
    );
  }

  /** Список ссылок для необходимого раздела навигации */
  getNavigationPoints(
    slug: 'header' | 'footer' | 'social' | string,
  ): Observable<NavigationsMenuItem[]> {
    return this.getNavigation$().pipe(
      map(data =>
        (data.find(item => item.mnemonicId == slug)?.navigation_menu || [])
          .filter(
            item =>
              isValue(item.link) && item.active && (!isValue(item.visible) || item.visible == true),
          )
          .map(
            item =>
              <NavigationsMenuItem>{
                label: item.label,
                link:
                  item.link[0] == '/' || item.link.includes('http') ? item.link : `/${item.link}`,
                active: item.active ?? true,
                visible: item.visible ?? true,
                icon: item.icon ? `app-${item.icon.replace('app-', '')}` : undefined,
                groupSlug: item.groupSlug,
              },
          ),
      ),
    );
  }

  /** Возвращает ссылку на страницу, которая будет стартовой для меню */
  getStartMenuSlug(): Observable<[string[], string | undefined]> {
    return this.getNavBarMenu().pipe(
      map(menu => {
        const navbarmenu: NavBarLinkItem[] = menu.map(group => ({
          id: group.id,
          name: group.name,
          icon: group.icon,
          slug: group.slug,
          link: [[`/menu/${group.slug}`], undefined],
        }));

        return navbarmenu[0].link;
      }),
    );
  }

  getMaintenance$(): Observable<Maintenance> {
    return this._requestService
      .queryAndSubscribe('maintenance', 'maintenance', this._defaultMaintenanceFragments, 'id')
      .pipe(
        filter(result => result.length > 0),
        map(res => res[0]),
      );
  }

  /**
   * Внутренний метод, используемый для загрузки основного - "корневого" списка групп.
   * @param slug - init- slug.
   * Либо принимается извне через внутренний поток `initGroupSlug$`, либо формируется на основании данных в массиве Navigation[], загруженном на старте приложения.
   * Чтобы обновлять значение в `initGroupSlug$` используется метод `updateInitGroupSlug`
   * @returns
   */
  getGroup(slug: string, concept: string = 'origin'): Observable<Group> {
    const getIdsFromPartialDish = (dishes?: Array<Partial<Group>>): string[] =>
      dishes?.map(dish => dish.id).filter((id): id is string => isValue(id)) ?? [];

    return this._storage.groups.pipe(
      exhaustMap(groups => {
        const group = groups.find(g => g.slug === slug);
        if (isValue(group)) {
          return createObservable(group);
        } else {
          return this._requestService
            .customQuery$<Group, 'group', VCriteria>('group', this._defaultGroupFragments, {
              criteria: {
                slug,
                concept,
              },
            })
            .pipe(
              map(data => {
                const group = deepClone(Array.isArray(data.group) ? data.group[0] : data.group);

                group.dishesIds = getIdsFromPartialDish(group.dishes);
                group.childGroups.forEach(childGroup => {
                  childGroup.dishesIds = getIdsFromPartialDish(childGroup.dishes);
                });
                groups.push(group);
                this._storage.updateMenuGroups(groups);
                return group;
              }),
            );
        }
      }),
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
      additionalInfo: this._getAdditionalInfo(sourceDish),
      isLoading: sourceDish.isLoading ?? createSubject<boolean>(false),
      modifiers: sourceDish.modifiers
        ? sourceDish.modifiers.map((groupModifier, groupIndex) => ({
            ...groupModifier,
            childModifiers: groupModifier.childModifiers
              ?.filter(childModifier => isValue(childModifier.dish))
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
    return this._getDishes(ids).pipe(distinctUntilObjectChanged());
  }

  getDishBySlug(slug: string): Observable<Dish> {
    return this._getDishes([slug], false).pipe(
      map(dishes => dishes[0]),
      filter((dish): dish is Dish => isValue(dish)),
      distinctUntilObjectChanged(),
    );
  }

  getNavBarMenu(concept?: string, topLevelGroupId?: string): Observable<NavbarMenuLink[]> {
    return this._pendingLoadNavBar.asObservable().pipe(
      filter(pending => !pending),
      exhaustMap(() => this._loadNavBarMenu(concept, topLevelGroupId)),
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
    customvOb?: ValuesOrBoolean<PhoneKnowledge>,
  ): Observable<PhoneKnowledge[]> {
    const phonevOb: ValuesOrBoolean<PhoneKnowledge> = {
      id: true,
      phone: true,
      isFirst: true,
      isConfirm: true,
      codeTime: true,
      confirmCode: true,
    };
    const vOb = customvOb ? {...phonevOb, ...customvOb} : phonevOb;
    return this._requestService
      .customQuery$<PhoneKnowledge, 'isKnownPhone', {phone: Phone}>(
        'isKnownPhone',
        vOb,
        {phone},
        {fieldsTypeMap: new Map([['phone', 'InputPhone!']])},
      )
      .pipe(
        map(data => (Array.isArray(data.isKnownPhone) ? data.isKnownPhone : [data.isKnownPhone])),
      );
  }

  phoneKnowledgeGetCode$(phone: Phone): Observable<CheckPhoneResponse[]> {
    return this._requestService
      .customQuery$<CheckPhoneResponse, 'phoneKnowledgeGetCode', {phone: Phone}>(
        'phoneKnowledgeGetCode',
        {
          type: true,
          title: true,
          message: true,
          confirmed: true,
          firstbuy: true,
        },
        {phone},
        {fieldsTypeMap: new Map([['phone', 'InputPhone!']])},
      )
      .pipe(
        map(data =>
          Array.isArray(data.phoneKnowledgeGetCode)
            ? data.phoneKnowledgeGetCode
            : [data.phoneKnowledgeGetCode],
        ),
      );
  }

  phoneKnowledgeSetCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this._requestService
      .customMutation$<CheckPhoneResponse, 'phoneKnowledgeSetCode', CheckPhoneCodeInput>(
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
            ['phone', 'InputPhone!'],
            ['code', 'String!'],
          ]),
        },
      )
      .pipe(map(result => result.phoneKnowledgeSetCode));
  }

  destroy(): void {
    Object.values(this)
      .filter(
        (property): property is BehaviorSubject<unknown> => property instanceof BehaviorSubject,
      )
      .forEach(property => property.complete());
  }

  private _getDishes(items: string[], isId: boolean = true): Observable<Dish[]> {
    return this._storage.dishes.pipe(
      exhaustMap(dishes => {
        const dishesInStock = dishes.filter(item => items.includes(isId ? item.id : item.slug));

        if (dishesInStock.length == items.length) {
          return createObservable(dishesInStock);
        } else {
          const dishesNotInStock = items.filter(
            item => !dishes.find(dish => item === (isId ? dish.id : dish.slug)),
          );
          const criteriaKey = isId ? 'id' : 'slug';

          return this._requestService
            .customQuery$<Dish, 'dish', VCriteria>('dish', this._defaultDishFragments, {
              criteria: {
                [criteriaKey]: dishesNotInStock,
              },
            })
            .pipe(
              map(loadedDishes => {
                const result = (
                  Array.isArray(loadedDishes.dish) ? loadedDishes.dish : [loadedDishes.dish]
                ).map(dish => this.addAmountToDish(dish));
                dishes.push(...result);
                this._storage.updateDishes(dishes);
                return [...dishesInStock, ...result];
              }),
            );
        }
      }),
    );
  }

  private _getAdditionalInfo(dish: Partial<Dish>): Dish['additionalInfo'] {
    if (
      dish.additionalInfo &&
      typeof dish.additionalInfo == 'string' &&
      dish.additionalInfo.includes('{"')
    ) {
      try {
        return JSON.parse(dish.additionalInfo);
      } catch (error) {
        return dish.additionalInfo;
      }
    } else {
      return dish.additionalInfo;
    }
  }

  private _loadNavigation<T extends NavigationBase = Navigation>(
    options?: NavigationLoader<T>,
  ): Observable<T[]> {
    this._pendingLoadNavigation.next(true);
    return this._storage.navigation.pipe(
      exhaustMap(data => {
        return isValue(data)
          ? createObservable(<T[]>data)
          : this._requestService
              .queryAndSubscribe(
                options?.nameQuery ?? 'navigation',
                options?.nameSubscribe ?? 'navigation',
                options?.queryObject ??
                  <NavigationLoader<T>['queryObject']>this._defaultNavigationFragments,
                options?.uniqueKeyForCompareItem ??
                  <NavigationLoader<T>['uniqueKeyForCompareItem']>'mnemonicId',
              )
              .pipe(
                map(navigationData => {
                  this._storage.updateNavigation(navigationData);
                  return navigationData;
                }),
              );
      }),
      tap(() => this._pendingLoadNavigation.next(false)),
    );
  }

  private _loadNavBarMenu(
    concept?: string,
    topLevelGroupId?: string,
  ): Observable<NavbarMenuLink[]> {
    this._pendingLoadNavBar.next(true);
    return this._storage.navBarMenus.pipe(
      exhaustMap(items => {
        const item = items.find(
          element => element.concept === concept && element.topLevelGroupId === topLevelGroupId,
        );
        return isValue(item)
          ? createObservable(item.menu)
          : this._requestService
              .customQuery$<NavbarMenuLink, 'menu'>(
                'menu',
                {
                  name: true,
                  slug: true,
                  id: true,
                  icon: true,
                },
                {
                  concept,
                },
              )
              .pipe(
                map(data => {
                  const rawResult = Array.isArray(data.menu) ? data.menu : [data.menu];
                  const result = rawResult.reduce<NavbarMenuLink[]>(this._addIfItemNotExist, []);
                  const newItems = [...items, {concept, topLevelGroupId, menu: result}];

                  this._storage.updateNavBarMenus(newItems);

                  return result;
                }),
              );
      }),
      tap(() => this._pendingLoadNavBar.next(false)),
    );
  }

  private _addIfItemNotExist = <T extends {id: string | number}>(
    accumulator: T[],
    current: T,
  ): T[] => {
    const isAdded = accumulator.find(item => item.id === current.id);

    if (!isValue(isAdded)) {
      accumulator.push(current);
    }

    return accumulator;
  };
}
