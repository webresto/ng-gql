import { EventEmitter, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { isValue } from '../is-value';
import type { NgGqlConfig } from '../ng-gql-config/ng-gql-config';

export type StorageOrderTokenEvent = StorageOrderTokenSetOrderId | StorageOrderTokenRemoveOrderId;

export interface StorageOrderTokenSetOrderId {
  event: 'setOrderId';
  data: {
    orderId: string;
    alternativeToken?: string;
  };
};

export interface StorageOrderTokenRemoveOrderId {
  event: 'removeOrderId';
  newOrderId?: string;
};

/**
 * Класс, в который вынесена логика работы с хранилищем localStorage.
 * Ключевая необходимость использования этого класса вместо работы с хранилищем напрямую - методы StorageWrapper также инициируют отправку
 * браузерного события 'storage' в объекте window В ТЕКУЩЕЙ ВКЛАДКЕ БРАУЗЕРА.
 * Это важно, поскольку стандартные методы работы со Storage иницируют StorageEvent только для ДРУГИХ ВКЛАДОК браузера и не происходят в самой
 * вкладке, где произошли изменения.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageWrapper {

  constructor(@Inject('config') private config: NgGqlConfig) { }

  /**
 * @method setOrderId()
 * @param orderId - id Заказа, который требуется сохранить в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
 * Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
 * Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
 * Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).
 * @param storageOrderIdToken - необязательный альтернативный токен для сохранения orderId в localstorage.
 * Также все последующие операции в localStorage данными заказа начнут использовать этот токен, т.к. обновится внутренняя подписка информации об используемом токене.
 */
  setOrderId(orderId: string, storageOrderIdToken?: string) {
    this._storageActionBus$.emit({
      event: 'setOrderId',
      data: {
        orderId,
        alternativeToken: storageOrderIdToken
      }
    });
  }

  /**
   * @method removeOrderId()
   * Удаляет сохраненный в localStorage id заказа.
   */
  removeOrderId(newOrderId?: string) {
    this._storageActionBus$.emit({
      event: 'removeOrderId',
      newOrderId
    });
  }

  setToStorage(key: string, orderId: string) {
    const storageOrderId = this.getOrderId(key);
    if (!storageOrderId || orderId !== storageOrderId) {
      const oldValue = window.localStorage.getItem(key);
      const newValue = JSON.stringify({ orderId: orderId, dt: Date.now() });
      window.localStorage.setItem(key, newValue);
      this.notifyStorageUpdate(key, oldValue, newValue);
    };
  }

  removeFromStorage(key: string) {
    const oldValue = window.localStorage.getItem(key);
    const newValue = null;
    window.localStorage.removeItem(key);
    this.notifyStorageUpdate(key, oldValue, newValue);
  }

  private notifyStorageUpdate(key: string, oldValue: string | null, newValue: string | null) {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        oldValue,
        newValue,
        storageArea: window.localStorage,
        url: window.location.href
      })
    );
  }

  startStorageEventFactory(key: string) {
    return new StorageEvent('storage', {
      key,
      oldValue: window.localStorage.getItem(key),
      newValue: window.localStorage.getItem(key),
      storageArea: window.localStorage,
      url: window.location.href
    });
  }

  /**
 * @method getOrderId()
 *  @returns Возвращает orderId, сохраненный ранее в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
 * Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
 * Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
 * Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).
 */
  getOrderId(storageOrderIdToken: string, storageOrderId?: string): string | undefined {
    try {
      const cartString = isValue(storageOrderId) ? storageOrderId : window.localStorage.getItem(storageOrderIdToken);
      if (cartString) {
        const cartData: {
          orderId: string;
          dt: number;
        } = JSON.parse(cartString);
        const idObsolescence = (43200000 * (isValue(this.config.obsolescence) ? this.config.obsolescence : 14));
        if ((Date.now() - cartData.dt) > idObsolescence) {
          return undefined;
        } else {
          return cartData.orderId;
        };
      } else {
        return undefined;
      };
    } catch (error) {
      return undefined;
    };
  }

  /**
 * Поток для изменения "на лету" токена, с которым в localStorage сохраняется id заказа.
 * Необходим для реализации на сайте "мультикорзины" - нескольких параллельных корзин, между которыми пользователь может переключаться при переходе по страницам сайта.
 */
  private _storageOrderIdToken$ = new BehaviorSubject<string | null>(
    this.config.orderIdStorageToken !== undefined ?
      this.config.orderIdStorageToken :
      `${ window.location.host }-orderId
     `);

  storageOrderIdToken$ = this._storageOrderIdToken$.pipe(
    filter((storageOrderIdToken): storageOrderIdToken is string => !!storageOrderIdToken),
    distinctUntilChanged(),
  );

  /**
   * @method updateStorageOrderIdToken()
   * Реализация "мульткорзины".
   * Предназначен для переключения между корзинами, каждая из которых хранятся в localStorage со своим токеном.
   * Предназначен для переключения потоков с
   * @param newToken
   */
  updateStorageOrderIdToken(newToken: string) {
    this._storageOrderIdToken$.next(newToken);
  }

  private _storageActionBus$ = new EventEmitter<StorageOrderTokenEvent>();
  private storageActionBus$ = this._storageActionBus$.pipe(
    switchMap(
      busEvent => {

        if (busEvent.event == 'setOrderId' && isValue(busEvent.data.alternativeToken)) {
          this.setToStorage(busEvent.data.alternativeToken, busEvent.data.orderId);
          this.updateStorageOrderIdToken(busEvent.data.alternativeToken);
          return of(() => { });
        } else {
          return this.storageOrderIdToken$.pipe(
            map(
              storageOrderIdToken => {
                switch (busEvent.event) {
                  case 'removeOrderId':
                    if (busEvent.newOrderId) {
                      this.setToStorage(storageOrderIdToken, busEvent.newOrderId);
                    } else {
                      this.removeFromStorage(storageOrderIdToken);
                    };
                    break;
                  case 'setOrderId':
                    this.setToStorage(storageOrderIdToken, busEvent.data.orderId);
                    break;
                };
              }),
          );
        };
      }),
  );

  private _storageActionBusSubscription$ = this.storageActionBus$.subscribe({
    next: () => { },
    error: () => { },
    complete: () => { }
  });

  destroy() {
    this._storageActionBusSubscription$.unsubscribe();
  }

}