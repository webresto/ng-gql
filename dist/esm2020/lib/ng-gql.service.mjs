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
    getMenu$(slug) {
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
                    groupsById[groupId].dishes?.push(dish);
                }
                // Create groups hierarchy
                for (let groupId in groupsById) {
                    const group = groupsById[groupId];
                    try {
                        group.dishes?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
    getOrder$(orderId) {
        return this.apollo.watchQuery({
            query: CartGql.queries.getOrder(orderId, this.customFields)
        })
            .valueChanges
            .pipe(take(1), map(({ data }) => data.getOrder));
    }
    getCart$(cartId) {
        const lastCart = this.cart$.getValue();
        if (!(lastCart && lastCart.id == cartId) && !this.cartLoading) {
            this.apollo.watchQuery({
                query: CartGql.queries.getCart(cartId, this.customFields),
                canonizeResults: true,
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
            const cart = data.cartAddDish;
            if (cart) {
                this.cart$.next(cart);
            }
            ;
            return cart;
        }));
    }
    orderCart$(data) {
        return this.apollo.mutate({
            mutation: CartGql.mutations.orderCart(this.customFields),
            variables: data
        })
            .pipe(map(({ data }) => {
            const checkResponse = data.orderCart;
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
                canonizeResults: true,
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
            let valueString = typeof variables[key] == 'string' ?
                `"${variables[key]}"` :
                JSON.stringify(variables[key]).replace(/\{"([^"]+)"\:/gi, '{$1:');
            mutationArgumentsStrings.push(`${key}: ${valueString}`);
        }
        let mutationArgumentsString = mutationArgumentsStrings.length !== 0
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
            mutation: gql `mutation ${name}${query}`,
            awaitRefetchQueries: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFVLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEYsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBdUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJCbEMsVUFBSyxHQUFvQyxJQUFJLGVBQWUsQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFHbkYsWUFBTyxHQUFtQyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFHbkYsVUFBSyxHQUFpQyxJQUFJLGVBQWUsQ0FBYyxJQUFJLENBQUMsQ0FBQztRQUc3RSxvQkFBZSxHQUEyQyxJQUFJLGVBQWUsQ0FBd0IsSUFBSSxDQUFDLENBQUM7UUFPM0csNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0Is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QUMsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsdUJBQXVCLENBQUMsQ0FBQzthQUMvRztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN4QixRQUFRLEVBQUUsR0FBRyxDQUFBLFlBQVksSUFBSSxHQUFHLEtBQUssRUFBRTtZQUN2QyxtQkFBbUIsRUFBRSxJQUFJO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUM7O3lHQXBiVSxZQUFZOzZHQUFaLFlBQVksY0FGWCxNQUFNOzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmV0Y2hSZXN1bHQgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IEFwb2xsbywgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBmaWx0ZXIsIHRha2UsIG1hcCwgY2F0Y2hFcnJvciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL2NhcnQvY2FydCc7XG5pbXBvcnQgeyBDYXJ0R3FsLCBBZGRUb0NhcnRJbnB1dCwgUmVtb3ZlRnJvbUNhcnRJbnB1dCwgT3JkZXJDYXJ0SW5wdXQsIENoZWNrUGhvbmVDb2RlSW5wdXQsIFNldERpc2hBbW91bnRJbnB1dCwgU2V0RGlzaENvbW1lbnRJbnB1dCB9IGZyb20gJy4vY2FydC9jYXJ0LmdxbCc7XG5pbXBvcnQgeyBDaGVja1Bob25lUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcGhvbmUtcmVzcG9uc2UnO1xuaW1wb3J0IHsgQ2hlY2tSZXNwb25zZSB9IGZyb20gJy4vY2FydC9jaGVjay1yZXNwb25zZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vY2FydC9vcmRlcic7XG5pbXBvcnQgeyBQaG9uZSB9IGZyb20gJy4vY2FydC9waG9uZSc7XG5pbXBvcnQgeyBEaXNoIH0gZnJvbSAnLi9kaXNoL2Rpc2gnO1xuaW1wb3J0IHsgRGlzaEdxbCB9IGZyb20gJy4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsgR3JvdXBHcWwgfSBmcm9tICcuL2dyb3VwL2dyb3VwLmdxbCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24nO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkdxbCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmdxbCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kR3FsIH0gZnJvbSAnLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uRGF0YSA9IHtcbiAgW2tleTogc3RyaW5nXTogTmF2aWdhdGlvblxufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHcWxTZXJ2aWNlIHtcblxuICBtZW51JDogQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R3JvdXBbXSB8IG51bGw+KG51bGwpO1xuICBtZW51TG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBkaXNoZXMkOiBCZWhhdmlvclN1YmplY3Q8RGlzaFtdIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERpc2hbXSB8IG51bGw+KG51bGwpO1xuICBkaXNoZXNMb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIGNhcnQkOiBCZWhhdmlvclN1YmplY3Q8Q2FydCB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDYXJ0IHwgbnVsbD4obnVsbCk7XG4gIGNhcnRMb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIG5hdmlnYXRpb25EYXRhJDogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhIHwgbnVsbD4obnVsbCk7XG4gIG5hdmlnYXRpb25EYXRhTG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBwYXltZW50TWV0aG9kTG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgZ2V0UGhvbmVMb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBjaGVja1Bob25lTG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBjdXN0b21RdWVyeWllc0RhdGFCeU5hbWU6IHsgW2tleTogc3RyaW5nXTogQmVoYXZpb3JTdWJqZWN0PGFueT4gfSA9IHt9O1xuICBjdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWU6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgY3VzdG9tRmllbGRzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwb2xsbzogQXBvbGxvKSB7XG4gICAgdGhpcy5jYXJ0JC5zdWJzY3JpYmUocmVzID0+IGNvbnNvbGUubG9nKCdjb250cm9sIGNhcnQgcmVzJywgcmVzKSk7XG4gIH1cblxuICBhZGRDdXN0b21GaWVsZChtb2RlbE5hbWU6IHN0cmluZywgZmllbGQ6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5jdXN0b21GaWVsZHNbbW9kZWxOYW1lXSkge1xuICAgICAgdGhpcy5jdXN0b21GaWVsZHNbbW9kZWxOYW1lXSA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXN0b21GaWVsZHNbbW9kZWxOYW1lXS5pbmRleE9mKGZpZWxkKSA9PSAtMSkge1xuICAgICAgdGhpcy5jdXN0b21GaWVsZHNbbW9kZWxOYW1lXS5wdXNoKGZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBnZXROYXZpZ2F0aW9uJCgpOiBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvbkRhdGEgfCBudWxsPiB7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb25EYXRhJC5nZXRWYWx1ZSgpICYmICF0aGlzLm5hdmlnYXRpb25EYXRhTG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IE5hdmlnYXRpb25HcWwucXVlcmllcy5nZXROYXZpZ2F0aW9uZXModGhpcy5jdXN0b21GaWVsZHMpXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRpb25EYXRhID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBuYXZpZ2F0aW9uIG9mIGRhdGEubmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICBuYXZpZ2F0aW9uRGF0YVtuYXZpZ2F0aW9uLm5hbWVdID0gbmF2aWdhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkRhdGEkLm5leHQobmF2aWdhdGlvbkRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0aW9uRGF0YSQ7XG4gIH1cblxuICBnZXRNZW51JChzbHVnOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCk6IEJlaGF2aW9yU3ViamVjdDxHcm91cFtdIHwgbnVsbD4ge1xuICAgIGlmICghdGhpcy5tZW51JC5nZXRWYWx1ZSgpICYmICF0aGlzLm1lbnVMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogR3JvdXBHcWwucXVlcmllcy5nZXRHcm91cHNBbmREaXNoZXModGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgICBmZXRjaFBvbGljeTogXCJuby1jYWNoZVwiXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZW51TG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICBjb25zdCB7IGdyb3VwcywgZGlzaGVzIH0gPSBkYXRhO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBzQnlJZDoge1xuICAgICAgICAgICAgICBba2V5OiBzdHJpbmddOiBHcm91cFxuICAgICAgICAgICAgfSA9IHt9O1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBJZHNCeVNsdWc6IHtcbiAgICAgICAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gICAgICAgICAgICB9ID0ge307XG4gICAgICAgICAgICAvLyBHcm91cHMgaW5kZXhpbmdcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICBncm91cHNCeUlkW2dyb3VwLmlkXSA9IHtcbiAgICAgICAgICAgICAgICAuLi5ncm91cCxcbiAgICAgICAgICAgICAgICBkaXNoZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNoaWxkR3JvdXBzOiBbXVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW5zZXJ0aW5nIGRpc2hlcyBieSBncm91cHNcbiAgICAgICAgICAgIGZvciAobGV0IGRpc2ggb2YgZGlzaGVzKSB7XG4gICAgICAgICAgICAgIC8vY29uc3QgeyBncm91cElkIH0gPSBkaXNoO1xuICAgICAgICAgICAgICBjb25zdCBncm91cElkID0gZGlzaC5wYXJlbnRHcm91cD8uaWQ7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtncm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbZ3JvdXBJZF0uZGlzaGVzPy5wdXNoKGRpc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3JlYXRlIGdyb3VwcyBoaWVyYXJjaHlcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwSWQgaW4gZ3JvdXBzQnlJZCkge1xuICAgICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc0J5SWRbZ3JvdXBJZF07XG5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBncm91cC5kaXNoZXM/LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyID8/IDApIC0gKGIub3JkZXIgPz8gMCkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBHcm91cCAke2dyb3VwSWR9IHNvcnQgZXJyb3JgLCBlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSBncm91cC5wYXJlbnRHcm91cD8uaWQ7XG4gICAgICAgICAgICAgIGdyb3VwSWRzQnlTbHVnW2dyb3VwLnNsdWchXSA9IGdyb3VwSWQ7XG4gICAgICAgICAgICAgIGlmICghcGFyZW50R3JvdXBJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBzQnlJZFtwYXJlbnRHcm91cElkXSkgY29udGludWU7XG4gICAgICAgICAgICAgIGdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0uY2hpbGRHcm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgIC8vZGVsZXRlIGdyb3Vwc0J5SWRbZ3JvdXBJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbHVnKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHNsdWcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgaWYgKCFncm91cElkc0J5U2x1Z1tzbHVnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQnlJZFtncm91cElkc0J5U2x1Z1tzbHVnXV0uY2hpbGRHcm91cHMuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICBpZiAoIXNsdWcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChzbHVnLm1hcChzID0+IGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc11dKSlcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBzQW5kRGlzaGVzOiBHcm91cFtdID0gT2JqZWN0LnZhbHVlcyhncm91cHNCeUlkKS5zb3J0KChnMTogR3JvdXAsIGcyOiBHcm91cCkgPT4gZzEub3JkZXIgLSBnMi5vcmRlcikgYXMgR3JvdXBbXTtcbiAgICAgICAgICAgIHRoaXMubWVudSQubmV4dChncm91cHNBbmREaXNoZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tZW51JDtcbiAgfVxuXG4gIGdldERpc2hlcyQoKTogQmVoYXZpb3JTdWJqZWN0PERpc2hbXSB8IG51bGw+IHtcbiAgICBpZiAoIXRoaXMuZGlzaGVzJC5nZXRWYWx1ZSgpICYmICF0aGlzLmRpc2hlc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBEaXNoR3FsLnF1ZXJpZXMuZ2V0RGlzaGVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc2hlc0xvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgdGhpcy5kaXNoZXMkLm5leHQoZGF0YS5kaXNoZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaXNoZXMkO1xuICB9XG5cbiAgZ2V0T3JkZXIkKG9yZGVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0T3JkZXIob3JkZXJJZCwgdGhpcy5jdXN0b21GaWVsZHMpXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiBkYXRhLmdldE9yZGVyKVxuICAgICAgKVxuICB9XG5cbiAgZ2V0Q2FydCQoY2FydElkOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBCZWhhdmlvclN1YmplY3Q8Q2FydCB8IG51bGw+IHtcbiAgICBjb25zdCBsYXN0Q2FydCA9IHRoaXMuY2FydCQuZ2V0VmFsdWUoKTtcbiAgICBpZiAoIShsYXN0Q2FydCAmJiBsYXN0Q2FydC5pZCA9PSBjYXJ0SWQpICYmICF0aGlzLmNhcnRMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldENhcnQoY2FydElkLCB0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICAgIGNhbm9uaXplUmVzdWx0czogdHJ1ZSxcbiAgICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcnRMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMuY2FydCQubmV4dChkYXRhLmNhcnQpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYXJ0JDtcbiAgfVxuXG4gIGdldFBob25lJChwaG9uZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQaG9uZT4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRQaG9uZShwaG9uZSwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmdldFBob25lTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGhvbmVcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1Bob25lJChwaG9uZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuY2hlY2tQaG9uZShwaG9uZSwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgZmV0Y2hQb2xpY3k6ICduby1jYWNoZSdcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrUGhvbmVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5jaGVja1Bob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0UGF5bWVudE1ldGhvZHMkKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQYXltZW50TWV0aG9kW10+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBQYXltZW50TWV0aG9kR3FsLnF1ZXJpZXMuZ2V0UGF5bWVudE1ldGhvZChjYXJ0SWQsIHRoaXMuY3VzdG9tRmllbGRzKVxuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucGF5bWVudE1ldGhvZExvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLnBheW1lbnRNZXRob2RzXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydCQoZGF0YTogQWRkVG9DYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIGNhcnRBZGREaXNoOiBDYXJ0XG4gICAgfT4oe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmFkZERpc2hUb0NhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGEhLmNhcnRBZGREaXNoO1xuICAgICAgICAgIGlmIChjYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIG9yZGVyQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIG9yZGVyQ2FydDogQ2hlY2tSZXNwb25zZVxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5vcmRlckNhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tSZXNwb25zZTogQ2hlY2tSZXNwb25zZSA9IGRhdGEhLm9yZGVyQ2FydDtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrQ2FydCQoZGF0YTogT3JkZXJDYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENoZWNrUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIGNoZWNrQ2FydDogQ2hlY2tSZXNwb25zZVxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja0NhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tSZXNwb25zZTogQ2hlY2tSZXNwb25zZSA9IGRhdGEhWydjaGVja0NhcnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2hlY2tSZXNwb25zZS5jYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tSZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGNoZWNrUGhvbmVDb2RlJChkYXRhOiBDaGVja1Bob25lQ29kZUlucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Bob25lUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIHNldFBob25lQ29kZTogQ2hlY2tQaG9uZVJlc3BvbnNlXG4gICAgfT4oe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLmNoZWNrUGhvbmVDb2RlKHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUGhvbmVSZXNwb25zZTogQ2hlY2tQaG9uZVJlc3BvbnNlID0gZGF0YSFbJ3NldFBob25lQ29kZSddO1xuICAgICAgICAgIHJldHVybiBjaGVja1Bob25lUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQkKGRhdGE6IFJlbW92ZUZyb21DYXJ0SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIGNhcnRSZW1vdmVEaXNoOiBDYXJ0XG4gICAgfT4oe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnJlbW92ZURpc2hGcm9tQ2FydCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YSFbJ2NhcnRSZW1vdmVEaXNoJ107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgc2V0RGlzaEFtb3VudCQoZGF0YTogU2V0RGlzaEFtb3VudElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBjYXJ0U2V0RGlzaEFtb3VudDogQ2FydFxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5zZXREaXNoQW1vdW50KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhIVsnY2FydFNldERpc2hBbW91bnQnXTtcbiAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBzZXREaXNoQ29tbWVudCQoZGF0YTogU2V0RGlzaENvbW1lbnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGU8e1xuICAgICAgY2FydFNldERpc2hDb21tZW50OiBDYXJ0XG4gICAgfT4oe1xuICAgICAgbXV0YXRpb246IENhcnRHcWwubXV0YXRpb25zLnNldERpc2hDb21tZW50KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhIVsnY2FydFNldERpc2hDb21tZW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgY3VzdG9tUXVlcnkkPFQsIE4gZXh0ZW5kcyBzdHJpbmcgPSBgJHtzdHJpbmd9YD4obmFtZTogTiwgcXVlcnlPYmplY3Q6IFJlY29yZDxOLCBSZWNvcmQ8RXh0cmFjdDxULCBrZXlvZiBUPiwgYm9vbGVhbj4+LCB2YXJpYWJsZXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxSZWNvcmQ8TiwgVCB8IFRbXT4+IHtcbiAgICBsZXQgcXVlcnlBcmd1bWVudHNTdHJpbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgIGxldCB2YWx1ZVN0cmluZyA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWVTdHJpbmcpIHtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHZhbHVlU3RyaW5nKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6JylcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IGBcIiR7dmFsdWVTdHJpbmd9XCJgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcXVlcnlBcmd1bWVudHNTdHJpbmdzLnB1c2goYCR7a2V5fTogJHt2YWx1ZVN0cmluZ31gKTtcbiAgICB9XG4gICAgbGV0IHF1ZXJ5QXJndW1lbnRzU3RyaW5nID0gcXVlcnlBcmd1bWVudHNTdHJpbmdzLmxlbmd0aFxuICAgICAgPyBgKCR7cXVlcnlBcmd1bWVudHNTdHJpbmdzLmpvaW4oJywgJyl9KWBcbiAgICAgIDogYGA7XG4gICAgY29uc3QgcXVlcnlLZXkgPSAobmFtZSArIHF1ZXJ5QXJndW1lbnRzU3RyaW5nKS5yZXBsYWNlKC9bXmEtejAtOV0vZ2ksICcnKTtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKHF1ZXJ5QXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBxdWVyeUFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0pIHtcbiAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XSA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJpZXNEYXRhTG9hZGluZ0J5TmFtZVtxdWVyeUtleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0uZ2V0VmFsdWUoKSAmJiAhdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PFQgfCBUW10sIGJvb2xlYW4+KHtcbiAgICAgICAgcXVlcnk6IGdxbGBxdWVyeSAke25hbWV9JHtxdWVyeX1gLFxuICAgICAgICBjYW5vbml6ZVJlc3VsdHM6IHRydWUsXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0ubmV4dChkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5uZXh0KHtcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihkYXRhLmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2YoZGF0YSk7XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcihkYXRhID0+ICEhZGF0YSlcbiAgICApO1xuICB9XG5cblxuICBjdXN0b21NdXRhdGlvbiQ8VCwgTiBleHRlbmRzIHN0cmluZyA9IGAke3N0cmluZ31gPihuYW1lOiBOLCBxdWVyeU9iamVjdDogUmVjb3JkPE4sIFJlY29yZDxFeHRyYWN0PFQsIGtleW9mIFQ+LCBib29sZWFuPj4sIHZhcmlhYmxlczogVCk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8VD4+XG4gIGN1c3RvbU11dGF0aW9uJDxUIGV4dGVuZHMgYW55PihuYW1lOiBzdHJpbmcsIHF1ZXJ5T2JqZWN0OiBhbnksIHZhcmlhYmxlczogYW55IHwgdW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxGZXRjaFJlc3VsdDxUPj5cbiAgY3VzdG9tTXV0YXRpb24kKG5hbWU6IHN0cmluZywgcXVlcnlPYmplY3Q6IGFueSwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8YW55Pj4ge1xuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSB0eXBlb2YgdmFyaWFibGVzW2tleV0gPT0gJ3N0cmluZycgP1xuICAgICAgICBgXCIke3ZhcmlhYmxlc1trZXldfVwiYCA6XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlc1trZXldKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6Jyk7XG4gICAgICBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3MucHVzaChgJHtrZXl9OiAke3ZhbHVlU3RyaW5nfWApO1xuICAgIH1cbiAgICBsZXQgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmcgPSBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3MubGVuZ3RoICE9PSAwXG4gICAgICA/IGAoJHttdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IGdxbGBtdXRhdGlvbiAke25hbWV9JHtxdWVyeX1gLFxuICAgICAgYXdhaXRSZWZldGNoUXVlcmllczogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=