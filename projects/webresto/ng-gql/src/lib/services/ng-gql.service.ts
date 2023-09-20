import {Inject, Injectable} from '@angular/core';
import {createSubject, deepClone, isValue} from '@axrl/common';
import type {Observable} from 'rxjs';
import {BehaviorSubject, exhaustMap, filter, map, of, tap} from 'rxjs';
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
    private requestService: RequestService,
    private storage: NgGqlStoreService,
    @Inject(NG_GQL_CONFIG) private config: NgGqlConfig,
    @Inject(NAVIGATION_FRAGMENTS)
    private defaultNavigationFragments: ValuesOrBoolean<Navigation>,
    @Inject(MAINTENANCE_FRAGMENTS)
    private defaultMaintenanceFragments: ValuesOrBoolean<Maintenance>,
    @Inject(GROUP_FRAGMENTS)
    private defaultGroupFragments: ValuesOrBoolean<Group>,
    @Inject(DISH_FRAGMENTS) private defaultDishFragments: ValuesOrBoolean<Dish>,
  ) {}

  getNgGqlConfig(): NgGqlConfig {
    return deepClone(this.config);
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
          link: [[`/menu/${group.slug}`], undefined],
        }));

        return navbarmenu[0].link;
      }),
    );
  }

  getMaintenance$(): Observable<Maintenance> {
    return this.requestService
      .queryAndSubscribe('maintenance', 'maintenance', this.defaultMaintenanceFragments, 'id')
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

    return this.storage.groups.pipe(
      exhaustMap(groups => {
        const group = groups.find(g => g.slug === slug);
        if (isValue(group)) {
          return of(group);
        } else {
          return this.requestService
            .customQuery$<Group, 'group', VCriteria>('group', this.defaultGroupFragments, {
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
                this.storage.updateMenuGroups(groups);
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
      additionalInfo: this.getAdditionalInfo(sourceDish),
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
    return this.storage.dishes.pipe(
      exhaustMap(dishes => {
        const dishesInStock = dishes.filter(item => ids.includes(item.id));

        if (dishesInStock.length == ids.length) {
          return of(dishesInStock);
        } else {
          const dishesNotInStock = ids.filter(dishId => !dishes.find(dish => dish.id === dishId));
          return this.requestService
            .customQuery$<Dish, 'dish', VCriteria>('dish', this.defaultDishFragments, {
              criteria: {
                id: dishesNotInStock,
              },
            })
            .pipe(
              map(loadedDishes => {
                const result = (
                  Array.isArray(loadedDishes.dish) ? loadedDishes.dish : [loadedDishes.dish]
                ).map(dish => this.addAmountToDish(dish));
                dishes.push(...result);
                this.storage.updateDishes(dishes);
                return [...dishesInStock, ...result];
              }),
            );
        }
      }),
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
    return this.requestService
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
    return this.requestService
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
    return this.requestService
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

  private getAdditionalInfo(dish: Partial<Dish>): Dish['additionalInfo'] {
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
    return this.storage.navigation.pipe(
      exhaustMap(data => {
        return isValue(data)
          ? of(<T[]>data)
          : this.requestService
              .queryAndSubscribe(
                options?.nameQuery ?? 'navigation',
                options?.nameSubscribe ?? 'navigation',
                options?.queryObject ??
                  <NavigationLoader<T>['queryObject']>this.defaultNavigationFragments,
                options?.uniqueKeyForCompareItem ??
                  <NavigationLoader<T>['uniqueKeyForCompareItem']>'mnemonicId',
              )
              .pipe(
                map(navigationData => {
                  this.storage.updateNavigation(navigationData);
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
    return this.storage.navBarMenus.pipe(
      exhaustMap(items => {
        const item = items.find(
          element => element.concept === concept && element.topLevelGroupId === topLevelGroupId,
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
                map(data => {
                  const result = Array.isArray(data.menu) ? data.menu : [data.menu];
                  const newItems = [...items, {concept, topLevelGroupId, menu: result}];
                  this.storage.updateNavBarMenus(newItems);
                  return result;
                }),
              );
      }),
      tap(() => this._pendingLoadNavBar.next(false)),
    );
  }
}
