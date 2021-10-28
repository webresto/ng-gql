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
        if (!this.menuLoading) {
            this.apollo.watchQuery({
                query: GroupGql.queries.getGroupsAndDishes(this.customFields)
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
                    try {
                        group.dishes.sort((a, b) => a.order - b.order);
                    }
                    catch (e) {
                        console.warn(`Group ${groupId} sort error`, e);
                    }
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
NgGqlService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgGqlService_Factory() { return new NgGqlService(i0.ɵɵinject(i1.Apollo)); }, token: NgGqlService, providedIn: "root" });
NgGqlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgGqlService.ctorParameters = () => [
    { type: Apollo }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0UsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBdUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJCbEMsVUFBSyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc1RCxZQUFPLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdELFVBQUssR0FBMEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsb0JBQWUsR0FBb0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPN0UsNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0IsRUFB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QU0sQ0FBQyxNQUFNLENBQUM7WUFDeEIsUUFBUSxFQUFFLEdBQUcsQ0FBQSxZQUFZLElBQUksR0FBRyxLQUFLLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztZQW5hRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQXhCUSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmV0Y2hSZXN1bHQgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IEFwb2xsbywgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBmaWx0ZXIsIHRha2UsIG1hcCwgY2F0Y2hFcnJvciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJy4vY2FydC9jYXJ0JztcbmltcG9ydCB7IENhcnRHcWwsIEFkZFRvQ2FydElucHV0LCBSZW1vdmVGcm9tQ2FydElucHV0LCBPcmRlckNhcnRJbnB1dCwgQ2hlY2tQaG9uZUNvZGVJbnB1dCwgU2V0RGlzaEFtb3VudElucHV0LCBTZXREaXNoQ29tbWVudElucHV0IH0gZnJvbSAnLi9jYXJ0L2NhcnQuZ3FsJztcbmltcG9ydCB7IENoZWNrUGhvbmVSZXNwb25zZSB9IGZyb20gJy4vY2FydC9jaGVjay1waG9uZS1yZXNwb25zZSc7XG5pbXBvcnQgeyBDaGVja1Jlc3BvbnNlIH0gZnJvbSAnLi9jYXJ0L2NoZWNrLXJlc3BvbnNlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi9jYXJ0L29yZGVyJztcbmltcG9ydCB7IFBob25lIH0gZnJvbSAnLi9jYXJ0L3Bob25lJztcbmltcG9ydCB7IERpc2ggfSBmcm9tICcuL2Rpc2gvZGlzaCc7XG5pbXBvcnQgeyBEaXNoR3FsIH0gZnJvbSAnLi9kaXNoL2Rpc2guZ3FsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cC9ncm91cCc7XG5pbXBvcnQgeyBHcm91cEdxbCB9IGZyb20gJy4vZ3JvdXAvZ3JvdXAuZ3FsJztcbmltcG9ydCB7IE5hdmlnYXRpb24gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbic7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uR3FsIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uZ3FsJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2QgfSBmcm9tICcuL3BheW1lbnQtbWV0aG9kL3BheW1lbnQtbWV0aG9kJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2RHcWwgfSBmcm9tICcuL3BheW1lbnQtbWV0aG9kL3BheW1lbnQtbWV0aG9kLmdxbCc7XG5cbmV4cG9ydCB0eXBlIE5hdmlnYXRpb25EYXRhID0ge1xuICBba2V5OiBzdHJpbmddOiBOYXZpZ2F0aW9uXG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ0dxbFNlcnZpY2Uge1xuXG4gIG1lbnUkOiBCZWhhdmlvclN1YmplY3Q8R3JvdXBbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBtZW51TG9hZGluZzogYm9vbGVhbjtcblxuICBkaXNoZXMkOiBCZWhhdmlvclN1YmplY3Q8RGlzaFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIGRpc2hlc0xvYWRpbmc6IGJvb2xlYW47XG5cbiAgY2FydCQ6IEJlaGF2aW9yU3ViamVjdDxDYXJ0PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIGNhcnRMb2FkaW5nOiBib29sZWFuO1xuXG4gIG5hdmlnYXRpb25EYXRhJDogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIG5hdmlnYXRpb25EYXRhTG9hZGluZzogYm9vbGVhbjtcblxuICBwYXltZW50TWV0aG9kTG9hZGluZzogYm9vbGVhbjtcbiAgZ2V0UGhvbmVMb2FkaW5nOiBib29sZWFuO1xuICBjaGVja1Bob25lTG9hZGluZzogYm9vbGVhbjtcblxuICBjdXN0b21RdWVyeWllc0RhdGFCeU5hbWU6IHsgW2tleTogc3RyaW5nXTogQmVoYXZpb3JTdWJqZWN0PGFueT4gfSA9IHt9O1xuICBjdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWU6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgY3VzdG9tRmllbGRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nW119ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcG9sbG86IEFwb2xsbykge1xuICAgIHRoaXMuY2FydCQuc3Vic2NyaWJlKHJlcyA9PiBjb25zb2xlLmxvZygnY29udHJvbCBjYXJ0IHJlcycsIHJlcykpO1xuICB9IFxuXG4gIGFkZEN1c3RvbUZpZWxkKG1vZGVsTmFtZTogc3RyaW5nLCBmaWVsZDogc3RyaW5nKSB7XG4gICAgaWYoIXRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0pIHtcbiAgICAgIHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0gPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0uaW5kZXhPZihmaWVsZCkgPT0gLTEpIHtcbiAgICAgIHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0ucHVzaChmaWVsZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmF2aWdhdGlvbiQoKTogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhPiB7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb25EYXRhJC5nZXRWYWx1ZSgpICYmICF0aGlzLm5hdmlnYXRpb25EYXRhTG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IE5hdmlnYXRpb25HcWwucXVlcmllcy5nZXROYXZpZ2F0aW9uZXModGhpcy5jdXN0b21GaWVsZHMpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRpb25EYXRhID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBuYXZpZ2F0aW9uIG9mIGRhdGEubmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICBuYXZpZ2F0aW9uRGF0YVtuYXZpZ2F0aW9uLm5hbWVdID0gbmF2aWdhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkRhdGEkLm5leHQobmF2aWdhdGlvbkRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0aW9uRGF0YSQ7XG4gIH1cblxuICBnZXRNZW51JChzbHVnOiBzdHJpbmcgfCBzdHJpbmdbXSA9IG51bGwpOiBCZWhhdmlvclN1YmplY3Q8R3JvdXBbXT4ge1xuICAgIGlmICghdGhpcy5tZW51TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IEdyb3VwR3FsLnF1ZXJpZXMuZ2V0R3JvdXBzQW5kRGlzaGVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lbnVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIGNvbnN0IHsgZ3JvdXBzLCBkaXNoZXMgfSA9IGRhdGE7XG4gICAgICAgICAgICBjb25zdCBncm91cHNCeUlkID0ge307XG4gICAgICAgICAgICBjb25zdCBncm91cElkc0J5U2x1ZyA9IHt9O1xuICAgICAgICAgICAgLy8gR3JvdXBzIGluZGV4aW5nXG4gICAgICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgZ3JvdXBzQnlJZFtncm91cC5pZF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZ3JvdXAsXG4gICAgICAgICAgICAgICAgZGlzaGVzOiBbXSxcbiAgICAgICAgICAgICAgICBjaGlsZEdyb3VwczogW11cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluc2VydGluZyBkaXNoZXMgYnkgZ3JvdXBzXG4gICAgICAgICAgICBmb3IgKGxldCBkaXNoIG9mIGRpc2hlcykge1xuICAgICAgICAgICAgICAvL2NvbnN0IHsgZ3JvdXBJZCB9ID0gZGlzaDtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJZCA9IGRpc2gucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBpZiAoIWdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbZ3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW2dyb3VwSWRdLmRpc2hlcy5wdXNoKGRpc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3JlYXRlIGdyb3VwcyBoaWVyYXJjaHlcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwSWQgaW4gZ3JvdXBzQnlJZCkge1xuICAgICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc0J5SWRbZ3JvdXBJZF07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGdyb3VwLmRpc2hlcy5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcik7XG4gICAgICAgICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBHcm91cCAke2dyb3VwSWR9IHNvcnQgZXJyb3JgLCBlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50R3JvdXBJZCA9IGdyb3VwLnBhcmVudEdyb3VwPy5pZDtcbiAgICAgICAgICAgICAgZ3JvdXBJZHNCeVNsdWdbZ3JvdXAuc2x1Z10gPSBncm91cElkO1xuICAgICAgICAgICAgICBpZiAoIXBhcmVudEdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW3BhcmVudEdyb3VwSWRdLmNoaWxkR3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICAvL2RlbGV0ZSBncm91cHNCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2x1Zykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzbHVnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBJZHNCeVNsdWdbc2x1Z10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc2x1Z11dLmNoaWxkR3JvdXBzLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgaWYoIXNsdWcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChzbHVnLm1hcChzID0+IGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc11dKSlcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBncm91cHNBbmREaXNoZXM6IEdyb3VwW10gPSBPYmplY3QudmFsdWVzKGdyb3Vwc0J5SWQpLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSBhcyBHcm91cFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0FuZERpc2hlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1lbnUkO1xuICB9XG5cbiAgZ2V0RGlzaGVzJCgpOiBCZWhhdmlvclN1YmplY3Q8RGlzaFtdPiB7XG4gICAgaWYgKCF0aGlzLmRpc2hlcyQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5kaXNoZXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogRGlzaEdxbC5xdWVyaWVzLmdldERpc2hlcyh0aGlzLmN1c3RvbUZpZWxkcylcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNoZXNMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMuZGlzaGVzJC5uZXh0KGRhdGEuZGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzaGVzJDtcbiAgfVxuXG4gIGdldE9yZGVyJChvcmRlcklkOiBzdHJpbmcgPSBudWxsKTogT2JzZXJ2YWJsZTxPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRPcmRlcihvcmRlcklkLCB0aGlzLmN1c3RvbUZpZWxkcylcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IGRhdGEuZ2V0T3JkZXIpXG4gICAgICApXG4gIH1cblxuICBnZXRDYXJ0JChjYXJ0SWQ6IHN0cmluZyA9IG51bGwpOiBCZWhhdmlvclN1YmplY3Q8Q2FydD4ge1xuICAgIGNvbnN0IGxhc3RDYXJ0ID0gdGhpcy5jYXJ0JC5nZXRWYWx1ZSgpO1xuICAgIGlmICghKGxhc3RDYXJ0ICYmIGxhc3RDYXJ0LmlkID09IGNhcnRJZCkgJiYgIXRoaXMuY2FydExvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0Q2FydChjYXJ0SWQsIHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcnRMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMuY2FydCQubmV4dChkYXRhLmNhcnQpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYXJ0JDtcbiAgfVxuXG4gIGdldFBob25lJChwaG9uZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQaG9uZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRQaG9uZShwaG9uZSwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmdldFBob25lTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGhvbmVcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1Bob25lJChwaG9uZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuY2hlY2tQaG9uZShwaG9uZSwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrUGhvbmVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5jaGVja1Bob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0UGF5bWVudE1ldGhvZHMkKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQYXltZW50TWV0aG9kW10+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBQYXltZW50TWV0aG9kR3FsLnF1ZXJpZXMuZ2V0UGF5bWVudE1ldGhvZChjYXJ0SWQsIHRoaXMuY3VzdG9tRmllbGRzKVxuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucGF5bWVudE1ldGhvZExvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLnBheW1lbnRNZXRob2RzXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydCQoZGF0YTogQWRkVG9DYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5hZGREaXNoVG9DYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0QWRkRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIG9yZGVyQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5vcmRlckNhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tSZXNwb25zZTogQ2hlY2tSZXNwb25zZSA9IGRhdGFbJ29yZGVyQ2FydCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjaGVja1Jlc3BvbnNlLmNhcnQpO1xuICAgICAgICAgIHJldHVybiBjaGVja1Jlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY2hlY2tDYXJ0JChkYXRhOiBPcmRlckNhcnRJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmNoZWNrQ2FydCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja1Jlc3BvbnNlOiBDaGVja1Jlc3BvbnNlID0gZGF0YVsnY2hlY2tDYXJ0J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNoZWNrUmVzcG9uc2UuY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjaGVja1Bob25lQ29kZSQoZGF0YTogQ2hlY2tQaG9uZUNvZGVJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tQaG9uZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuY2hlY2tQaG9uZUNvZGUodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tQaG9uZVJlc3BvbnNlOiBDaGVja1Bob25lUmVzcG9uc2UgPSBkYXRhWydzZXRQaG9uZUNvZGUnXTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tQaG9uZVJlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkYXRhOiBSZW1vdmVGcm9tQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMucmVtb3ZlRGlzaEZyb21DYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhWydjYXJ0UmVtb3ZlRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIHNldERpc2hBbW91bnQkKGRhdGE6IFNldERpc2hBbW91bnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hBbW91bnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGFbJ2NhcnRTZXREaXNoQW1vdW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgc2V0RGlzaENvbW1lbnQkKGRhdGE6IFNldERpc2hDb21tZW50SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlKHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5zZXREaXNoQ29tbWVudCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YVsnY2FydFNldERpc2hDb21tZW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY3VzdG9tUXVlcnkkPFQgPSBhbnk+KG5hbWU6IHN0cmluZywgcXVlcnlPYmplY3Q6IGFueSwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdmFyaWFibGVzW2tleV07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZVN0cmluZykge1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVTdHJpbmcpLnJlcGxhY2UoL1xce1wiKFteXCJdKylcIlxcOi9naSwgJ3skMTonKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHZhbHVlU3RyaW5nID0gYFwiJHt2YWx1ZVN0cmluZ31cImA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBxdWVyeUFyZ3VtZW50c1N0cmluZ3MucHVzaChgJHtrZXl9OiAke3ZhbHVlU3RyaW5nfWApO1xuICAgIH1cbiAgICBsZXQgcXVlcnlBcmd1bWVudHNTdHJpbmcgPSBxdWVyeUFyZ3VtZW50c1N0cmluZ3MubGVuZ3RoXG4gICAgICA/IGAoJHtxdWVyeUFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBjb25zdCBxdWVyeUtleSA9IChuYW1lICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpLnJlcGxhY2UoL1teYS16MC05XS9naSwgJycpO1xuICAgIGxldCBxdWVyeSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5T2JqZWN0KVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOlthLXowLTldKy9naSwgJycpXG4gICAgICAucmVwbGFjZSgvXFw6L2csICcnKTtcbiAgICBpZihxdWVyeUFyZ3VtZW50c1N0cmluZykge1xuICAgICAgY29uc3QgcXVlcmllc0tleXMgPSBPYmplY3Qua2V5cyhxdWVyeU9iamVjdCk7XG4gICAgICBjb25zdCBjb3VudE9mUXVlcmllcyA9IHF1ZXJpZXNLZXlzLmxlbmd0aDtcbiAgICAgIGlmIChjb3VudE9mUXVlcmllcyA9PSAxKSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKCcoXFx7LiopJyArIHF1ZXJpZXNLZXlzWzBdKSwgJyQxJyArIHF1ZXJpZXNLZXlzWzBdICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLmdldFZhbHVlKCkgJiYgIXRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSkge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxULCBib29sZWFuPih7IFxuICAgICAgICBxdWVyeTogZ3FsYHF1ZXJ5ICR7bmFtZX0ke3F1ZXJ5fWAsXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLm5leHQoZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5uZXh0KHtcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5lcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZihkYXRhKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKGRhdGEgPT4gISFkYXRhKVxuICAgICk7XG4gIH1cblxuICBjdXN0b21NdXRhdGlvbiQ8VCA9IGFueT4obmFtZTogc3RyaW5nLCBxdWVyeU9iamVjdDogYW55LCB2YXJpYWJsZXMgPSB7fSk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8VD4+IHtcbiAgICBsZXQgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgIGxldCB2YWx1ZVN0cmluZyA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWVTdHJpbmcpIHtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHZhbHVlU3RyaW5nKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6Jyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyA9IG11dGF0aW9uQXJndW1lbnRzU3RyaW5ncy5sZW5ndGggXG4gICAgICA/IGAoJHttdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZSh7XG4gICAgICBtdXRhdGlvbjogZ3FsYG11dGF0aW9uICR7bmFtZX0ke3F1ZXJ5fWBcbiAgICB9KTtcbiAgfVxufVxuIl19