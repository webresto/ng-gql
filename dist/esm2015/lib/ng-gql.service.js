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
NgGqlService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgGqlService_Factory() { return new NgGqlService(i0.ɵɵinject(i1.Apollo)); }, token: NgGqlService, providedIn: "root" });
NgGqlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgGqlService.ctorParameters = () => [
    { type: Apollo }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0UsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBcUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5CbEMsVUFBSyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc1RCxZQUFPLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdELFVBQUssR0FBMEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsb0JBQWUsR0FBb0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPN0UsNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0IsRUFB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Q0FBQyxDQUFDO2FBQy9HO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxHQUFHLENBQUEsWUFBWSxJQUFJLEdBQUcsS0FBSyxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7WUFqWkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUF4QlEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZldGNoUmVzdWx0IH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBBcG9sbG8sIGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgZmlsdGVyLCB0YWtlLCBtYXAsIGNhdGNoRXJyb3IsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL2NhcnQvY2FydCc7XG5pbXBvcnQgeyBDYXJ0R3FsLCBBZGRUb0NhcnRJbnB1dCwgUmVtb3ZlRnJvbUNhcnRJbnB1dCwgT3JkZXJDYXJ0SW5wdXQsIENoZWNrUGhvbmVDb2RlSW5wdXQsIFNldERpc2hBbW91bnRJbnB1dCwgU2V0RGlzaENvbW1lbnRJbnB1dCB9IGZyb20gJy4vY2FydC9jYXJ0LmdxbCc7XG5pbXBvcnQgeyBDaGVja1Bob25lUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcGhvbmUtcmVzcG9uc2UnO1xuaW1wb3J0IHsgQ2hlY2tSZXNwb25zZSB9IGZyb20gJy4vY2FydC9jaGVjay1yZXNwb25zZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vY2FydC9vcmRlcic7XG5pbXBvcnQgeyBQaG9uZSB9IGZyb20gJy4vY2FydC9waG9uZSc7XG5pbXBvcnQgeyBEaXNoIH0gZnJvbSAnLi9kaXNoL2Rpc2gnO1xuaW1wb3J0IHsgRGlzaEdxbCB9IGZyb20gJy4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsgR3JvdXBHcWwgfSBmcm9tICcuL2dyb3VwL2dyb3VwLmdxbCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24nO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkdxbCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmdxbCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kR3FsIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uRGF0YSA9IHtcbiAgW2tleTogc3RyaW5nXTogTmF2aWdhdGlvblxufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHcWxTZXJ2aWNlIHtcblxuICBtZW51JDogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgbWVudUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgZGlzaGVzJDogQmVoYXZpb3JTdWJqZWN0PERpc2hbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBkaXNoZXNMb2FkaW5nOiBib29sZWFuO1xuXG4gIGNhcnQkOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBjYXJ0TG9hZGluZzogYm9vbGVhbjtcblxuICBuYXZpZ2F0aW9uRGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBuYXZpZ2F0aW9uRGF0YUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgcGF5bWVudE1ldGhvZExvYWRpbmc6IGJvb2xlYW47XG4gIGdldFBob25lTG9hZGluZzogYm9vbGVhbjtcbiAgY2hlY2tQaG9uZUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IEJlaGF2aW9yU3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBvbGxvOiBBcG9sbG8pIHtcbiAgICB0aGlzLmNhcnQkLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2coJ2NvbnRyb2wgY2FydCByZXMnLCByZXMpKTtcbiAgfSBcblxuICBnZXROYXZpZ2F0aW9uJCgpOiBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvbkRhdGE+IHtcbiAgICBpZiAoIXRoaXMubmF2aWdhdGlvbkRhdGEkLmdldFZhbHVlKCkgJiYgIXRoaXMubmF2aWdhdGlvbkRhdGFMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogTmF2aWdhdGlvbkdxbC5xdWVyaWVzLmdldE5hdmlnYXRpb25lcygpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRpb25EYXRhID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBuYXZpZ2F0aW9uIG9mIGRhdGEubmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICBuYXZpZ2F0aW9uRGF0YVtuYXZpZ2F0aW9uLm5hbWVdID0gbmF2aWdhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkRhdGEkLm5leHQobmF2aWdhdGlvbkRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0aW9uRGF0YSQ7XG4gIH1cblxuICBnZXRNZW51JChzbHVnOiBzdHJpbmcgfCBzdHJpbmdbXSA9IG51bGwpOiBCZWhhdmlvclN1YmplY3Q8R3JvdXBbXT4ge1xuICAgIGlmICghdGhpcy5tZW51TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IEdyb3VwR3FsLnF1ZXJpZXMuZ2V0R3JvdXBzQW5kRGlzaGVzKClcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZW51TG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICBjb25zdCB7IGdyb3VwcywgZGlzaGVzIH0gPSBkYXRhO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBzQnlJZCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBJZHNCeVNsdWcgPSB7fTtcbiAgICAgICAgICAgIC8vIEdyb3VwcyBpbmRleGluZ1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbZ3JvdXAuaWRdID0ge1xuICAgICAgICAgICAgICAgIC4uLmdyb3VwLFxuICAgICAgICAgICAgICAgIGRpc2hlczogW10sXG4gICAgICAgICAgICAgICAgY2hpbGRHcm91cHM6IFtdXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbnNlcnRpbmcgZGlzaGVzIGJ5IGdyb3Vwc1xuICAgICAgICAgICAgZm9yIChsZXQgZGlzaCBvZiBkaXNoZXMpIHtcbiAgICAgICAgICAgICAgLy9jb25zdCB7IGdyb3VwSWQgfSA9IGRpc2g7XG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSWQgPSBkaXNoLnBhcmVudEdyb3VwPy5pZDtcbiAgICAgICAgICAgICAgaWYgKCFncm91cElkKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgaWYgKCFncm91cHNCeUlkW2dyb3VwSWRdKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgZ3JvdXBzQnlJZFtncm91cElkXS5kaXNoZXMucHVzaChkaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBncm91cHMgaGllcmFyY2h5XG4gICAgICAgICAgICBmb3IgKGxldCBncm91cElkIGluIGdyb3Vwc0J5SWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRHcm91cElkID0gZ3JvdXAucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBncm91cElkc0J5U2x1Z1tncm91cC5zbHVnXSA9IGdyb3VwSWQ7XG4gICAgICAgICAgICAgIGlmICghcGFyZW50R3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtwYXJlbnRHcm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0uY2hpbGRHcm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgIC8vZGVsZXRlIGdyb3Vwc0J5SWRbZ3JvdXBJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbHVnKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHNsdWcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgaWYgKCFncm91cElkc0J5U2x1Z1tzbHVnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQnlJZFtncm91cElkc0J5U2x1Z1tzbHVnXV0uY2hpbGRHcm91cHMuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICBpZighc2x1Zy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KHNsdWcubWFwKHMgPT4gZ3JvdXBzQnlJZFtncm91cElkc0J5U2x1Z1tzXV0pKVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0FuZERpc2hlczogR3JvdXBbXSA9IE9iamVjdC52YWx1ZXMoZ3JvdXBzQnlJZCkuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpIGFzIEdyb3VwW107XG4gICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQW5kRGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWVudSQ7XG4gIH1cblxuICBnZXREaXNoZXMkKCk6IEJlaGF2aW9yU3ViamVjdDxEaXNoW10+IHtcbiAgICBpZiAoIXRoaXMuZGlzaGVzJC5nZXRWYWx1ZSgpICYmICF0aGlzLmRpc2hlc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBEaXNoR3FsLnF1ZXJpZXMuZ2V0RGlzaGVzKClcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNoZXNMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMuZGlzaGVzJC5uZXh0KGRhdGEuZGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzaGVzJDtcbiAgfVxuXG4gIGdldE9yZGVyJChvcmRlcklkOiBzdHJpbmcgPSBudWxsKTogT2JzZXJ2YWJsZTxPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRPcmRlcihvcmRlcklkKVxuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4gZGF0YS5nZXRPcmRlcilcbiAgICAgIClcbiAgfVxuXG4gIGdldENhcnQkKGNhcnRJZDogc3RyaW5nID0gbnVsbCk6IEJlaGF2aW9yU3ViamVjdDxDYXJ0PiB7XG4gICAgY29uc3QgbGFzdENhcnQgPSB0aGlzLmNhcnQkLmdldFZhbHVlKCk7XG4gICAgaWYgKCEobGFzdENhcnQgJiYgbGFzdENhcnQuaWQgPT0gY2FydElkKSAmJiAhdGhpcy5jYXJ0TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRDYXJ0KGNhcnRJZCksXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoZGF0YS5jYXJ0KTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FydCQ7XG4gIH1cblxuICBnZXRQaG9uZSQocGhvbmU6IHN0cmluZyk6IE9ic2VydmFibGU8UGhvbmU+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0UGhvbmUocGhvbmUpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmdldFBob25lTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGhvbmVcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1Bob25lJChwaG9uZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuY2hlY2tQaG9uZShwaG9uZSksXG4gICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hlY2tQaG9uZUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLmNoZWNrUGhvbmVcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBnZXRQYXltZW50TWV0aG9kcyQoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBheW1lbnRNZXRob2RbXT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IFBheW1lbnRNZXRob2RHcWwucXVlcmllcy5nZXRQYXltZW50TWV0aG9kKGNhcnRJZClcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnBheW1lbnRNZXRob2RMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5wYXltZW50TWV0aG9kc1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQkKGRhdGE6IEFkZFRvQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuYWRkRGlzaFRvQ2FydCgpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGFbJ2NhcnRBZGREaXNoJ107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgb3JkZXJDYXJ0JChkYXRhOiBPcmRlckNhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLm9yZGVyQ2FydCgpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tSZXNwb25zZTogQ2hlY2tSZXNwb25zZSA9IGRhdGFbJ29yZGVyQ2FydCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjaGVja1Jlc3BvbnNlLmNhcnQpO1xuICAgICAgICAgIHJldHVybiBjaGVja1Jlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY2hlY2tDYXJ0JChkYXRhOiBPcmRlckNhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmNoZWNrQ2FydCgpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tSZXNwb25zZTogQ2hlY2tSZXNwb25zZSA9IGRhdGFbJ2NoZWNrQ2FydCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjaGVja1Jlc3BvbnNlLmNhcnQpO1xuICAgICAgICAgIHJldHVybiBjaGVja1Jlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY2hlY2tQaG9uZUNvZGUkKGRhdGE6IENoZWNrUGhvbmVDb2RlSW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUGhvbmVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmNoZWNrUGhvbmVDb2RlKCksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja1Bob25lUmVzcG9uc2U6IENoZWNrUGhvbmVSZXNwb25zZSA9IGRhdGFbJ3NldFBob25lQ29kZSddO1xuICAgICAgICAgIHJldHVybiBjaGVja1Bob25lUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQkKGRhdGE6IFJlbW92ZUZyb21DYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5yZW1vdmVEaXNoRnJvbUNhcnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0UmVtb3ZlRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIHNldERpc2hBbW91bnQkKGRhdGE6IFNldERpc2hBbW91bnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hBbW91bnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0U2V0RGlzaEFtb3VudCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIHNldERpc2hDb21tZW50JChkYXRhOiBTZXREaXNoQ29tbWVudElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuc2V0RGlzaENvbW1lbnQoKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0U2V0RGlzaENvbW1lbnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjdXN0b21RdWVyeSQ8VCA9IGFueT4obmFtZTogc3RyaW5nLCBxdWVyeU9iamVjdDogYW55LCB2YXJpYWJsZXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IHF1ZXJ5QXJndW1lbnRzU3RyaW5nczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICBsZXQgdmFsdWVTdHJpbmcgPSB2YXJpYWJsZXNba2V5XTtcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZVN0cmluZykucmVwbGFjZSgvXFx7XCIoW15cIl0rKVwiXFw6L2dpLCAneyQxOicpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZyA9IHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5sZW5ndGhcbiAgICAgID8gYCgke3F1ZXJ5QXJndW1lbnRzU3RyaW5ncy5qb2luKCcsICcpfSlgXG4gICAgICA6IGBgO1xuICAgIGNvbnN0IHF1ZXJ5S2V5ID0gKG5hbWUgKyBxdWVyeUFyZ3VtZW50c1N0cmluZykucmVwbGFjZSgvW15hLXowLTldL2dpLCAnJyk7XG4gICAgbGV0IHF1ZXJ5ID0gSlNPTi5zdHJpbmdpZnkocXVlcnlPYmplY3QpXG4gICAgICAucmVwbGFjZSgvXCIvZywgJycpXG4gICAgICAucmVwbGFjZSgvXFw6W2EtejAtOV0rL2dpLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDovZywgJycpO1xuICAgIGlmKHF1ZXJ5QXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBxdWVyeUFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0pIHtcbiAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XSA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0uZ2V0VmFsdWUoKSAmJiAhdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PFQsIGJvb2xlYW4+KHsgXG4gICAgICAgIHF1ZXJ5OiBncWxgcXVlcnkgJHtuYW1lfSR7cXVlcnl9YCxcbiAgICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0ubmV4dChkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLm5leHQoe1xuICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGRhdGEpID0+IHtcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZGF0YS5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKGRhdGEpO1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIoZGF0YSA9PiAhIWRhdGEpXG4gICAgKTtcbiAgfVxuXG4gIGN1c3RvbU11dGF0aW9uJDxUID0gYW55PihuYW1lOiBzdHJpbmcsIHF1ZXJ5T2JqZWN0OiBhbnksIHZhcmlhYmxlcyA9IHt9KTogT2JzZXJ2YWJsZTxGZXRjaFJlc3VsdDxUPj4ge1xuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdmFyaWFibGVzW2tleV07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZVN0cmluZykge1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVTdHJpbmcpLnJlcGxhY2UoL1xce1wiKFteXCJdKylcIlxcOi9naSwgJ3skMTonKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IGBcIiR7dmFsdWVTdHJpbmd9XCJgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzLnB1c2goYCR7a2V5fTogJHt2YWx1ZVN0cmluZ31gKTtcbiAgICB9XG4gICAgbGV0IG11dGF0aW9uQXJndW1lbnRzU3RyaW5nID0gbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzLmxlbmd0aCBcbiAgICAgID8gYCgke211dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5qb2luKCcsICcpfSlgXG4gICAgICA6IGBgO1xuICAgIGxldCBxdWVyeSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5T2JqZWN0KVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOlthLXowLTldKy9naSwgJycpXG4gICAgICAucmVwbGFjZSgvXFw6L2csICcnKTtcbiAgICBpZiAobXV0YXRpb25Bcmd1bWVudHNTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHF1ZXJpZXNLZXlzID0gT2JqZWN0LmtleXMocXVlcnlPYmplY3QpO1xuICAgICAgY29uc3QgY291bnRPZlF1ZXJpZXMgPSBxdWVyaWVzS2V5cy5sZW5ndGg7XG4gICAgICBpZiAoY291bnRPZlF1ZXJpZXMgPT0gMSkge1xuICAgICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcey4qKScgKyBxdWVyaWVzS2V5c1swXSksICckMScgKyBxdWVyaWVzS2V5c1swXSArIG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBncWxgbXV0YXRpb24gJHtuYW1lfSR7cXVlcnl9YFxuICAgIH0pO1xuICB9XG59XG4iXX0=