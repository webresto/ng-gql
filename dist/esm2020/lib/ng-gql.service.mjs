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
                query: GroupGql.queries.getGroupsAndDishes(this.customFields)
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
                canonizeResults: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25nLWdxbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFVLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEYsT0FBTyxFQUFFLE9BQU8sRUFBcUgsTUFBTSxpQkFBaUIsQ0FBQztBQU03SixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBdUJ2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJCbEMsVUFBSyxHQUFvQyxJQUFJLGVBQWUsQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFHbkYsWUFBTyxHQUFtQyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFHbkYsVUFBSyxHQUFpQyxJQUFJLGVBQWUsQ0FBYyxJQUFJLENBQUMsQ0FBQztRQUc3RSxvQkFBZSxHQUEyQyxJQUFJLGVBQWUsQ0FBd0IsSUFBSSxDQUFDLENBQUM7UUFPM0csNkJBQXdCLEdBQTRDLEVBQUUsQ0FBQztRQUN2RSxtQ0FBOEIsR0FBK0Is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QUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7YUFDL0c7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDeEIsUUFBUSxFQUFFLEdBQUcsQ0FBQSxZQUFZLElBQUksR0FBRyxLQUFLLEVBQUU7WUFDdkMsbUJBQW1CLEVBQUUsSUFBSTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDOzt5R0FsYlUsWUFBWTs2R0FBWixZQUFZLGNBRlgsTUFBTTsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZldGNoUmVzdWx0IH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBBcG9sbG8sIGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgZmlsdGVyLCB0YWtlLCBtYXAsIGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJ0IH0gZnJvbSAnLi9jYXJ0L2NhcnQnO1xuaW1wb3J0IHsgQ2FydEdxbCwgQWRkVG9DYXJ0SW5wdXQsIFJlbW92ZUZyb21DYXJ0SW5wdXQsIE9yZGVyQ2FydElucHV0LCBDaGVja1Bob25lQ29kZUlucHV0LCBTZXREaXNoQW1vdW50SW5wdXQsIFNldERpc2hDb21tZW50SW5wdXQgfSBmcm9tICcuL2NhcnQvY2FydC5ncWwnO1xuaW1wb3J0IHsgQ2hlY2tQaG9uZVJlc3BvbnNlIH0gZnJvbSAnLi9jYXJ0L2NoZWNrLXBob25lLXJlc3BvbnNlJztcbmltcG9ydCB7IENoZWNrUmVzcG9uc2UgfSBmcm9tICcuL2NhcnQvY2hlY2stcmVzcG9uc2UnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuL2NhcnQvb3JkZXInO1xuaW1wb3J0IHsgUGhvbmUgfSBmcm9tICcuL2NhcnQvcGhvbmUnO1xuaW1wb3J0IHsgRGlzaCB9IGZyb20gJy4vZGlzaC9kaXNoJztcbmltcG9ydCB7IERpc2hHcWwgfSBmcm9tICcuL2Rpc2gvZGlzaC5ncWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwL2dyb3VwJztcbmltcG9ydCB7IEdyb3VwR3FsIH0gZnJvbSAnLi9ncm91cC9ncm91cC5ncWwnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IE5hdmlnYXRpb25HcWwgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZCB9IGZyb20gJy4vcGF5bWVudC1tZXRob2QvcGF5bWVudC1tZXRob2QnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZEdxbCB9IGZyb20gJy4vcGF5bWVudC1tZXRob2QvcGF5bWVudC1tZXRob2QuZ3FsJztcblxuZXhwb3J0IHR5cGUgTmF2aWdhdGlvbkRhdGEgPSB7XG4gIFtrZXk6IHN0cmluZ106IE5hdmlnYXRpb25cbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3FsU2VydmljZSB7XG5cbiAgbWVudSQ6IEJlaGF2aW9yU3ViamVjdDxHcm91cFtdIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEdyb3VwW10gfCBudWxsPihudWxsKTtcbiAgbWVudUxvYWRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgZGlzaGVzJDogQmVoYXZpb3JTdWJqZWN0PERpc2hbXSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEaXNoW10gfCBudWxsPihudWxsKTtcbiAgZGlzaGVzTG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBjYXJ0JDogQmVoYXZpb3JTdWJqZWN0PENhcnQgfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2FydCB8IG51bGw+KG51bGwpO1xuICBjYXJ0TG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBuYXZpZ2F0aW9uRGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOYXZpZ2F0aW9uRGF0YSB8IG51bGw+KG51bGwpO1xuICBuYXZpZ2F0aW9uRGF0YUxvYWRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgcGF5bWVudE1ldGhvZExvYWRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIGdldFBob25lTG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgY2hlY2tQaG9uZUxvYWRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IEJlaGF2aW9yU3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIGN1c3RvbUZpZWxkczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcG9sbG86IEFwb2xsbykge1xuICAgIHRoaXMuY2FydCQuc3Vic2NyaWJlKHJlcyA9PiBjb25zb2xlLmxvZygnY29udHJvbCBjYXJ0IHJlcycsIHJlcykpO1xuICB9XG5cbiAgYWRkQ3VzdG9tRmllbGQobW9kZWxOYW1lOiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0pIHtcbiAgICAgIHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0gPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0uaW5kZXhPZihmaWVsZCkgPT0gLTEpIHtcbiAgICAgIHRoaXMuY3VzdG9tRmllbGRzW21vZGVsTmFtZV0ucHVzaChmaWVsZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmF2aWdhdGlvbiQoKTogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25EYXRhIHwgbnVsbD4ge1xuICAgIGlmICghdGhpcy5uYXZpZ2F0aW9uRGF0YSQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5uYXZpZ2F0aW9uRGF0YUxvYWRpbmcpIHtcbiAgICAgIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICAgIHF1ZXJ5OiBOYXZpZ2F0aW9uR3FsLnF1ZXJpZXMuZ2V0TmF2aWdhdGlvbmVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lbnVMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25EYXRhOiBOYXZpZ2F0aW9uRGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgbmF2aWdhdGlvbiBvZiBkYXRhLm5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgbmF2aWdhdGlvbkRhdGFbbmF2aWdhdGlvbi5uYW1lXSA9IG5hdmlnYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25EYXRhJC5uZXh0KG5hdmlnYXRpb25EYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGlvbkRhdGEkO1xuICB9XG5cbiAgZ2V0TWVudSQoc2x1Zzogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQpOiBCZWhhdmlvclN1YmplY3Q8R3JvdXBbXSB8IG51bGw+IHtcbiAgICBpZiAoIXRoaXMubWVudSQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5tZW51TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IEdyb3VwR3FsLnF1ZXJpZXMuZ2V0R3JvdXBzQW5kRGlzaGVzKHRoaXMuY3VzdG9tRmllbGRzKVxuICAgICAgfSlcbiAgICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgICAgY29uc3QgeyBncm91cHMsIGRpc2hlcyB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0J5SWQ6IHtcbiAgICAgICAgICAgICAgW2tleTogc3RyaW5nXTogR3JvdXBcbiAgICAgICAgICAgIH0gPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwSWRzQnlTbHVnOiB7XG4gICAgICAgICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgICAgICAgICAgfSA9IHt9O1xuICAgICAgICAgICAgLy8gR3JvdXBzIGluZGV4aW5nXG4gICAgICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgZ3JvdXBzQnlJZFtncm91cC5pZF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZ3JvdXAsXG4gICAgICAgICAgICAgICAgZGlzaGVzOiBbXSxcbiAgICAgICAgICAgICAgICBjaGlsZEdyb3VwczogW11cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluc2VydGluZyBkaXNoZXMgYnkgZ3JvdXBzXG4gICAgICAgICAgICBmb3IgKGxldCBkaXNoIG9mIGRpc2hlcykge1xuICAgICAgICAgICAgICAvL2NvbnN0IHsgZ3JvdXBJZCB9ID0gZGlzaDtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJZCA9IGRpc2gucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBpZiAoIWdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbZ3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW2dyb3VwSWRdLmRpc2hlcz8ucHVzaChkaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBncm91cHMgaGllcmFyY2h5XG4gICAgICAgICAgICBmb3IgKGxldCBncm91cElkIGluIGdyb3Vwc0J5SWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNCeUlkW2dyb3VwSWRdO1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuZGlzaGVzPy5zb3J0KChhLCBiKSA9PiAoYS5vcmRlciA/PyAwKSAtIChiLm9yZGVyID8/IDApKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgR3JvdXAgJHtncm91cElkfSBzb3J0IGVycm9yYCwgZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRHcm91cElkID0gZ3JvdXAucGFyZW50R3JvdXA/LmlkO1xuICAgICAgICAgICAgICBncm91cElkc0J5U2x1Z1tncm91cC5zbHVnIV0gPSBncm91cElkO1xuICAgICAgICAgICAgICBpZiAoIXBhcmVudEdyb3VwSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIWdyb3Vwc0J5SWRbcGFyZW50R3JvdXBJZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBncm91cHNCeUlkW3BhcmVudEdyb3VwSWRdLmNoaWxkR3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICAvL2RlbGV0ZSBncm91cHNCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2x1Zykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzbHVnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBJZHNCeVNsdWdbc2x1Z10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51JC5uZXh0KGdyb3Vwc0J5SWRbZ3JvdXBJZHNCeVNsdWdbc2x1Z11dLmNoaWxkR3JvdXBzLnNvcnQoKGcxOiBHcm91cCwgZzI6IEdyb3VwKSA9PiBnMS5vcmRlciAtIGcyLm9yZGVyKSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgaWYgKCFzbHVnLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoc2x1Zy5tYXAocyA9PiBncm91cHNCeUlkW2dyb3VwSWRzQnlTbHVnW3NdXSkpXG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3Vwc0FuZERpc2hlczogR3JvdXBbXSA9IE9iamVjdC52YWx1ZXMoZ3JvdXBzQnlJZCkuc29ydCgoZzE6IEdyb3VwLCBnMjogR3JvdXApID0+IGcxLm9yZGVyIC0gZzIub3JkZXIpIGFzIEdyb3VwW107XG4gICAgICAgICAgICB0aGlzLm1lbnUkLm5leHQoZ3JvdXBzQW5kRGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWVudSQ7XG4gIH1cblxuICBnZXREaXNoZXMkKCk6IEJlaGF2aW9yU3ViamVjdDxEaXNoW10gfCBudWxsPiB7XG4gICAgaWYgKCF0aGlzLmRpc2hlcyQuZ2V0VmFsdWUoKSAmJiAhdGhpcy5kaXNoZXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLmFwb2xsby53YXRjaFF1ZXJ5PGFueT4oe1xuICAgICAgICBxdWVyeTogRGlzaEdxbC5xdWVyaWVzLmdldERpc2hlcyh0aGlzLmN1c3RvbUZpZWxkcylcbiAgICAgIH0pXG4gICAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNoZXNMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMuZGlzaGVzJC5uZXh0KGRhdGEuZGlzaGVzKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzaGVzJDtcbiAgfVxuXG4gIGdldE9yZGVyJChvcmRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmdldE9yZGVyKG9yZGVySWQsIHRoaXMuY3VzdG9tRmllbGRzKVxuICAgIH0pXG4gICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4gZGF0YS5nZXRPcmRlcilcbiAgICAgIClcbiAgfVxuXG4gIGdldENhcnQkKGNhcnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkKTogQmVoYXZpb3JTdWJqZWN0PENhcnQgfCBudWxsPiB7XG4gICAgY29uc3QgbGFzdENhcnQgPSB0aGlzLmNhcnQkLmdldFZhbHVlKCk7XG4gICAgaWYgKCEobGFzdENhcnQgJiYgbGFzdENhcnQuaWQgPT0gY2FydElkKSAmJiAhdGhpcy5jYXJ0TG9hZGluZykge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgICAgcXVlcnk6IENhcnRHcWwucXVlcmllcy5nZXRDYXJ0KGNhcnRJZCwgdGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgICBjYW5vbml6ZVJlc3VsdHM6IHRydWUsXG4gICAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgdGFwKCh7IGRhdGEsIGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmNhcnQkLm5leHQoZGF0YS5jYXJ0KTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FydCQ7XG4gIH1cblxuICBnZXRQaG9uZSQocGhvbmU6IHN0cmluZyk6IE9ic2VydmFibGU8UGhvbmU+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxhbnk+KHtcbiAgICAgIHF1ZXJ5OiBDYXJ0R3FsLnF1ZXJpZXMuZ2V0UGhvbmUocGhvbmUsIHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRQaG9uZUxvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgICAgIHJldHVybiBkYXRhLnBob25lXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tQaG9uZSQocGhvbmU6IHN0cmluZyk6IE9ic2VydmFibGU8Q2hlY2tQaG9uZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogQ2FydEdxbC5xdWVyaWVzLmNoZWNrUGhvbmUocGhvbmUsIHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIGZldGNoUG9saWN5OiAnbm8tY2FjaGUnXG4gICAgfSlcbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSwgbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGVja1Bob25lTG9hZGluZyA9IGxvYWRpbmc7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuY2hlY2tQaG9uZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFBheW1lbnRNZXRob2RzJChjYXJ0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8UGF5bWVudE1ldGhvZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8YW55Pih7XG4gICAgICBxdWVyeTogUGF5bWVudE1ldGhvZEdxbC5xdWVyaWVzLmdldFBheW1lbnRNZXRob2QoY2FydElkLCB0aGlzLmN1c3RvbUZpZWxkcylcbiAgICB9KVxuICAgICAgLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnBheW1lbnRNZXRob2RMb2FkaW5nID0gbG9hZGluZztcbiAgICAgICAgICByZXR1cm4gZGF0YS5wYXltZW50TWV0aG9kc1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQkKGRhdGE6IEFkZFRvQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBjYXJ0QWRkRGlzaDogQ2FydFxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5hZGREaXNoVG9DYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhcnQ6IENhcnQgPSBkYXRhIS5jYXJ0QWRkRGlzaDtcbiAgICAgICAgICBpZiAoY2FydCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGNhcnQ7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBvcmRlckNhcnQkKGRhdGE6IE9yZGVyQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBvcmRlckNhcnQ6IENoZWNrUmVzcG9uc2VcbiAgICB9Pih7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMub3JkZXJDYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhIS5vcmRlckNhcnQ7XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNoZWNrUmVzcG9uc2UuY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjaGVja0NhcnQkKGRhdGE6IE9yZGVyQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDaGVja1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBjaGVja0NhcnQ6IENoZWNrUmVzcG9uc2VcbiAgICB9Pih7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuY2hlY2tDYXJ0KHRoaXMuY3VzdG9tRmllbGRzKSxcbiAgICAgIHZhcmlhYmxlczogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoZWNrUmVzcG9uc2U6IENoZWNrUmVzcG9uc2UgPSBkYXRhIVsnY2hlY2tDYXJ0J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNoZWNrUmVzcG9uc2UuY2FydCk7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrUmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuICBjaGVja1Bob25lQ29kZSQoZGF0YTogQ2hlY2tQaG9uZUNvZGVJbnB1dCk6IE9ic2VydmFibGU8Q2hlY2tQaG9uZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBzZXRQaG9uZUNvZGU6IENoZWNrUGhvbmVSZXNwb25zZVxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5jaGVja1Bob25lQ29kZSh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja1Bob25lUmVzcG9uc2U6IENoZWNrUGhvbmVSZXNwb25zZSA9IGRhdGEhWydzZXRQaG9uZUNvZGUnXTtcbiAgICAgICAgICByZXR1cm4gY2hlY2tQaG9uZVJlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkYXRhOiBSZW1vdmVGcm9tQ2FydElucHV0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBvbGxvLm11dGF0ZTx7XG4gICAgICBjYXJ0UmVtb3ZlRGlzaDogQ2FydFxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5jdXN0b21GaWVsZHMpLFxuICAgICAgdmFyaWFibGVzOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FydDogQ2FydCA9IGRhdGEhWydjYXJ0UmVtb3ZlRGlzaCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIHNldERpc2hBbW91bnQkKGRhdGE6IFNldERpc2hBbW91bnRJbnB1dCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGU8e1xuICAgICAgY2FydFNldERpc2hBbW91bnQ6IENhcnRcbiAgICB9Pih7XG4gICAgICBtdXRhdGlvbjogQ2FydEdxbC5tdXRhdGlvbnMuc2V0RGlzaEFtb3VudCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YSFbJ2NhcnRTZXREaXNoQW1vdW50J107XG4gICAgICAgICAgdGhpcy5jYXJ0JC5uZXh0KGNhcnQpO1xuICAgICAgICAgIHJldHVybiBjYXJ0O1xuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cbiAgc2V0RGlzaENvbW1lbnQkKGRhdGE6IFNldERpc2hDb21tZW50SW5wdXQpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcG9sbG8ubXV0YXRlPHtcbiAgICAgIGNhcnRTZXREaXNoQ29tbWVudDogQ2FydFxuICAgIH0+KHtcbiAgICAgIG11dGF0aW9uOiBDYXJ0R3FsLm11dGF0aW9ucy5zZXREaXNoQ29tbWVudCh0aGlzLmN1c3RvbUZpZWxkcyksXG4gICAgICB2YXJpYWJsZXM6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBjYXJ0OiBDYXJ0ID0gZGF0YSFbJ2NhcnRTZXREaXNoQ29tbWVudCddO1xuICAgICAgICAgIHRoaXMuY2FydCQubmV4dChjYXJ0KTtcbiAgICAgICAgICByZXR1cm4gY2FydDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG4gIGN1c3RvbVF1ZXJ5JDxULCBOIGV4dGVuZHMgc3RyaW5nID0gYCR7c3RyaW5nfWA+KG5hbWU6IE4sIHF1ZXJ5T2JqZWN0OiBSZWNvcmQ8TiwgUmVjb3JkPEV4dHJhY3Q8VCwga2V5b2YgVD4sIGJvb2xlYW4+PiwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8UmVjb3JkPE4sIFQgfCBUW10+PiB7XG4gICAgbGV0IHF1ZXJ5QXJndW1lbnRzU3RyaW5nczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICBsZXQgdmFsdWVTdHJpbmcgPSB2YXJpYWJsZXNba2V5XTtcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZVN0cmluZykucmVwbGFjZSgvXFx7XCIoW15cIl0rKVwiXFw6L2dpLCAneyQxOicpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBgXCIke3ZhbHVlU3RyaW5nfVwiYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5wdXNoKGAke2tleX06ICR7dmFsdWVTdHJpbmd9YCk7XG4gICAgfVxuICAgIGxldCBxdWVyeUFyZ3VtZW50c1N0cmluZyA9IHF1ZXJ5QXJndW1lbnRzU3RyaW5ncy5sZW5ndGhcbiAgICAgID8gYCgke3F1ZXJ5QXJndW1lbnRzU3RyaW5ncy5qb2luKCcsICcpfSlgXG4gICAgICA6IGBgO1xuICAgIGNvbnN0IHF1ZXJ5S2V5ID0gKG5hbWUgKyBxdWVyeUFyZ3VtZW50c1N0cmluZykucmVwbGFjZSgvW15hLXowLTldL2dpLCAnJyk7XG4gICAgbGV0IHF1ZXJ5ID0gSlNPTi5zdHJpbmdpZnkocXVlcnlPYmplY3QpXG4gICAgICAucmVwbGFjZSgvXCIvZywgJycpXG4gICAgICAucmVwbGFjZSgvXFw6W2EtejAtOV0rL2dpLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDovZywgJycpO1xuICAgIGlmIChxdWVyeUFyZ3VtZW50c1N0cmluZykge1xuICAgICAgY29uc3QgcXVlcmllc0tleXMgPSBPYmplY3Qua2V5cyhxdWVyeU9iamVjdCk7XG4gICAgICBjb25zdCBjb3VudE9mUXVlcmllcyA9IHF1ZXJpZXNLZXlzLmxlbmd0aDtcbiAgICAgIGlmIChjb3VudE9mUXVlcmllcyA9PSAxKSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKCcoXFx7LiopJyArIHF1ZXJpZXNLZXlzWzBdKSwgJyQxJyArIHF1ZXJpZXNLZXlzWzBdICsgcXVlcnlBcmd1bWVudHNTdHJpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldKSB7XG4gICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgdGhpcy5jdXN0b21RdWVyaWVzRGF0YUxvYWRpbmdCeU5hbWVbcXVlcnlLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXN0b21RdWVyeWllc0RhdGFCeU5hbWVbcXVlcnlLZXldLmdldFZhbHVlKCkgJiYgIXRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSkge1xuICAgICAgdGhpcy5hcG9sbG8ud2F0Y2hRdWVyeTxUIHwgVFtdLCBib29sZWFuPih7XG4gICAgICAgIHF1ZXJ5OiBncWxgcXVlcnkgJHtuYW1lfSR7cXVlcnl9YCxcbiAgICAgICAgY2Fub25pemVSZXN1bHRzOiB0cnVlXG4gICAgICB9KVxuICAgICAgICAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoeyBkYXRhLCBsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcmllc0RhdGFMb2FkaW5nQnlOYW1lW3F1ZXJ5S2V5XSA9IGxvYWRpbmc7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVF1ZXJ5aWVzRGF0YUJ5TmFtZVtxdWVyeUtleV0ubmV4dChkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5uZXh0KHtcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnlpZXNEYXRhQnlOYW1lW3F1ZXJ5S2V5XS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihkYXRhLmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2YoZGF0YSk7XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcihkYXRhID0+ICEhZGF0YSlcbiAgICApO1xuICB9XG5cblxuICBjdXN0b21NdXRhdGlvbiQ8VCwgTiBleHRlbmRzIHN0cmluZyA9IGAke3N0cmluZ31gPihuYW1lOiBOLCBxdWVyeU9iamVjdDogUmVjb3JkPE4sIFJlY29yZDxFeHRyYWN0PFQsIGtleW9mIFQ+LCBib29sZWFuPj4sIHZhcmlhYmxlczogVCk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8VD4+XG4gIGN1c3RvbU11dGF0aW9uJDxUIGV4dGVuZHMgYW55PihuYW1lOiBzdHJpbmcsIHF1ZXJ5T2JqZWN0OiBhbnksIHZhcmlhYmxlczogYW55IHwgdW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxGZXRjaFJlc3VsdDxUPj5cbiAgY3VzdG9tTXV0YXRpb24kKG5hbWU6IHN0cmluZywgcXVlcnlPYmplY3Q6IGFueSwgdmFyaWFibGVzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8RmV0Y2hSZXN1bHQ8YW55Pj4ge1xuICAgIGxldCBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSB0eXBlb2YgdmFyaWFibGVzW2tleV0gPT0gJ3N0cmluZycgP1xuICAgICAgICBgXCIke3ZhcmlhYmxlc1trZXldfVwiYCA6XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlc1trZXldKS5yZXBsYWNlKC9cXHtcIihbXlwiXSspXCJcXDovZ2ksICd7JDE6Jyk7XG4gICAgICBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3MucHVzaChgJHtrZXl9OiAke3ZhbHVlU3RyaW5nfWApO1xuICAgIH1cbiAgICBsZXQgbXV0YXRpb25Bcmd1bWVudHNTdHJpbmcgPSBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3MubGVuZ3RoICE9PSAwXG4gICAgICA/IGAoJHttdXRhdGlvbkFyZ3VtZW50c1N0cmluZ3Muam9pbignLCAnKX0pYFxuICAgICAgOiBgYDtcbiAgICBsZXQgcXVlcnkgPSBKU09OLnN0cmluZ2lmeShxdWVyeU9iamVjdClcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXDpbYS16MC05XSsvZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgaWYgKG11dGF0aW9uQXJndW1lbnRzU3RyaW5nKSB7XG4gICAgICBjb25zdCBxdWVyaWVzS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5T2JqZWN0KTtcbiAgICAgIGNvbnN0IGNvdW50T2ZRdWVyaWVzID0gcXVlcmllc0tleXMubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50T2ZRdWVyaWVzID09IDEpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXHsuKiknICsgcXVlcmllc0tleXNbMF0pLCAnJDEnICsgcXVlcmllc0tleXNbMF0gKyBtdXRhdGlvbkFyZ3VtZW50c1N0cmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFwb2xsby5tdXRhdGUoe1xuICAgICAgbXV0YXRpb246IGdxbGBtdXRhdGlvbiAke25hbWV9JHtxdWVyeX1gLFxuICAgICAgYXdhaXRSZWZldGNoUXVlcmllczogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=