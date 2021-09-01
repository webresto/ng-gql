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
                let bySlugGroupId = null;
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
                    if (slug && group.slug == slug) {
                        bySlugGroupId = groupId;
                        continue;
                    }
                    if (!parentGroupId)
                        continue;
                    if (!groupsById[parentGroupId])
                        continue;
                    groupsById[parentGroupId].childGroups.push(group);
                    delete groupsById[groupId];
                }
                if (slug) {
                    if (!bySlugGroupId) {
                        this.menu$.next([]);
                        return;
                    }
                    this.menu$.next(groupsById[bySlugGroupId].childGroups.sort((g1, g2) => g1.order - g2.order));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0UsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBcUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5CbEMsVUFBSyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc1RCxZQUFPLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdELFVBQUssR0FBMEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsb0JBQWUsR0FBb0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPN0UsNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0IsRUFB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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZldGNoUmVzdWx0IH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBBcG9sbG8sIGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgZmlsdGVyLCB0YWtlLCBtYXAsIGNhdGNoRXJyb3IsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL2NhcnQvY2FydCc7XG5pbXBvcnQgeyBDYXJ0R3FsLCBBZGRUb0NhcnRJbnB1dCwgUmVtb3ZlRnJvbUNhcnRJbnB1dCwgT3JkZXJDYXJ0SW5wdXQsIENoZWNrUGhvbmVDb2RlSW5wdXQsIFNldERpc2hBbW91bnRJbnB1dCwgU2V0RGlzaENvbW1lbnRJbnB1dCB9IGZyb20gJy4vY2FydC9jYXJ0LmdxbCc7XG5pbXBvcnQgeyBDaGVja1Bob25lUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcGhvbmUtcmVzcG9uc2UnO1xuaW1wb3J0IHsgQ2hlY2tSZXNwb25zZSB9IGZyb20gJy4vY2FydC9jaGVjay1yZXNwb25zZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vY2FydC9vcmRlcic7XG5pbXBvcnQgeyBQaG9uZSB9IGZyb20gJy4vY2FydC9waG9uZSc7XG5pbXBvcnQgeyBEaXNoIH0gZnJvbSAnLi9kaXNoL2Rpc2gnO1xuaW1wb3J0IHsgRGlzaEdxbCB9IGZyb20gJy4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsgR3JvdXBHcWwgfSBmcm9tICcuL2dyb3VwL2dyb3VwLmdxbCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24nO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkdxbCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmdxbCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kR3FsIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uRGF0YSA9IHtcbiAgW2tleTogc3RyaW5nXTogTmF2aWdhdGlvblxufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHcWxTZXJ2aWNlIHtcblxuICBtZW51JDogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgbWVudUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgZGlzaGVzJDogQmVoYXZpb3JTdWJqZWN0PERpc2hbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBkaXNoZXNMb2FkaW5nOiBib29sZWFuO1xuXG4gIGNhcnQkOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBjYXJ0TG9hZGluZzogYm9vbGVhbjtcblxuICBuYXZpZ2F0aW9uRGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBuYXZpZ2F0aW9uRGF0YUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgcGF5bWVudE1ldGhvZExvYWRpbmc6IGJvb2xlYW47XG4gIGdldFBob25lTG9hZGluZzogYm9vbGVhbjtcbiAgY2hlY2tQaG9uZUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IEJlaGF2aW9yU3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBvbGxvOiBBcG9sbG8pIHtcbiAgICB0aGlzLmNhcnQkLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2coJ2NvbnRyb2wgY2FydCByZXMnLCByZXMpKTtcbiAgfSBcblxuICBnZXROYXZpZ2F0aW9uJCgpOiBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvbkRhdGE+IHtcbiAgICBpZiAoIXRoaXMubmF2aWdhdGlvbkRhdGEkLmdldFZhbHVlKCkgJiYgIXRoaXMubmF2aWdhdGlvbkRhdGFMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogTmF2aWdhdGlvbkdxbC5xdWVyaWVzLmdldE5hdmlnYXRpb25lcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRpb25EYXRhID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBuYXZpZ2F0aW9uIG9mIGRhdGEubmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICBuYXZpZ2F0aW9uRGF0YVtuYXZpZ2F0aW9uLm5hbWVdID0gbmF2aWdhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkRhdGEkLm5leHQobmF2aWdhdGlvbkRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0aW9uRGF0YSQ7XG4gIH1cblxuICBnZXRNZW51JChzbHVnOiBzdHJpbmcgPSBudWxsKTogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+IHtcbiAgICBpZiAoIXRoaXMubWVudUxvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBHcm91cEdxbC5xdWVyaWVzLmdldEdyb3Vwc0FuZERpc2hlcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgeyBncm91cHMsIGRpc2hlcyB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0J5SWQgPSB7fTtcbiAgICAgICAgICAgIGxldCBieVNsdWdHcm91cElkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIEdyb3VwcyBpbmRleGluZ1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbZ3JvdXAuaWRdID0ge1xuICAgICAgICAgICAgICAgIC4uLmdyb3VwLFxuICAgICAgICAgICAgICAgIGRpc2hlczogW10sXG4gICAgICAgICAgICAgICAgY2hpbGRHcm91cHM6IFtdXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbnNlcnRpbmcgZGlzaGVzIGJ5IGdyb3Vwc1xuICAgICAgICAgICAgZm9yIChsZXQgZGlzaCBvZiBkaXNoZXMpIHtcbiAgICAgICAgICAgICAgLy9jb25zdCB7IGdyb3VwSWQgfSA9IGRpc2g7XG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSWQgPSBkaXNoLnBhcmVudEdyb3VwPy5pZDtcbiAgICAgICAgICAgICAgaWYgKCFncm91cElkKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgaWYgKCFncm91cHNCeUlkW2dyb3VwSWRdKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgZ3JvdXBzQnlJZFtncm91cElkXS5kaXNoZXMucHVzaChkaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBncm91cHMgaGllcmFyY2h5XG4gICAgICAgICAgICBmb3IgKGxldCBncm91cElkIGluIGdyb3Vwc0J5SWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRHcm91cElkID0gZ3JvdXAucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBpZiAoc2x1ZyAmJiBncm91cC5zbHVnID09IHNsdWcpIHtcbiAgICAgICAgICAgICAgICBieVNsdWdHcm91cElkID0gZ3JvdXBJZDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudEdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW3BhcmVudEdyb3VwSWRdLmNoaWxkR3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICBkZWxldGUgZ3JvdXBzQnlJZFtncm91cElkXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNsdWcpIHtcbiAgICAgICAgICAgICAgaWYgKCFieVNsdWdHcm91cElkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0J5SWRbYnlTbHVnR3JvdXBJZF0uY2hpbGRHcm91cHMuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBncm91cHNBbmREaXNoZXM6IEdyb3VwW10gPSBPYmplY3QudmFsdWVzKGdyb3Vwc0J5SWQpLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSBhcyBHcm91cFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0FuZERpc2hlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1lbnUkO1xuICB9XG5cbiAgZ2V0RGlzaGVzJCgpOiBCZWhhdmlvclN1YmplY3Q8RGlzaFtdPiB7XG4gICAgaWYgKCF0aGlzLmRpc2hlcyQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5kaXNoZXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogRGlzaEdxbC5xdWVyaWVzLmdldERpc2hlcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzaGVzTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmRpc2hlcyQubmV4dChkYXRhLmRpc2hlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRpc2hlcyQ7XG4gIH1cblxuICBnZXRPcmRlciQob3JkZXJJZDogc3RyaW5nID0gbnVsbCk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0T3JkZXIob3JkZXJJZClcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IGRhdGEuZ2V0T3JkZXIpXG4gICAgICApXG4gIH1cblxuICBnZXRDYXJ0JChjYXJ0SWQ6IHN0cmluZyA9IG51bGwpOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4ge1xuICAgIGNvbnN0IGxhc3RDYXJ0ID0gdGhpcy5jYXJ0JC5nZXRWYWx1ZSgpO1xuICAgIGlmICghKGxhc3RDYXJ0ICYmIGxhc3RDYXJ0LmlkID09IGNhcnRJZCkgJiYgIXRoaXMuY2FydExvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0Q2FydChjYXJ0SWQpLFxuICAgICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FydExvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGRhdGEuY2FydCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhcnQkO1xuICB9XG5cbiAgZ2V0UGhvbmUkKHBob25lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBob25lPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldFBob25lKHBob25lKSxcbiAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRQaG9uZUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLnBob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tQaG9uZSQocGhvbmU6IHN0cmluZyk6IE9ic2VydmFibGU8Q2hlY2tQaG9uZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmNoZWNrUGhvbmUocGhvbmUpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrUGhvbmVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5jaGVja1Bob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0UGF5bWVudE1ldGhvZHMkKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQYXltZW50TWV0aG9kW10+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBQYXltZW50TWV0aG9kR3FsLnF1ZXJpZXMuZ2V0UGF5bWVudE1ldGhvZChjYXJ0SWQpXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TWV0aG9kTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGF5bWVudE1ldGhvZHNcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhOiBBZGRUb0NhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmFkZERpc2hUb0NhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0QWRkRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIG9yZGVyQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5vcmRlckNhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhWydvcmRlckNhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja0NhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhWydjaGVja0NhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrUGhvbmVDb2RlJChkYXRhOiBDaGVja1Bob25lQ29kZUlucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja1Bob25lQ29kZSgpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tQaG9uZVJlc3BvbnNlOiBDaGVja1Bob25lUmVzcG9uc2UgPSBkYXRhWydzZXRQaG9uZUNvZGUnXTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tQaG9uZVJlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkYXRhOiBSZW1vdmVGcm9tQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMucmVtb3ZlRGlzaEZyb21DYXJ0KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFJlbW92ZURpc2gnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQW1vdW50JChkYXRhOiBTZXREaXNoQW1vdW50SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5zZXREaXNoQW1vdW50KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hBbW91bnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQ29tbWVudCQoZGF0YTogU2V0RGlzaENvbW1lbnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hDb21tZW50KCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hDb21tZW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY3VzdG9tUXVlcnkkPFQgPSBhbnk+KG5hbWU6IHN0cmluZywgcXVlcnlPYmplY3Q6IGFueSwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdmFyaWFibGVzW2tleV07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZVN0cmluZykge1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVTdHJpbmcpLnJlcGxhY2UoL1xce1wiKFteXCJdKylcIlxcOi9naSwgJ3skMTonKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gYFwiJHt2YWx1ZVN0cmluZ31cImA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBxdWVyeUFyZ3VtZW50c1N0cmluZ3MucHVzaChgJHtrZXl9OiAke3ZhbHVlU3RyaW5nfWApO1xuICAgIH1cbiAgICBsZXQgcXVlcnlBcmd1bWVudHNTdHJpbmcgPSBxdWVyeUFyZ3VtZW50c1N0cmluZ3MubGVuZ3RoXG4gICAgICA/IGAoJHtxdWVyeUFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBjb25zdCBxdWVyeUtleSA9IChuYW1lICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpLnJlcGxhY2UoL1teYS16MC05XS9naSwgJycpO1xuICAgIGxldCBxdWVyeSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5T2JqZWN0KVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOlthLXowLTldKy9naSwgJycpXG4gICAgICAucmVwbGFjZSgvXFw6L2csICcnKTtcbiAgICBpZihxdWVyeUFyZ3VtZW50c1N0cmluZykge1xuICAgICAgY29uc3QgcXVlcmllc0tleXMgPSBPYmplY3Qua2V5cyhxdWVyeU9iamVjdCk7XG4gICAgICBjb25zdCBjb3VudE9mUXVlcmllcyA9IHF1ZXJpZXNLZXlzLmxlbmd0aDtcbiAgICAgIGlmIChjb3VudE9mUXVlcmllcyA9PSAxKSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKCcoXFx7LiopJyArIHF1ZXJpZXNLZXlzWzBdKSwgJyQxJyArIHF1ZXJpZXNLZXlzWzBdICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLmdldFZhbHVlKCkgJiYgIXRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSkge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxULCBib29sZWFuPih7IFxuICAgICAgICBxdWVyeTogZ3FsYHF1ZXJ5ICR7bmFtZX0ke3F1ZXJ5fWAsXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLm5leHQoZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5uZXh0KHtcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5lcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZihkYXRhKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKGRhdGEgPT4gISFkYXRhKVxuICAgICk7XG4gIH1cblxuICBjdXN0b21NdXRhdGlvbiQ8VCA9IGFueT4obmFtZTogc3RyaW5nLCBxdWVyeU9iamVjdDogYW55LCB2YXJpYWJsZXMgPSB7fSk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8VD4+IHtcbiAgICBsZXQgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgIGxldCB2YWx1ZVN0cmluZyA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWVTdHJpbmcpIHtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHZhbHVlU3RyaW5nKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6Jyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyA9IG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5sZW5ndGggXG4gICAgICA/IGAoJHttdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogZ3FsYG11dGF0aW9uICR7bmFtZX0ke3F1ZXJ5fWBcbiAgICB9KTtcbiAgfVxufVxuIl19