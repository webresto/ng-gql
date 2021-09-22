import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, filter, take, map, catchError, switchMap } from 'rxjs/operators';
import { CartGql } from './cart/cart.gql';
import { DishGql } from './dish/dish.gql';
import { GroupGql } from './group/group.gql';
import { NavigationGql } from './navigation/navigation.gql';
import { PaymentMethodGql } from './payment-method/payment-method.gql';
import * as i0 from "@angular/core";
import * as i1 from "apollo-angular";
export class NgGqlService {
    constructor(apollo) {
        this.apollo = apollo;
        this.menu$ = new BehaviorSubject(null);
        this.dishes$ = new BehaviorSubject(null);
        this.cart$ = new BehaviorSubject(null);
        this.navigationData$ = new BehaviorSubject(null);
        this.customQueryiesDataByName = {};
        this.customQueriesDataLoadingByName = {};
        this.cart$.subscribe(res => console.log('control cart res', res));
    }
    getNavigation$() {
        if (!this.navigationData$.getValue() && !this.navigationDataLoading) {
            this.apollo.watchQuery({
                query: NavigationGql.queries.getNavigationes()
            })
                .valueChanges
                .pipe(tap(({ data, loading }) => {
                this.menuLoading = loading;
                const navigationData = {};
                for (let navigation of data.navigation) {
                    navigationData[navigation.name] = navigation;
                }
                this.navigationData$.next(navigationData);
            }))
                .subscribe();
        }
        return this.navigationData$;
    }
    getMenu$(slug = null) {
        if (!this.menuLoading) {
            this.apollo.watchQuery({
                query: GroupGql.queries.getGroupsAndDishes()
            })
                .valueChanges
                .pipe(tap(({ data, loading }) => {
                var _a, _b;
                this.menuLoading = loading;
                const { groups, dishes } = data;
                const groupsById = {};
                const groupIdsBySlug = {};
                // Groups indexing
                for (let group of groups) {
                    groupsById[group.id] = Object.assign(Object.assign({}, group), { dishes: [], childGroups: [] });
                }
                // Inserting dishes by groups
                for (let dish of dishes) {
                    //const { groupId } = dish;
                    const groupId = (_a = dish.parentGroup) === null || _a === void 0 ? void 0 : _a.id;
                    if (!groupId)
                        continue;
                    if (!groupsById[groupId])
                        continue;
                    groupsById[groupId].dishes.push(dish);
                }
                // Create groups hierarchy
                for (let groupId in groupsById) {
                    const group = groupsById[groupId];
                    const parentGroupId = (_b = group.parentGroup) === null || _b === void 0 ? void 0 : _b.id;
                    groupIdsBySlug[group.slug] = groupId;
                    if (!parentGroupId)
                        continue;
                    if (!groupsById[parentGroupId])
                        continue;
                    groupsById[parentGroupId].childGroups.push(group);
                    //delete groupsById[groupId];
                }
                if (slug) {
                    switch (typeof slug) {
                        case 'string':
                            if (!groupIdsBySlug[slug]) {
                                this.menu$.next([]);
                                return;
                            }
                            this.menu$.next(groupsById[groupIdsBySlug[slug]].childGroups.sort((g1, g2) => g1.order - g2.order));
                            break;
                        case 'object':
                            if (!slug.length) {
                                this.menu$.next([]);
                                return;
                            }
                            this.menu$.next(slug.map(s => groupsById[groupIdsBySlug[s]]));
                            break;
                    }
                    return;
                }
                const groupsAndDishes = Object.values(groupsById).sort((g1, g2) => g1.order - g2.order);
                this.menu$.next(groupsAndDishes);
            }))
                .subscribe();
        }
        return this.menu$;
    }
    getDishes$() {
        if (!this.dishes$.getValue() && !this.dishesLoading) {
            this.apollo.watchQuery({
                query: DishGql.queries.getDishes()
            })
                .valueChanges
                .pipe(tap(({ data, loading }) => {
                this.dishesLoading = loading;
                this.dishes$.next(data.dishes);
            }))
                .subscribe();
        }
        return this.dishes$;
    }
    getOrder$(orderId = null) {
        return this.apollo.watchQuery({
            query: CartGql.queries.getOrder(orderId)
        })
            .valueChanges
            .pipe(take(1), map(({ data }) => data.getOrder));
    }
    getCart$(cartId = null) {
        const lastCart = this.cart$.getValue();
        if (!(lastCart && lastCart.id == cartId) && !this.cartLoading) {
            this.apollo.watchQuery({
                query: CartGql.queries.getCart(cartId),
                fetchPolicy: 'no-cache'
            })
                .valueChanges
                .pipe(take(1), tap(({ data, loading }) => {
                this.cartLoading = loading;
                this.cart$.next(data.cart);
            }))
                .subscribe();
        }
        return this.cart$;
    }
    getPhone$(phone) {
        return this.apollo.watchQuery({
            query: CartGql.queries.getPhone(phone),
            fetchPolicy: 'no-cache'
        })
            .valueChanges
            .pipe(map(({ data, loading }) => {
            this.getPhoneLoading = loading;
            return data.phone;
        }));
    }
    checkPhone$(phone) {
        return this.apollo.watchQuery({
            query: CartGql.queries.checkPhone(phone),
            fetchPolicy: 'no-cache'
        })
            .valueChanges
            .pipe(map(({ data, loading }) => {
            this.checkPhoneLoading = loading;
            return data.checkPhone;
        }));
    }
    getPaymentMethods$(cartId) {
        return this.apollo.watchQuery({
            query: PaymentMethodGql.queries.getPaymentMethod(cartId)
        })
            .valueChanges
            .pipe(map(({ data, loading }) => {
            this.paymentMethodLoading = loading;
            return data.paymentMethods;
        }));
    }
    addDishToCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.addDishToCart(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const cart = data['cartAddDish'];
            this.cart$.next(cart);
            return cart;
        }));
    }
    orderCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.orderCart(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const checkResponse = data['orderCart'];
            this.cart$.next(checkResponse.cart);
            return checkResponse;
        }));
    }
    checkCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.checkCart(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const checkResponse = data['checkCart'];
            this.cart$.next(checkResponse.cart);
            return checkResponse;
        }));
    }
    checkPhoneCode$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.checkPhoneCode(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const checkPhoneResponse = data['setPhoneCode'];
            return checkPhoneResponse;
        }));
    }
    removeDishFromCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.removeDishFromCart(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const cart = data['cartRemoveDish'];
            this.cart$.next(cart);
            return cart;
        }));
    }
    setDishAmount$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.setDishAmount(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const cart = data['cartSetDishAmount'];
            this.cart$.next(cart);
            return cart;
        }));
    }
    setDishComment$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.setDishComment(),
            variables: data
        })
            .pipe(map(({ data }) => {
            const cart = data['cartSetDishComment'];
            this.cart$.next(cart);
            return cart;
        }));
    }
    customQuery$(name, queryObject, variables = {}) {
        let queryArgumentsStrings = [];
        for (let key in variables) {
            let valueString = variables[key];
            switch (typeof valueString) {
                case 'object':
                    valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:');
                    break;
                case 'string':
                    valueString = `"${valueString}"`;
                    break;
            }
            queryArgumentsStrings.push(`${key}: ${valueString}`);
        }
        let queryArgumentsString = queryArgumentsStrings.length
            ? `(${queryArgumentsStrings.join(', ')})`
            : ``;
        const queryKey = (name + queryArgumentsString).replace(/[^a-z0-9]/gi, '');
        let query = JSON.stringify(queryObject)
            .replace(/"/g, '')
            .replace(/\:[a-z0-9]+/gi, '')
            .replace(/\:/g, '');
        if (queryArgumentsString) {
            const queriesKeys = Object.keys(queryObject);
            const countOfQueries = queriesKeys.length;
            if (countOfQueries == 1) {
                query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + queryArgumentsString);
            }
        }
        if (!this.customQueryiesDataByName[queryKey]) {
            this.customQueryiesDataByName[queryKey] = new BehaviorSubject(null);
            this.customQueriesDataLoadingByName[queryKey] = false;
        }
        if (!this.customQueryiesDataByName[queryKey].getValue() && !this.customQueriesDataLoadingByName[queryKey]) {
            this.apollo.watchQuery({
                query: gql `query ${name}${query}`,
                fetchPolicy: 'no-cache'
            })
                .valueChanges
                .pipe(tap(({ data, loading }) => {
                this.customQueriesDataLoadingByName[queryKey] = loading;
                this.customQueryiesDataByName[queryKey].next(data);
            }), catchError(error => {
                this.customQueryiesDataByName[queryKey].next({
                    error: error
                });
                return of(null);
            }))
                .subscribe();
        }
        return this.customQueryiesDataByName[queryKey].pipe(switchMap((data) => {
            if (data && data.error) {
                return throwError(data.error);
            }
            return of(data);
        }), filter(data => !!data));
    }
    customMutation$(name, queryObject, variables = {}) {
        let mutationArgumentsStrings = [];
        for (let key in variables) {
            let valueString = variables[key];
            switch (typeof valueString) {
                case 'object':
                    valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:');
                    break;
                case 'string':
                    valueString = `"${valueString}"`;
                    break;
            }
            mutationArgumentsStrings.push(`${key}: ${valueString}`);
        }
        let mutationArgumentsString = mutationArgumentsStrings.length
            ? `(${mutationArgumentsStrings.join(', ')})`
            : ``;
        let query = JSON.stringify(queryObject)
            .replace(/"/g, '')
            .replace(/\:[a-z0-9]+/gi, '')
            .replace(/\:/g, '');
        if (mutationArgumentsString) {
            const queriesKeys = Object.keys(queryObject);
            const countOfQueries = queriesKeys.length;
            if (countOfQueries == 1) {
                query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + mutationArgumentsString);
            }
        }
        return this.apollo.mutate({
            mutation: gql `mutation ${name}${query}`
        });
    }
}
NgGqlService.ɵfac = function NgGqlService_Factory(t) { return new (t || NgGqlService)(i0.ɵɵinject(i1.Apollo)); };
NgGqlService.ɵprov = i0.ɵɵdefineInjectable({ token: NgGqlService, factory: NgGqlService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGqlService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.Apollo }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0UsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBcUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5CbEMsVUFBSyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc1RCxZQUFPLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdELFVBQUssR0FBMEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsb0JBQWUsR0FBb0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPN0UsNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0IsRUFB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Q0FBQyxDQUFDO2FBQy9HO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxHQUFHLENBQUEsWUFBWSxJQUFJLEdBQUcsS0FBSyxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7O3dFQTlZVSxZQUFZO29EQUFaLFlBQVksV0FBWixZQUFZLG1CQUZYLE1BQU07dUZBRVAsWUFBWTtjQUh4QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZXRjaFJlc3VsdCB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgQXBvbGxvLCBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIGZpbHRlciwgdGFrZSwgbWFwLCBjYXRjaEVycm9yLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJ0IH0gZnJvbSAnLi9jYXJ0L2NhcnQnO1xuaW1wb3J0IHsgQ2FydEdxbCwgQWRkVG9DYXJ0SW5wdXQsIFJlbW92ZUZyb21DYXJ0SW5wdXQsIE9yZGVyQ2FydElucHV0LCBDaGVja1Bob25lQ29kZUlucHV0LCBTZXREaXNoQW1vdW50SW5wdXQsIFNldERpc2hDb21tZW50SW5wdXQgfSBmcm9tICcuL2NhcnQvY2FydC5ncWwnO1xuaW1wb3J0IHsgQ2hlY2tQaG9uZVJlc3BvbnNlIH0gZnJvbSAnLi9jYXJ0L2NoZWNrLXBob25lLXJlc3BvbnNlJztcbmltcG9ydCB7IENoZWNrUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcmVzcG9uc2UnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuL2NhcnQvb3JkZXInO1xuaW1wb3J0IHsgUGhvbmUgfSBmcm9tICcuL2NhcnQvcGhvbmUnO1xuaW1wb3J0IHsgRGlzaCB9IGZyb20gJy4vZGlzaC9kaXNoJztcbmltcG9ydCB7IERpc2hHcWwgfSBmcm9tICcuL2Rpc2gvZGlzaC5ncWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwL2dyb3VwJztcbmltcG9ydCB7IEdyb3VwR3FsIH0gZnJvbSAnLi9ncm91cC9ncm91cC5ncWwnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IE5hdmlnYXRpb25HcWwgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZCB9IGZyb20gJy4vcGF5bWVudC1tZXRob2QvcGF5bWVudC1tZXRob2QnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZEdxbCB9IGZyb20gJy4vcGF5bWVudC1tZXRob2QvcGF5bWVudC1tZXRob2QuZ3FsJztcblxuZXhwb3J0IHR5cGUgTmF2aWdhdGlvbkRhdGEgPSB7XG4gIFtrZXk6IHN0cmluZ106IE5hdmlnYXRpb25cbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3FsU2VydmljZSB7XG5cbiAgbWVudSQ6IEJlaGF2aW9yU3ViamVjdDxHcm91cFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIG1lbnVMb2FkaW5nOiBib29sZWFuO1xuXG4gIGRpc2hlcyQ6IEJlaGF2aW9yU3ViamVjdDxEaXNoW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgZGlzaGVzTG9hZGluZzogYm9vbGVhbjtcblxuICBjYXJ0JDogQmVoYXZpb3JTdWJqZWN0PENhcnQ+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgY2FydExvYWRpbmc6IGJvb2xlYW47XG5cbiAgbmF2aWdhdGlvbkRhdGEkOiBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvbkRhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgbmF2aWdhdGlvbkRhdGFMb2FkaW5nOiBib29sZWFuO1xuXG4gIHBheW1lbnRNZXRob2RMb2FkaW5nOiBib29sZWFuO1xuICBnZXRQaG9uZUxvYWRpbmc6IGJvb2xlYW47XG4gIGNoZWNrUGhvbmVMb2FkaW5nOiBib29sZWFuO1xuXG4gIGN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZTogeyBba2V5OiBzdHJpbmddOiBCZWhhdmlvclN1YmplY3Q8YW55PiB9ID0ge307XG4gIGN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwb2xsbzogQXBvbGxvKSB7XG4gICAgdGhpcy5jYXJ0JC5zdWJzY3JpYmUocmVzID0+IGNvbnNvbGUubG9nKCdjb250cm9sIGNhcnQgcmVzJywgcmVzKSk7XG4gIH0gXG5cbiAgZ2V0TmF2aWdhdGlvbiQoKTogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhPiB7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb25EYXRhJC5nZXRWYWx1ZSgpICYmICF0aGlzLm5hdmlnYXRpb25EYXRhTG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IE5hdmlnYXRpb25HcWwucXVlcmllcy5nZXROYXZpZ2F0aW9uZXMoKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lbnVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25EYXRhOiBOYXZpZ2F0aW9uRGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgbmF2aWdhdGlvbiBvZiBkYXRhLm5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgbmF2aWdhdGlvbkRhdGFbbmF2aWdhdGlvbi5uYW1lXSA9IG5hdmlnYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25EYXRhJC5uZXh0KG5hdmlnYXRpb25EYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGlvbkRhdGEkO1xuICB9XG5cbiAgZ2V0TWVudSQoc2x1Zzogc3RyaW5nIHwgc3RyaW5nW10gPSBudWxsKTogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+IHtcbiAgICBpZiAoIXRoaXMubWVudUxvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBHcm91cEdxbC5xdWVyaWVzLmdldEdyb3Vwc0FuZERpc2hlcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgeyBncm91cHMsIGRpc2hlcyB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0J5SWQgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwSWRzQnlTbHVnID0ge307XG4gICAgICAgICAgICAvLyBHcm91cHMgaW5kZXhpbmdcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICBncm91cHNCeUlkW2dyb3VwLmlkXSA9IHtcbiAgICAgICAgICAgICAgICAuLi5ncm91cCxcbiAgICAgICAgICAgICAgICBkaXNoZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNoaWxkR3JvdXBzOiBbXVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW5zZXJ0aW5nIGRpc2hlcyBieSBncm91cHNcbiAgICAgICAgICAgIGZvciAobGV0IGRpc2ggb2YgZGlzaGVzKSB7XG4gICAgICAgICAgICAgIC8vY29uc3QgeyBncm91cElkIH0gPSBkaXNoO1xuICAgICAgICAgICAgICBjb25zdCBncm91cElkID0gZGlzaC5wYXJlbnRHcm91cD8uaWQ7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtncm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbZ3JvdXBJZF0uZGlzaGVzLnB1c2goZGlzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDcmVhdGUgZ3JvdXBzIGhpZXJhcmNoeVxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cHNCeUlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzQnlJZFtncm91cElkXTtcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50R3JvdXBJZCA9IGdyb3VwLnBhcmVudEdyb3VwPy5pZDtcbiAgICAgICAgICAgICAgZ3JvdXBJZHNCeVNsdWdbZ3JvdXAuc2x1Z10gPSBncm91cElkO1xuICAgICAgICAgICAgICBpZiAoIXBhcmVudEdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW3BhcmVudEdyb3VwSWRdLmNoaWxkR3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICAvL2RlbGV0ZSBncm91cHNCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2x1Zykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzbHVnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBJZHNCeVNsdWdbc2x1Z10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc2x1Z11dLmNoaWxkR3JvdXBzLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgaWYoIXNsdWcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChzbHVnLm1hcChzID0+IGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc11dKSlcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBncm91cHNBbmREaXNoZXM6IEdyb3VwW10gPSBPYmplY3QudmFsdWVzKGdyb3Vwc0J5SWQpLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSBhcyBHcm91cFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0FuZERpc2hlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1lbnUkO1xuICB9XG5cbiAgZ2V0RGlzaGVzJCgpOiBCZWhhdmlvclN1YmplY3Q8RGlzaFtdPiB7XG4gICAgaWYgKCF0aGlzLmRpc2hlcyQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5kaXNoZXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogRGlzaEdxbC5xdWVyaWVzLmdldERpc2hlcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzaGVzTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmRpc2hlcyQubmV4dChkYXRhLmRpc2hlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRpc2hlcyQ7XG4gIH1cblxuICBnZXRPcmRlciQob3JkZXJJZDogc3RyaW5nID0gbnVsbCk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0T3JkZXIob3JkZXJJZClcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IGRhdGEuZ2V0T3JkZXIpXG4gICAgICApXG4gIH1cblxuICBnZXRDYXJ0JChjYXJ0SWQ6IHN0cmluZyA9IG51bGwpOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4ge1xuICAgIGNvbnN0IGxhc3RDYXJ0ID0gdGhpcy5jYXJ0JC5nZXRWYWx1ZSgpO1xuICAgIGlmICghKGxhc3RDYXJ0ICYmIGxhc3RDYXJ0LmlkID09IGNhcnRJZCkgJiYgIXRoaXMuY2FydExvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0Q2FydChjYXJ0SWQpLFxuICAgICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FydExvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGRhdGEuY2FydCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhcnQkO1xuICB9XG5cbiAgZ2V0UGhvbmUkKHBob25lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBob25lPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldFBob25lKHBob25lKSxcbiAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRQaG9uZUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLnBob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tQaG9uZSQocGhvbmU6IHN0cmluZyk6IE9ic2VydmFibGU8Q2hlY2tQaG9uZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmNoZWNrUGhvbmUocGhvbmUpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrUGhvbmVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5jaGVja1Bob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0UGF5bWVudE1ldGhvZHMkKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQYXltZW50TWV0aG9kW10+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBQYXltZW50TWV0aG9kR3FsLnF1ZXJpZXMuZ2V0UGF5bWVudE1ldGhvZChjYXJ0SWQpXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TWV0aG9kTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGF5bWVudE1ldGhvZHNcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhOiBBZGRUb0NhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmFkZERpc2hUb0NhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0QWRkRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIG9yZGVyQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5vcmRlckNhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhWydvcmRlckNhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja0NhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhWydjaGVja0NhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrUGhvbmVDb2RlJChkYXRhOiBDaGVja1Bob25lQ29kZUlucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja1Bob25lQ29kZSgpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tQaG9uZVJlc3BvbnNlOiBDaGVja1Bob25lUmVzcG9uc2UgPSBkYXRhWydzZXRQaG9uZUNvZGUnXTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tQaG9uZVJlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkYXRhOiBSZW1vdmVGcm9tQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMucmVtb3ZlRGlzaEZyb21DYXJ0KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFJlbW92ZURpc2gnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQW1vdW50JChkYXRhOiBTZXREaXNoQW1vdW50SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5zZXREaXNoQW1vdW50KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hBbW91bnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQ29tbWVudCQoZGF0YTogU2V0RGlzaENvbW1lbnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hDb21tZW50KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hDb21tZW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY3VzdG9tUXVlcnkkPFQgPSBhbnk+KG5hbWU6IHN0cmluZywgcXVlcnlPYmplY3Q6IGFueSwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdmFyaWFibGVzW2tleV07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZVN0cmluZykge1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVTdHJpbmcpLnJlcGxhY2UoL1xce1wiKFteXCJdKylcIlxcOi9naSwgJ3skMTonKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gYFwiJHt2YWx1ZVN0cmluZ31cImA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBxdWVyeUFyZ3VtZW50c1N0cmluZ3MucHVzaChgJHtrZXl9OiAke3ZhbHVlU3RyaW5nfWApO1xuICAgIH1cbiAgICBsZXQgcXVlcnlBcmd1bWVudHNTdHJpbmcgPSBxdWVyeUFyZ3VtZW50c1N0cmluZ3MubGVuZ3RoXG4gICAgICA/IGAoJHtxdWVyeUFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBjb25zdCBxdWVyeUtleSA9IChuYW1lICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpLnJlcGxhY2UoL1teYS16MC05XS9naSwgJycpO1xuICAgIGxldCBxdWVyeSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5T2JqZWN0KVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOlthLXowLTldKy9naSwgJycpXG4gICAgICAucmVwbGFjZSgvXFw6L2csICcnKTtcbiAgICBpZihxdWVyeUFyZ3VtZW50c1N0cmluZykge1xuICAgICAgY29uc3QgcXVlcmllc0tleXMgPSBPYmplY3Qua2V5cyhxdWVyeU9iamVjdCk7XG4gICAgICBjb25zdCBjb3VudE9mUXVlcmllcyA9IHF1ZXJpZXNLZXlzLmxlbmd0aDtcbiAgICAgIGlmIChjb3VudE9mUXVlcmllcyA9PSAxKSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKCcoXFx7LiopJyArIHF1ZXJpZXNLZXlzWzBdKSwgJyQxJyArIHF1ZXJpZXNLZXlzWzBdICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLmdldFZhbHVlKCkgJiYgIXRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSkge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxULCBib29sZWFuPih7IFxuICAgICAgICBxdWVyeTogZ3FsYHF1ZXJ5ICR7bmFtZX0ke3F1ZXJ5fWAsXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLm5leHQoZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5uZXh0KHtcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5lcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZihkYXRhKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKGRhdGEgPT4gISFkYXRhKVxuICAgICk7XG4gIH1cblxuICBjdXN0b21NdXRhdGlvbiQ8VCA9IGFueT4obmFtZTogc3RyaW5nLCBxdWVyeU9iamVjdDogYW55LCB2YXJpYWJsZXMgPSB7fSk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8VD4+IHtcbiAgICBsZXQgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgIGxldCB2YWx1ZVN0cmluZyA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWVTdHJpbmcpIHtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHZhbHVlU3RyaW5nKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6Jyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyA9IG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5sZW5ndGggXG4gICAgICA/IGAoJHttdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogZ3FsYG11dGF0aW9uICR7bmFtZX0ke3F1ZXJ5fWBcbiAgICB9KTtcbiAgfVxufVxuIl19