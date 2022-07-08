import type { InMemoryCacheConfig } from '@apollo/client';
import type { ValuesOrBoolean } from '../values-or-boolean';

/**
 * Обьект с параметрами настройки библиотеки для определенного сервера-API
 * */
export interface NgGqlConfig {
  /**
   *  URL API сервера GraphQL
   * */
  url: string;

  /**
   * Уровень вложенности групп с блюдами друг в друга.
   * */
  nesting: number;

  /**
   * Необязательный параметр.
   * Определяет период времени (в днях), по истечении которого orderId, сохраненный в localStorage, будет считаться старым и не будет использоваться.
   */
  obsolescence?: number;

  /**
   * Способ подписки на события шины.
   * При выборе параметра 'subscribe' - библиотека будет автоматически подписываться на события в шине и также автоматически отпишется от нее при завершении работы.
   * В случае выбора параметра 'custom' - подписка на события и управление ею производится на стороне проекта разработчиком самостоятельно, к примеру, используя asyncPipe.
   * */
  busSubscribeMode: 'subscribe' | 'custom';

  /**
   * @deprecated Используй InjectionToken нужных моделей для конфигурации объектов запросов.
   * Можно дополнительно импортировать стандартный объект конфигурации запроса для данной модели, если требуются незначительные изменения.
   * Например:
   * ```ts
   * import { NgGqlModule, DISH_FRAGMENTS, defaultDishFragments } from '@webresto/ng-gql';
   * ...
   * const myDishFragment:ValuesOrBoolean<Dish> = {
   *                                              здесь описываете ваш объект конфигурации для запроса
   *                                              };
   * ...
   * @NgModule({
   *   ...
   *   providers: [
   *                .... ваши провайдеры
   *                 { provide: DISH_FRAGMENTS , useValue: myDishFragment }
   *            ]
   * })
   * export class AppModule {
   * ```
   *
   * Необязательный объект с дополнительной пользовательской информацией о пользовательских свойствах,
   * добавленных в базовые модели на стороне конкретного сервера и объявленные в схеме GraphQL на сервере.
   * В качестве ключей указывается название модели, в качестве значений - объекты,
   * содержащие часть конфигурации `ValuesOrBoolean` этой модели, отражающую отличия с базовой моделью.
   * @see @alias ValuesOrBoolean<T>
   * */
  customFields?: {
    [ modelName: string ]: ValuesOrBoolean<unknown>;
  };

  /**
   * Токен, с которым в localStorage будут храниться id заказов.
   * Если не задан - используется токен по умолчанию -'${ window.location.host }-orderId'.
   * Если задан null - корзина не будет загружаться при старте приложения, потоки будут ожидать,
   * пока в поток `NgOrderService.storageOrderIdToken$` не будет передана строка с токеном.
   */
  orderIdStorageToken?: string | null;

  /**
   * Телефонный код страны
   */
  phoneCode: string | null;

  /**
   * Параметр, включающий использование persist-кэша.
   * Если установлен в true - кэш запросов Apollo будет сохраняться и восстанавливаться между сеансами, используя localStorage
   * Логика работы с хранилищем кэша полностью реализована и инкапусулирована в подключенной библиотеке apollo3-cache-persist.
   * По умолчанию - true.
   */
  usePersistCache?: boolean;

  /**
   * Объект с дополнительными параметрами конфигруации InMemoryCache для Apollo-клиента.
   * При передаче параметров, уже заданных в NgGqlModule, стандартные значения будут заменены значениями, полученными в `apolloCacheConfig`.
   */
  apolloCacheConfig?: InMemoryCacheConfig;

}

