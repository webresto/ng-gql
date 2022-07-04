import { Inject, Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import type { ExtraSubscriptionOptions } from 'apollo-angular';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, shareReplay, startWith, mergeWith, distinctUntilChanged } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import type {
  NgGqlConfig, GQLRequestVariables, Group, ValuesOrBoolean,
  Dish, PhoneKnowledge, CheckPhoneResponse, Navigation, NavigationBase, NavigationLoader,
  CheckPhoneCodeInput, VCriteria, Maintenance, Phone
} from '../models';
import { isValue, isEqualItems, deepClone, generateQueryString, NAVIGATION_FRAGMENTS, MAINTENANCE_FRAGMENTS, GROUP_FRAGMENTS, DISH_FRAGMENTS } from '../models';
import { ApolloService } from './apollo.service';

interface SlugAndConcept {
  slug: string,
  concept: string | 'origin';
}

type PartialGroupNullable = Pick<Group, 'slug'> & {
  id: string | null;
};

/**
 * Объект настройки генерации части строки запроса с описанием типов параметров операции.
 */
export type QueryGenerationParam<V> = {
  /**
   * Необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * (например у параметра указан тип String!, а не String).
   * ВАЖНО! КРОМЕ ключей, для которых названия типов передаются в `fieldsTypeMap`.
   */
  requiredFields?: (keyof V)[];

  /**
   * Необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строки-названия соответствующих им типов, определенных в схеме сервера GraphQL.
   * ВАЖНО! Строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   */
  fieldsTypeMap?: Map<keyof V, string>;
};

@Injectable({
  providedIn: 'root'
})
/** Основной сервис для работы с библиотекой. Содержит все необходимые методы для управления сайтом. */
export class NgGqlService {

  constructor(
    private apollo: ApolloService,
    @Inject('config') private config: NgGqlConfig,
    @Inject(NAVIGATION_FRAGMENTS) private navigationFragments: ValuesOrBoolean<Navigation>,
    @Inject(MAINTENANCE_FRAGMENTS) private maintenanceFragment: ValuesOrBoolean<Maintenance>,
    @Inject(GROUP_FRAGMENTS) private groupFragments: ValuesOrBoolean<Group>,
    @Inject(DISH_FRAGMENTS) private dishFragments: ValuesOrBoolean<Dish>,
  ) {
  }

  private _navigationLoader$ = new BehaviorSubject<NavigationLoader<NavigationBase> | null>(null);
  private _navigationData$ = this._navigationLoader$.pipe(
    filter((data): data is NavigationLoader<NavigationBase> => !!data),
    switchMap(
      data => this.queryAndSubscribe(data.nameQuery, data.nameSubscribe, {
        ...data.queryObject, ... this.config.customFields?.[ 'Navigation' ]
      }, data.uniqueKeyForCompareItem)
    ),
    shareReplay(1)
  );

  private _initGroupSlug$ = new BehaviorSubject<SlugAndConcept | null>(null);

  updateInitGroupSlug(initGroupSlug: string, concept: string | 'origin') {
    this._initGroupSlug$.next({
      slug: initGroupSlug, concept
    });
  }

  /**
   * @method getNavigation$
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * @param options - объект NavigationLoader. Обязателен, при использовании нестандартной схемы навигации в приложении.
   * @see NavigationLoader<T>
   */
  getNavigation$<T extends NavigationBase>(options: NavigationLoader<T>): Observable<T[]>;

  /**
   * @method getNavigation$
   * Используется для получения массива обьектов навигации для различных компонентов приложения.
   * Если приложение использует стандартную механику навигации, параметр `options` - не требуется.
   */
  getNavigation$(): Observable<Navigation[]>;

  /**
 * @method getNavigation$
 * Используется для получения массива обьектов навигации для различных компонентов приложения.
 * Если приложение использует стандартную механику навигации, параметр `options` - не требуется.
 * Если приложение использует нестандартную механику навигации, параметр `options` - обязательный.
 * @param options - объект NavigationLoader.
 * Обязателен, при использовании нестандартной схемы навигации в приложении.
 * @see NavigationLoader<T>
 */
  getNavigation$<T extends NavigationBase = Navigation>(options?: NavigationLoader<T>): Observable<T[]> {
    const customvOb = this.config.customFields?.[ 'Navigation' ];
    if (options) {
      (<BehaviorSubject<NavigationLoader<T>>> this._navigationLoader$).next(options);
    } else {
      (<BehaviorSubject<NavigationLoader<Navigation>>> this._navigationLoader$).next({
        nameQuery: 'navigation',
        nameSubscribe: 'navigation',
        queryObject: customvOb ? { ... this.navigationFragments, ...customvOb } : this.navigationFragments,
        uniqueKeyForCompareItem: 'mnemonicId'
      });
    };
    return <Observable<T[]>> this._navigationData$;
  }


  getMaintenance$(): Observable<Maintenance> {
    const customvOb = this.config.customFields?.[ 'Maintenance' ];
    const vOb = customvOb ? { ...this.maintenanceFragment, ...customvOb } : this.maintenanceFragment;
    return this.queryAndSubscribe('maintenance', 'maintenance', vOb, 'id').pipe(
      filter(result => result.length > 0),
      map(
        res => res[ 0 ]
      )
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
    return this.customQuery$<{ childGroups: PartialGroupNullable[]; }, 'group', VCriteria>('group', {
      childGroups: {
        slug: true,
        id: true
      }
    }, {
      criteria: {
        slug, concept
      }
    }).pipe(
      map(group => {
        const array = (<{
          childGroups: PartialGroupNullable[];
        }[]> group.group).map(item => ({ ...item }));
        return {
          concept,
          groups: array.length == 0 ? [] : array[ 0 ].childGroups
        };
      }),
    );
  }

  rootGroups$: Observable<{
    concept: string | 'origin',
    groups: PartialGroupNullable[];
  }> = this._navigationData$.pipe(
    filter((navigationData): navigationData is Navigation[] => !!navigationData && Array.isArray(navigationData) && !!navigationData[ 0 ] && 'mnemonicId' in navigationData[ 0 ]),
    switchMap(navigationData => {
      const menuItem = navigationData.find(item => item.mnemonicId === 'menu')!;
      return menuItem.options.behavior?.includes('navigationmenu') ?
        of({
          concept: menuItem.options?.concept ?? 'origin',
          groups: menuItem.navigation_menu.map(item => ({ slug: item.groupSlug, id: null }))
        }) : this._loadGroups(menuItem.options.initGroupSlug, menuItem.options?.concept ?? 'origin');
    }),
    mergeWith(
      this._initGroupSlug$.asObservable().pipe(
        filter((slugAndConcept): slugAndConcept is SlugAndConcept => !!slugAndConcept),
        distinctUntilChanged(
          (previous, current) => isEqualItems(previous, current)
        ),
        switchMap(slugAndConcept => this._loadGroups(slugAndConcept.slug, slugAndConcept.concept))
      )
    ),
    distinctUntilChanged((previous, current) => isEqualItems(previous, current),
    ),
  );

  private _dishes$ = new BehaviorSubject<Dish[] | null>(null);


  /**
   * @method addAmountToDish
   * Метод-хелпер, используемый для добавления модификаторам блюда параметра amount и установки ему значения, в случае, если они у него имеются.
   * @param sourceDish - объект с исходными данными блюда.
   * @returns новый, дополненный объект с данными блюда.
   */
  addAmountToDish(sourceDish: Dish): Dish {
    return {
      ...sourceDish, modifiers: sourceDish.modifiers ? sourceDish.modifiers.map(
        (groupModifier, groupIndex) => ({
          ...groupModifier, childModifiers: groupModifier.childModifiers.filter(
            childModifier => isValue(childModifier.dish)
          ).map(
            (childModifier, childIndex) => ({
              ...childModifier,
              amount: groupIndex === 0 && childIndex === 0 && groupModifier.childModifiers.length === 2 && groupModifier.minAmount === 1 && groupModifier.maxAmount === 1 ? 1 : childModifier.defaultAmount ?? 0
            })
          )
        })
      ) : []
    };
  }

  private loadedMenu$ = this.rootGroups$.pipe(
    switchMap(
      rootGroupsData => {
        const rootGroups = rootGroupsData.groups;
        const nesting = this.config.nesting ?? 2;
        const customvOb = this.config.customFields?.[ 'Group' ];
        const vOb = customvOb ? { ...this.groupFragments, ...customvOb } : this.groupFragments;
        const queryObject: ValuesOrBoolean<Group> = new Array(nesting).fill(nesting).reduce(
          (accumulator: ValuesOrBoolean<Group>) => {
            const item = { ...vOb };
            item.childGroups = accumulator;
            return item;
          }, { ...vOb, childGroups: { ...vOb } }
        );
        const criteria = !!rootGroups[ 0 ]?.id ? {
          id: rootGroups.map(rootGroup => rootGroup.id),
          concept: rootGroupsData.concept
        } : {
          slug: rootGroups.map(rootGroup => rootGroup.slug),
          concept: rootGroupsData.concept
        };
        return this.queryAndSubscribe<Group, 'group', 'group', VCriteria>('group', 'group', queryObject, 'id', {
          query: {
            criteria
          },
          subscribe: {
            criteria
          }
        }).pipe(
          map(
            groups => ({
              concept: rootGroupsData.concept,
              groups
            })
          )
        );
      }),
    switchMap(
      groupsData => {
        const groups = groupsData.groups;
        const addGroup = (items: Group[], item: Group) => {
          if (!items.find(value => value.id === item.id)) {
            items.push(item);
          }
        };
        const getGroups = (items: Group[]) => items.reduce<Group[]>(
          (accumulator, current) => {
            addGroup(accumulator, current);
            if (current.childGroups && current.childGroups.length > 0) {
              getGroups(current.childGroups).forEach(
                child => addGroup(accumulator, child)
              );
            };
            return accumulator;
          }, []
        );
        const allNestingsGroups = getGroups(groups);
        const allNestingsIds = allNestingsGroups.map(group => group.id);
        console.log(allNestingsGroups);
        const customvObDish = this.config.customFields?.[ 'Dish' ];
        const vOb = customvObDish ? { ...this.dishFragments, ...customvObDish } : this.dishFragments;
        return this.queryAndSubscribe<Dish, 'dish', 'dish', VCriteria>('dish', 'dish', vOb, 'id', {
          query: {
            criteria: {
              parentGroup: allNestingsIds,
              concept: groupsData.concept
            }
          },
          subscribe: {
            criteria: {
              parentGroup: allNestingsIds,
              concept: groupsData.concept
            }
          }
        }).pipe(
          map(data => {
            const dishes = data.map(
              dataDish => this.addAmountToDish(dataDish)
            );
            this._dishes$.next(dishes);
            const groupsById = allNestingsGroups.reduce<{
              [ key: string ]: Group;
            }>(
              (accumulator, current) => {
                if (!current.childGroups) {
                  current.childGroups = [];
                };
                if (!current.dishes) {
                  current.dishes = [];
                };
                if (current.id) {
                  accumulator[ current.id ] = current;
                };
                return accumulator;
              }, {}
            );
            const groupIdsBySlug: {
              [ key: string ]: string;
            } = {};

            // Inserting dishes by groups
            for (let dish of dishes) {
              const groupId = dish.parentGroup?.id || dish.groupId;
              if (!groupId) continue;
              if (!groupsById[ groupId ]) continue;
              if (groupsById[ groupId ].dishes) {
                const checkDish = groupsById[ groupId ].dishes?.find(item => item.id === dish.id);
                if (!checkDish) {
                  groupsById[ groupId ].dishes?.push(dish);
                };
              } else {
                groupsById[ groupId ].dishes = [ dish ];
              }
            }
            // Create groups hierarchy
            for (let groupId in groupsById) {
              const group = groupsById[ groupId ];
              const parentGroupId = group.parentGroup?.id;
              groupIdsBySlug[ group.slug! ] = groupId;
              if (!parentGroupId) continue;
              if (!groupsById[ parentGroupId ]) continue;
              if (groupsById[ parentGroupId ].childGroups.find(chGroup => chGroup.id === group.id)) continue;
              groupsById[ parentGroupId ].childGroups.push(group);
            }
            return { groupsById, groupIdsBySlug };
          }),
          distinctUntilChanged((previous, current) => isEqualItems(previous, current)),
        );
      }
    ),
    shareReplay(1),
    distinctUntilChanged((previous, current) => isEqualItems(previous, current))
  );

  getMenu$(slug: string | string[] | undefined): Observable<Group[] | null> {
    return this.loadedMenu$.pipe(
      map(({ groupsById, groupIdsBySlug }) => {
        if (slug) {
          switch (typeof slug) {
            case 'string':
              if (!groupIdsBySlug[ slug ]) {
                return [];
              } else {
                return groupsById[ groupIdsBySlug[ slug ] ].childGroups;
              };
            default:
              if (!slug.length) {
                return [];
              } else {
                return slug.map(s => groupsById[ groupIdsBySlug[ s ] ]);
              };
          }
        } else {
          return Object.values(groupsById) as Group[];
        }
      })
    );
  }

  getDishes$(id?: string | string[]): Observable<Dish[]> {
    const dishes = this._dishes$.value;
    if (dishes) {
      const ids = typeof id === 'string' ? [ id ] : id;
      const dishesInStock = dishes.filter(item => typeof id === 'string' ? item.id === id : id?.includes(item.id));
      if (!ids) {
        return of(dishes);
      } else {
        if (dishesInStock.length == ids.length) {
          return of(dishesInStock);
        } else {
          const dishesNotInStock = ids.filter(dishId => !dishes.find(dish => dish.id === dishId));
          const customvObDish = this.config.customFields?.[ 'Dish' ];
          const vOb = customvObDish ? { ...this.dishFragments, ...customvObDish } : this.dishFragments;
          return this.customQuery$<Dish, 'dish', VCriteria>('dish', vOb, {
            criteria: {
              id: dishesNotInStock
            }
          }).pipe(
            map(loadedDishes => {
              const result = Array.isArray(loadedDishes.dish) ? loadedDishes.dish : [ loadedDishes.dish ];
              dishes.push(...result);
              this._dishes$.next(dishes);
              return [ ...dishesInStock, ...result ];
            })
          );
        }
      }
    } else {
      return this._dishes$.asObservable().pipe(
        filter((data): data is Dish[] => !!data)
      );
    }
  }

  /**
   * @method isKnownPhone$
   * Проверяет переданный номер телефона на "знакомость".
   * @param phone - Объект с данными номера телефона.
   * @returns
   */
  isKnownPhone$(phone: Phone): Observable<PhoneKnowledge[]> {
    const customvOb = this.config.customFields?.[ 'Phone' ];
    const phonevOb: ValuesOrBoolean<PhoneKnowledge> = {
      id: true,
      phone: true,
      isFirst: true,
      isConfirm: true,
      codeTime: true,
      confirmCode: true
    };
    const vOb = customvOb ? { ...phonevOb, ...customvOb } : phonevOb;
    return this.customQuery$<PhoneKnowledge, 'isKnownPhone', {
      phone: Phone;
    }>('isKnownPhone', vOb, {
      phone
    }, {
      fieldsTypeMap: new Map([
        [ 'phone', 'Phone!' ]
      ])
    }).pipe(
      map(
        data => Array.isArray(data.isKnownPhone) ? data.isKnownPhone : [ data.isKnownPhone ]
      )
    );
  };

  phoneKnowledgeGetCode$(phone: Phone): Observable<CheckPhoneResponse[]> {
    return this.customQuery$<CheckPhoneResponse, 'phoneKnowledgeGetCode', {
      phone: Phone;
    }>('phoneKnowledgeGetCode', {
      type: true,
      title: true,
      message: true,
      confirmed: true,
      firstbuy: true
    }, {
      phone
    }, {
      fieldsTypeMap: new Map([
        [ 'phone', 'Phone!' ]
      ])
    }).pipe(
      map(
        data => Array.isArray(data.phoneKnowledgeGetCode) ? data.phoneKnowledgeGetCode : [ data.phoneKnowledgeGetCode ]
      )
    );
  };

  phoneKnowledgeSetCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this.customMutation$<CheckPhoneResponse, 'phoneKnowledgeSetCode', CheckPhoneCodeInput>('phoneKnowledgeSetCode', {
      type: true,
      title: true,
      message: true,
      confirmed: true,
      firstbuy: true
    }, data, {
      fieldsTypeMap: new Map([
        [ 'phone', 'Phone!' ],
        [ 'code', 'String!' ]
      ])
    }).pipe(
      map(
        result => result.phoneKnowledgeSetCode
      )
    );
  };

  /**
   * @method customQuery$ для выполнения запросов типа "query" к серверу API GraphQL
   * @typeParam T Тип запрашиваемых данных, по которому построен объект @see `queryObject`.
   * @typeParam N Строка-название операции из схемы сервера GraphQL.
   * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
   * @param name - название операции, объвленное в схеме сервера GraphQL.
   * @param queryObject - объект-источник информации о структуре запрашиваемых данных в виде обьекта, реализующего интерфейс ValuesOrBoolean<T>.
   *    @see ValuesOrBoolean<T>
   * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   *
   * @returns - Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
   *  в виде одиночного объекта либо массива.
   **/
  customQuery$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, paramOptions?: QueryGenerationParam<V>): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${ generateQueryString({
        name,
        queryObject,
        variables,
        requiredFields: paramOptions?.requiredFields,
        fieldsTypeMap: paramOptions?.fieldsTypeMap
      }) }`,
      variables,
    }).pipe(
      map(
        res => res.error || res.errors ? null : res.data),
      filter((data): data is Record<N, T | T[]> => !!data)
    );
  };

  /**
 * @method customMutation$ для выполнения запросов типа "mutation" к серверу API GraphQL
 * @typeParam T Тип мутируемых данных, по которому построен объект @see `queryObject`.
 * @typeParam N Строка-название операции из схемы сервера GraphQL.
 * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
 * @param name - название операции, объвленное в схеме сервера GraphQL.
 * @param queryObject - объект-источник информации о структуре запрашиваемых данных в виде обьекта, реализующего интерфейс ValuesOrBoolean<T>.
 *     @see ValuesOrBoolean<T>
 * @param variables - обязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
 *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
 *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
 *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
 *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
 * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
 * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
 * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
 *    (например у параметра указан тип String!, а не String).
 * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
 * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
 * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
 *
 * @returns - Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.
 **/
  customMutation$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables: V, paramOptions?: QueryGenerationParam<V>): Observable<Record<N, T>> {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${ generateQueryString({
        name,
        queryObject,
        variables,
        requiredFields: paramOptions?.requiredFields,
        fieldsTypeMap: paramOptions?.fieldsTypeMap
      }) }`,
      variables
    }).pipe(
      map(result => isValue(result) ? result.data : null),
      filter((res): res is Record<N, T> => !!res)
    );
  };

  /**
* @method customSubscribe$ для выполнения запросов типа "subscription" к серверу API GraphQL
* @typeParam T Тип данных, на обновление которых производится подписка и по которому построен объект @see `queryObject`.
* @typeParam N Строка-название операции из схемы сервера GraphQL.
* @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
* @param name - название операции, объвленное в схеме сервера GraphQL.
* @param queryObject - объект-источник информации о структуре данных, на которые происходит подписка, реализующий интерфейс ValuesOrBoolean<T>.
*     @see ValuesOrBoolean<T>
* @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
*  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
*  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
*  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
*  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
* @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
* @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
* КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
*    (например у параметра указан тип String!, а не String).
* @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
* а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
* ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
*
* @returns - Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
* ВАЖНО! В потоке будут поступать только обновления для данных, на которые сделана подписка.
* Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
* В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.
* @see queryAndSubscribe
**/
  customSubscribe$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, paramOptions?: QueryGenerationParam<V>, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[ N ]> {
    const q = generateQueryString({
      name,
      queryObject,
      variables,
      requiredFields: paramOptions?.requiredFields,
      fieldsTypeMap: paramOptions?.fieldsTypeMap
    });
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${ q }`,
      variables
    }, extra).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res),
      map(res => res[ name ])
    );
  };

  /**
  * @method queryAndSubscribe
  * Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.

  * @param nameQuery - название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL.
  * @param nameSubscribe - название операции типа "subscription", объвленное в схеме сервера GraphQL  для запрашиваемых данных.
  * @param queryObject - объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка, реализующий интерфейс ValuesOrBoolean<T>.
  *   @see ValuesOrBoolean<T>
  * @param uniqueKeyForCompareItem - наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id').
    Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки.
  * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
  *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
  *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
  *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
  *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
  * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
  * @param paramOptions.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
  * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
  *    (например у параметра указан тип String!, а не String).
  * @param paramOptions.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
  * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
  * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
  * @returns - Observable поток с данными, которые будут поступать в рамках сделанной подписки.
  * Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
  * Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
  **/
  queryAndSubscribe<
    T, NQuery extends `${ string }`, NSubscribe extends `${ string }`,
    VQ = Exclude<GQLRequestVariables, 'query' | 'subscribe'>,
    VS = Exclude<GQLRequestVariables, 'query' | 'subscribe'>>(
      nameQuery: NQuery,
      nameSubscribe: NSubscribe,
      queryObject: ValuesOrBoolean<T>,
      uniqueKeyForCompareItem: keyof T,
      variables?: {
        query?: VQ,
        subscribe?: VS;
      },
      paramOptions?: {
        query?: QueryGenerationParam<VQ>,
        subscribe?: QueryGenerationParam<VS>;
      }): Observable<T[]> {
    const updateFn: (store: T | T[], subscribeValue: T) => T[] = (store, newValue) => {
      const array = (Array.isArray(store) ? store : [ store ]);
      const findItem = array.find(
        item => newValue[ uniqueKeyForCompareItem ] === item[ uniqueKeyForCompareItem ]
      );
      if (findItem) {
        Object.assign(findItem, newValue);
        return array;
      } else {
        return [ ...array, newValue ];
      };
    };
    const apolloQueryOptions = {
      query: gql`query ${ generateQueryString<ValuesOrBoolean<T>, NQuery, VQ>({
        name: nameQuery, queryObject,
        variables: variables?.query,
        requiredFields: paramOptions?.query?.requiredFields,
        fieldsTypeMap: paramOptions?.query?.fieldsTypeMap
      }) }`,
      variables: variables?.query
    };
    return this.apollo.watchQuery<Record<NQuery, T | T[]>, VQ>(apolloQueryOptions).pipe(
      map(
        res => res.error || res.errors ? null : res.data),
      filter((data): data is Record<NQuery, T | T[]> => !!data),
      switchMap(
        result => this.customSubscribe$<T, NSubscribe, VS>(
          nameSubscribe, queryObject, variables?.subscribe, paramOptions?.subscribe
        ).pipe(
          startWith(null),
          map(
            updatedValue => {
              const store: T | T[] = deepClone(result[ nameQuery ]);
              return isValue(updatedValue) ?
                updateFn(store, deepClone(updatedValue)) :
                Array.isArray(store) ?
                  store :
                  <T[]>[ store ];
            }),
        )
      )
    );
  }

  destroy() {
    Object.values(this).filter(
      (property): property is BehaviorSubject<unknown> => property instanceof BehaviorSubject
    ).forEach(
      property => property.complete()
    );
  }

}
