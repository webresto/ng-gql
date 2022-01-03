import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, filter, take, map, catchError, switchMap, first } from 'rxjs/operators';
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
        this.customFields = {};
        this.cart$.subscribe(res => console.log('control cart res', res));
    }
    addCustomField(modelName, field) {
        if (!this.customFields[modelName]) {
            this.customFields[modelName] = [];
        }
        if (this.customFields[modelName].indexOf(field) == -1) {
            this.customFields[modelName].push(field);
        }
    }
    getNavigation$() {
        if (!this.navigationData$.getValue() && !this.navigationDataLoading) {
            this.apollo.watchQuery({
                query: NavigationGql.queries.getNavigationes(this.customFields)
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
        if (!this.menu$.getValue() && !this.menuLoading) {
            this.apollo.watchQuery({
                query: GroupGql.queries.getGroupsAndDishes(this.customFields),
                fetchPolicy: "no-cache"
            })
                .valueChanges
                .pipe(first(), tap(({ data, loading }) => {
                this.menuLoading = loading;
                const { groups, dishes } = data;
                const groupsById = {};
                const groupIdsBySlug = {};
                // Groups indexing
                for (let group of groups) {
                    groupsById[group.id] = {
                        ...group,
                        dishes: [],
                        childGroups: []
                    };
                }
                // Inserting dishes by groups
                for (let dish of dishes) {
                    //const { groupId } = dish;
                    const groupId = dish.parentGroup?.id;
                    if (!groupId)
                        continue;
                    if (!groupsById[groupId])
                        continue;
                    groupsById[groupId].dishes.push(dish);
                }
                // Create groups hierarchy
                for (let groupId in groupsById) {
                    const group = groupsById[groupId];
                    try {
                        group.dishes.sort((a, b) => a.order - b.order);
                    }
                    catch (e) {
                        console.warn(`Group ${groupId} sort error`, e);
                    }
                    const parentGroupId = group.parentGroup?.id;
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
                query: DishGql.queries.getDishes(this.customFields)
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
            query: CartGql.queries.getOrder(orderId, this.customFields)
        })
            .valueChanges
            .pipe(take(1), map(({ data }) => data.getOrder));
    }
    getCart$(cartId = null) {
        const lastCart = this.cart$.getValue();
        if (!(lastCart && lastCart.id == cartId) && !this.cartLoading) {
            this.apollo.watchQuery({
                query: CartGql.queries.getCart(cartId, this.customFields),
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
            query: CartGql.queries.getPhone(phone, this.customFields),
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
            query: CartGql.queries.checkPhone(phone, this.customFields),
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
            query: PaymentMethodGql.queries.getPaymentMethod(cartId, this.customFields)
        })
            .valueChanges
            .pipe(map(({ data, loading }) => {
            this.paymentMethodLoading = loading;
            return data.paymentMethods;
        }));
    }
    addDishToCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.addDishToCart(this.customFields),
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
            mutation: CartGql.mutations.orderCart(this.customFields),
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
            mutation: CartGql.mutations.checkCart(this.customFields),
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
            mutation: CartGql.mutations.checkPhoneCode(this.customFields),
            variables: data
        })
            .pipe(map(({ data }) => {
            const checkPhoneResponse = data['setPhoneCode'];
            return checkPhoneResponse;
        }));
    }
    removeDishFromCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.removeDishFromCart(this.customFields),
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
            mutation: CartGql.mutations.setDishAmount(this.customFields),
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
            mutation: CartGql.mutations.setDishComment(this.customFields),
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
NgGqlService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlService, deps: [{ token: i1.Apollo }], target: i0.ɵɵFactoryTarget.Injectable });
NgGqlService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Apollo }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFVLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEYsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBdUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJCbEMsVUFBSyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc1RCxZQUFPLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdELFVBQUssR0FBMEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsb0JBQWUsR0FBb0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPN0UsNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0IsRUFB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QUUsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDO2FBQy9HO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxHQUFHLENBQUEsWUFBWSxJQUFJLEdBQUcsS0FBSyxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7O3lHQWxhVSxZQUFZOzZHQUFaLFlBQVksY0FGWCxNQUFNOzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmV0Y2hSZXN1bHQgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IEFwb2xsbywgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBmaWx0ZXIsIHRha2UsIG1hcCwgY2F0Y2hFcnJvciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL2NhcnQvY2FydCc7XG5pbXBvcnQgeyBDYXJ0R3FsLCBBZGRUb0NhcnRJbnB1dCwgUmVtb3ZlRnJvbUNhcnRJbnB1dCwgT3JkZXJDYXJ0SW5wdXQsIENoZWNrUGhvbmVDb2RlSW5wdXQsIFNldERpc2hBbW91bnRJbnB1dCwgU2V0RGlzaENvbW1lbnRJbnB1dCB9IGZyb20gJy4vY2FydC9jYXJ0LmdxbCc7XG5pbXBvcnQgeyBDaGVja1Bob25lUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcGhvbmUtcmVzcG9uc2UnO1xuaW1wb3J0IHsgQ2hlY2tSZXNwb25zZSB9IGZyb20gJy4vY2FydC9jaGVjay1yZXNwb25zZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vY2FydC9vcmRlcic7XG5pbXBvcnQgeyBQaG9uZSB9IGZyb20gJy4vY2FydC9waG9uZSc7XG5pbXBvcnQgeyBEaXNoIH0gZnJvbSAnLi9kaXNoL2Rpc2gnO1xuaW1wb3J0IHsgRGlzaEdxbCB9IGZyb20gJy4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsgR3JvdXBHcWwgfSBmcm9tICcuL2dyb3VwL2dyb3VwLmdxbCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24nO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkdxbCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmdxbCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kR3FsIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uRGF0YSA9IHtcbiAgW2tleTogc3RyaW5nXTogTmF2aWdhdGlvblxufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHcWxTZXJ2aWNlIHtcblxuICBtZW51JDogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgbWVudUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgZGlzaGVzJDogQmVoYXZpb3JTdWJqZWN0PERpc2hbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBkaXNoZXNMb2FkaW5nOiBib29sZWFuO1xuXG4gIGNhcnQkOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBjYXJ0TG9hZGluZzogYm9vbGVhbjtcblxuICBuYXZpZ2F0aW9uRGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBuYXZpZ2F0aW9uRGF0YUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgcGF5bWVudE1ldGhvZExvYWRpbmc6IGJvb2xlYW47XG4gIGdldFBob25lTG9hZGluZzogYm9vbGVhbjtcbiAgY2hlY2tQaG9uZUxvYWRpbmc6IGJvb2xlYW47XG5cbiAgY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IEJlaGF2aW9yU3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIGN1c3RvbUZpZWxkczoge1trZXk6IHN0cmluZ106IHN0cmluZ1tdfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBvbGxvOiBBcG9sbG8pIHtcbiAgICB0aGlzLmNhcnQkLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2coJ2NvbnRyb2wgY2FydCByZXMnLCByZXMpKTtcbiAgfSBcblxuICBhZGRDdXN0b21GaWVsZChtb2RlbE5hbWU6IHN0cmluZywgZmllbGQ6IHN0cmluZykge1xuICAgIGlmKCF0aGlzLmN1c3RvbUZpZWxkc1ttb2RlbE5hbWVdKSB7XG4gICAgICB0aGlzLmN1c3RvbUZpZWxkc1ttb2RlbE5hbWVdID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkc1ttb2RlbE5hbWVdLmluZGV4T2YoZmllbGQpID09IC0xKSB7XG4gICAgICB0aGlzLmN1c3RvbUZpZWxkc1ttb2RlbE5hbWVdLnB1c2goZmllbGQpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hdmlnYXRpb24kKCk6IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YT4ge1xuICAgIGlmICghdGhpcy5uYXZpZ2F0aW9uRGF0YSQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5uYXZpZ2F0aW9uRGF0YUxvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBOYXZpZ2F0aW9uR3FsLnF1ZXJpZXMuZ2V0TmF2aWdhdGlvbmVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lbnVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25EYXRhOiBOYXZpZ2F0aW9uRGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgbmF2aWdhdGlvbiBvZiBkYXRhLm5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgbmF2aWdhdGlvbkRhdGFbbmF2aWdhdGlvbi5uYW1lXSA9IG5hdmlnYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25EYXRhJC5uZXh0KG5hdmlnYXRpb25EYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGlvbkRhdGEkO1xuICB9XG5cbiAgZ2V0TWVudSQoc2x1Zzogc3RyaW5nIHwgc3RyaW5nW10gPSBudWxsKTogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10+IHtcbiAgICBpZiAoIXRoaXMubWVudSQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5tZW51TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IEdyb3VwR3FsLnF1ZXJpZXMuZ2V0R3JvdXBzQW5kRGlzaGVzKHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgICAgZmV0Y2hQb2xpY3k6IFwibm8tY2FjaGVcIlxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgeyBncm91cHMsIGRpc2hlcyB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0J5SWQgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwSWRzQnlTbHVnID0ge307XG4gICAgICAgICAgICAvLyBHcm91cHMgaW5kZXhpbmdcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICBncm91cHNCeUlkW2dyb3VwLmlkXSA9IHtcbiAgICAgICAgICAgICAgICAuLi5ncm91cCxcbiAgICAgICAgICAgICAgICBkaXNoZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNoaWxkR3JvdXBzOiBbXVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW5zZXJ0aW5nIGRpc2hlcyBieSBncm91cHNcbiAgICAgICAgICAgIGZvciAobGV0IGRpc2ggb2YgZGlzaGVzKSB7XG4gICAgICAgICAgICAgIC8vY29uc3QgeyBncm91cElkIH0gPSBkaXNoO1xuICAgICAgICAgICAgICBjb25zdCBncm91cElkID0gZGlzaC5wYXJlbnRHcm91cD8uaWQ7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtncm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbZ3JvdXBJZF0uZGlzaGVzLnB1c2goZGlzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDcmVhdGUgZ3JvdXBzIGhpZXJhcmNoeVxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cHNCeUlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzQnlJZFtncm91cElkXTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuZGlzaGVzLnNvcnQoKGEsIGIpID0+IGEub3JkZXIgLSBiLm9yZGVyKTtcbiAgICAgICAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEdyb3VwICR7Z3JvdXBJZH0gc29ydCBlcnJvcmAsIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRHcm91cElkID0gZ3JvdXAucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBncm91cElkc0J5U2x1Z1tncm91cC5zbHVnXSA9IGdyb3VwSWQ7XG4gICAgICAgICAgICAgIGlmICghcGFyZW50R3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtwYXJlbnRHcm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0uY2hpbGRHcm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgIC8vZGVsZXRlIGdyb3Vwc0J5SWRbZ3JvdXBJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbHVnKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHNsdWcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgaWYgKCFncm91cElkc0J5U2x1Z1tzbHVnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQnlJZFtncm91cElkc0J5U2x1Z1tzbHVnXV0uY2hpbGRHcm91cHMuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICBpZighc2x1Zy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KHNsdWcubWFwKHMgPT4gZ3JvdXBzQnlJZFtncm91cElkc0J5U2x1Z1tzXV0pKVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0FuZERpc2hlczogR3JvdXBbXSA9IE9iamVjdC52YWx1ZXMoZ3JvdXBzQnlJZCkuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpIGFzIEdyb3VwW107XG4gICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQW5kRGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWVudSQ7XG4gIH1cblxuICBnZXREaXNoZXMkKCk6IEJlaGF2aW9yU3ViamVjdDxEaXNoW10+IHtcbiAgICBpZiAoIXRoaXMuZGlzaGVzJC5nZXRWYWx1ZSgpICYmICF0aGlzLmRpc2hlc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBEaXNoR3FsLnF1ZXJpZXMuZ2V0RGlzaGVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc2hlc0xvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5kaXNoZXMkLm5leHQoZGF0YS5kaXNoZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaXNoZXMkO1xuICB9XG5cbiAgZ2V0T3JkZXIkKG9yZGVySWQ6IHN0cmluZyA9IG51bGwpOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldE9yZGVyKG9yZGVySWQsIHRoaXMuY3VzdG9tRmllbGRzKVxuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4gZGF0YS5nZXRPcmRlcilcbiAgICAgIClcbiAgfVxuXG4gIGdldENhcnQkKGNhcnRJZDogc3RyaW5nID0gbnVsbCk6IEJlaGF2aW9yU3ViamVjdDxDYXJ0PiB7XG4gICAgY29uc3QgbGFzdENhcnQgPSB0aGlzLmNhcnQkLmdldFZhbHVlKCk7XG4gICAgaWYgKCEobGFzdENhcnQgJiYgbGFzdENhcnQuaWQgPT0gY2FydElkKSAmJiAhdGhpcy5jYXJ0TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRDYXJ0KGNhcnRJZCwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FydExvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGRhdGEuY2FydCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhcnQkO1xuICB9XG5cbiAgZ2V0UGhvbmUkKHBob25lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBob25lPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldFBob25lKHBob25lLCB0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0UGhvbmVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5waG9uZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrUGhvbmUkKHBob25lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENoZWNrUGhvbmVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5jaGVja1Bob25lKHBob25lLCB0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJ1xuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hlY2tQaG9uZUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLmNoZWNrUGhvbmVcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBnZXRQYXltZW50TWV0aG9kcyQoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBheW1lbnRNZXRob2RbXT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IFBheW1lbnRNZXRob2RHcWwucXVlcmllcy5nZXRQYXltZW50TWV0aG9kKGNhcnRJZCwgdGhpcy5jdXN0b21GaWVsZHMpXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TWV0aG9kTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGF5bWVudE1ldGhvZHNcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhOiBBZGRUb0NhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmFkZERpc2hUb0NhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGFbJ2NhcnRBZGREaXNoJ107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgb3JkZXJDYXJ0JChkYXRhOiBPcmRlckNhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLm9yZGVyQ2FydCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja1Jlc3BvbnNlOiBDaGVja1Jlc3BvbnNlID0gZGF0YVsnb3JkZXJDYXJ0J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNoZWNrUmVzcG9uc2UuY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjaGVja0NhcnQkKGRhdGE6IE9yZGVyQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuY2hlY2tDYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhWydjaGVja0NhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrUGhvbmVDb2RlJChkYXRhOiBDaGVja1Bob25lQ29kZUlucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja1Bob25lQ29kZSh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja1Bob25lUmVzcG9uc2U6IENoZWNrUGhvbmVSZXNwb25zZSA9IGRhdGFbJ3NldFBob25lQ29kZSddO1xuICAgICAgICAgIHJldHVybiBjaGVja1Bob25lUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQkKGRhdGE6IFJlbW92ZUZyb21DYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGFbJ2NhcnRSZW1vdmVEaXNoJ107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgc2V0RGlzaEFtb3VudCQoZGF0YTogU2V0RGlzaEFtb3VudElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuc2V0RGlzaEFtb3VudCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hBbW91bnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQ29tbWVudCQoZGF0YTogU2V0RGlzaENvbW1lbnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hDb21tZW50KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0U2V0RGlzaENvbW1lbnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjdXN0b21RdWVyeSQ8VCA9IGFueT4obmFtZTogc3RyaW5nLCBxdWVyeU9iamVjdDogYW55LCB2YXJpYWJsZXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IHF1ZXJ5QXJndW1lbnRzU3RyaW5nczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICBsZXQgdmFsdWVTdHJpbmcgPSB2YXJpYWJsZXNba2V5XTtcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZVN0cmluZykucmVwbGFjZSgvXFx7XCIoW15cIl0rKVwiXFw6L2dpLCAneyQxOicpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZyA9IHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5sZW5ndGhcbiAgICAgID8gYCgke3F1ZXJ5QXJndW1lbnRzU3RyaW5ncy5qb2luKCcsICcpfSlgXG4gICAgICA6IGBgO1xuICAgIGNvbnN0IHF1ZXJ5S2V5ID0gKG5hbWUgKyBxdWVyeUFyZ3VtZW50c1N0cmluZykucmVwbGFjZSgvW15hLXowLTldL2dpLCAnJyk7XG4gICAgbGV0IHF1ZXJ5ID0gSlNPTi5zdHJpbmdpZnkocXVlcnlPYmplY3QpXG4gICAgICAucmVwbGFjZSgvXCIvZywgJycpXG4gICAgICAucmVwbGFjZSgvXFw6W2EtejAtOV0rL2dpLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDovZywgJycpO1xuICAgIGlmKHF1ZXJ5QXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBxdWVyeUFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0pIHtcbiAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XSA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0uZ2V0VmFsdWUoKSAmJiAhdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PFQsIGJvb2xlYW4+KHsgXG4gICAgICAgIHF1ZXJ5OiBncWxgcXVlcnkgJHtuYW1lfSR7cXVlcnl9YCxcbiAgICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0ubmV4dChkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLm5leHQoe1xuICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGRhdGEpID0+IHtcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZGF0YS5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKGRhdGEpO1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIoZGF0YSA9PiAhIWRhdGEpXG4gICAgKTtcbiAgfVxuXG4gIGN1c3RvbU11dGF0aW9uJDxUID0gYW55PihuYW1lOiBzdHJpbmcsIHF1ZXJ5T2JqZWN0OiBhbnksIHZhcmlhYmxlcyA9IHt9KTogT2JzZXJ2YWJsZTxGZXRjaFJlc3VsdDxUPj4ge1xuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdmFyaWFibGVzW2tleV07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZVN0cmluZykge1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVTdHJpbmcpLnJlcGxhY2UoL1xce1wiKFteXCJdKylcIlxcOi9naSwgJ3skMTonKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IGBcIiR7dmFsdWVTdHJpbmd9XCJgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzLnB1c2goYCR7a2V5fTogJHt2YWx1ZVN0cmluZ31gKTtcbiAgICB9XG4gICAgbGV0IG11dGF0aW9uQXJndW1lbnRzU3RyaW5nID0gbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzLmxlbmd0aCBcbiAgICAgID8gYCgke211dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5qb2luKCcsICcpfSlgXG4gICAgICA6IGBgO1xuICAgIGxldCBxdWVyeSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5T2JqZWN0KVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOlthLXowLTldKy9naSwgJycpXG4gICAgICAucmVwbGFjZSgvXFw6L2csICcnKTtcbiAgICBpZiAobXV0YXRpb25Bcmd1bWVudHNTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHF1ZXJpZXNLZXlzID0gT2JqZWN0LmtleXMocXVlcnlPYmplY3QpO1xuICAgICAgY29uc3QgY291bnRPZlF1ZXJpZXMgPSBxdWVyaWVzS2V5cy5sZW5ndGg7XG4gICAgICBpZiAoY291bnRPZlF1ZXJpZXMgPT0gMSkge1xuICAgICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcey4qKScgKyBxdWVyaWVzS2V5c1swXSksICckMScgKyBxdWVyaWVzS2V5c1swXSArIG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBncWxgbXV0YXRpb24gJHtuYW1lfSR7cXVlcnl9YFxuICAgIH0pO1xuICB9XG59XG4iXX0=