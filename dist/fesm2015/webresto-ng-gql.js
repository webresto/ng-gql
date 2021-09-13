import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Directive, Input, Output, HostListener, Renderer2, ElementRef, NgModule, Inject } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, take, map, catchError, switchMap, filter, debounceTime } from 'rxjs/operators';
import { HttpLink } from 'apollo-angular/http';
import { split, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

class CartDish {
}

class Cart {
}

class Order {
}

class CheckPhoneResponse {
}

class CheckResponse {
}

class Phone {
}

class Dish {
}

class Group {
}

class Modifier {
}

class GroupModifier {
    constructor() {
        this.totalAmount = 0;
    }
}

class PaymentMethod {
}

const PaymentMethodFragments = {
    paymentMethod: gql `
		fragment PaymentMethodFragment on PaymentMethod {
			id
			type
			title
			description
			adapter
			order
			enable
			customData
		}
	`
};
const ɵ0 = (cartId = null) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
				query GetPaymentMethods {
					paymentMethods:paymentMethod${queryArguments} {
						...PaymentMethodFragment
					}
				}
				${PaymentMethodFragments.paymentMethod}
			`;
};
const PaymentMethodGql = {
    queries: {
        getPaymentMethod: ɵ0
    }
};

const ImageFragments = {
    image: gql `
		fragment ImageFragment on Image {
			id
			uploadDate
			images
		}
	`
};

const ModifierFragments = {
    modifier: gql `
		fragment ModifierFragment on Modifier {
			modifierId
			maxAmount
			minAmount
			defaultAmount
			hideIfDefaultAmount
			dish {
				id
				name
				description
				groupId
				price
				weight
				balance
				tags
				images {
					...ImageFragment
				}
			}
		}
		${ImageFragments.image}
	`
};

const GroupModifierFragments = {
    groupModifier: gql `
		fragment GroupModifierFragment on GroupModifier {
			modifierId
			maxAmount
			minAmount
			required
			childModifiers {
				...ModifierFragment
			}
			group {
				id
				name
			}
		}
		${ModifierFragments.modifier}
	`
};

const DishFragments = {
    dish: gql `
		fragment DishFragment on Dish {
			id
			name
			description
			groupId
			price
			weight
			balance
			tags
			additionalInfo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};
const ɵ0$1 = () => gql `
			query GetDishes {
				dishes {
					...DishFragment
				}
			}
			${DishFragments.dish}
		`;
const DishGql = {
    queries: {
        getDishes: ɵ0$1
    }
};

const CartDishFragments = {
    cartDish: gql `
		fragment CartDishFragment on CartDish {
			id
			amount
			dish {
				...DishFragment
			}
			modifiers {
				id
				dish {
					...DishFragment
				}
				amount
				groupId
			}
			discountTotal
			comment
			weight
			totalWeight
		}
		${DishFragments.dish}
	`
};

const CartFragments = {
    cart: gql `
		fragment CartFragment on Cart {
			id
			dishesCount
			comment
			personsCount
			deliveryDescription
			message
			deliveryCost
			totalWeight
			total
			orderTotal
			cartTotal
			discountTotal
			state
		}
	`,
    cartOrderData: gql `
		fragment CartOrderDataFragment on Cart {
			rmsDelivered
			rmsId
			rmsOrderNumber
			rmsOrderData
			rmsDeliveryDate
			rmsErrorMessage
			rmsErrorCode
			rmsStatusCode
			customer
			address
			paid
			isPaymentPromise
		}
	`,
};
const ɵ0$2 = (orderId) => {
    const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
    return gql `
				query getOrder {
					getOrder${queryArguments} {
						cart {
							...CartFragment
							...CartOrderDataFragment
							dishes {
								...CartDishFragment
							}
							paymentMethod {
								...PaymentMethodFragment
							}
						}
						customData
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${CartFragments.cartOrderData}
				${PaymentMethodFragments.paymentMethod}
			`;
}, ɵ1 = (cartId = null) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
				query GetCart {
					cart${queryArguments} {
						...CartFragment
						dishes {
							...CartDishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
			`;
}, ɵ2 = (phone) => {
    return gql `
				query phone {
					phone(phone: "${phone}") {
						id
						phone
						isFirst
						isConfirm
						codeTime
						confirmCode
						customData
					}
				}
			`;
}, ɵ3 = (phone) => {
    return gql `
				query checkPhone {
					checkPhone(phone: "${phone}") {
						type
						title
						message
						confirmed
						firstbuy
					}
				}
			`;
}, ɵ4 = () => {
    return gql `
				mutation AddDishToCart(
					$cartId: String, 
					$dishId: String, 
					$amount: Int, 
					$modifiers: Json, 
					$comment: String,
					$from: String,
					$replace: Boolean,
					$cartDishId: Int
				) {
					cartAddDish(
						cartId: $cartId,
						dishId: $dishId,
						amount: $amount,
						modifiers: $modifiers,
						comment: $comment,
						from: $from,
						replace: $replace,
						cartDishId: $cartDishId
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ5 = () => {
    return gql `
				mutation cartRemoveDish(
					$cartId: String!, 
					$cartDishId: Int!, 
					$amount: Int!, 
				) {
					cartRemoveDish(
						id: $cartId,
						cartDishId: $cartDishId,
						amount: $amount,
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ6 = () => {
    return gql `
				mutation cartSetDishAmount(
					$cartId: String,
					$cartDishId: Int,
					$amount: Int
				) {
					cartSetDishAmount(
						id: $cartId,
						cartDishId: $cartDishId,
						amount: $amount
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ7 = () => {
    return gql `
				mutation cartSetDishComment(
					$cartId: String,
					$cartDishId: Int,
					$comment: Int
				) {
					cartSetDishComment(
						id: $cartId,
						cartDishId: $cartDishId,
						comment: $comment
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ8 = () => {
    return gql `
				mutation orderCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					orderCart(
						cartId: $cartId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer
					) {
						cart {
							...CartFragment
							dishes {
								...CartDishFragment
							}
							deliveryItem {
								...DishFragment
							}
						}
						message {
							title
							type
							message
						}
						action {
							type
							data
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ9 = () => {
    return gql `
				mutation checkCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					checkCart(
						cartId: $cartId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer
					) {
						cart {
							...CartFragment
							dishes {
								...CartDishFragment
							}
							deliveryItem {
								...DishFragment
							}
						}
						message {
							title
							type
							message
						}
						action {
							type
							data
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ10 = () => {
    return gql `
				mutation checkPhoneCode(
					$phone: String!,
					$code: String!
				) {
					setPhoneCode(
						phone: $phone,
						code: $code
					) {
						type
						title
						message
						confirmed
						firstbuy
					}
				}
			`;
};
const CartGql = {
    queries: {
        getOrder: ɵ0$2,
        getCart: ɵ1,
        getPhone: ɵ2,
        checkPhone: ɵ3
    },
    mutations: {
        addDishToCart: ɵ4,
        removeDishFromCart: ɵ5,
        setDishAmount: ɵ6,
        setDishComment: ɵ7,
        orderCart: ɵ8,
        checkCart: ɵ9,
        checkPhoneCode: ɵ10,
    }
};

const GroupFragments = {
    group: gql `
		fragment GroupFragment on Group {
			id
			description
			name
			order
			visible
			slug
		}
	`
};
const ɵ0$3 = () => gql `
			query GetMenu {
				groups {
					...GroupFragment
					dishes {
						...DishFragment
					}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`, ɵ1$1 = () => gql `
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
				}
				dishes {
					...DishFragment
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`;
const GroupGql = {
    queries: {
        getGroups: ɵ0$3,
        getGroupsAndDishes: ɵ1$1
    }
};

const NavigationFragments = {
    navigation: gql `
		fragment NavigationFragment on Navigation {
			id 
			name
			description
			data {
				label
				link
				timeWork
				phone
				icon
				active
				controller
				slug
				warning
				child {
					tags
					slug
					visible
					name
				}
			}
		}
	`
};
const ɵ0$4 = () => gql `
			query GetNavigation {
				navigation {
					...NavigationFragment
				}
			}
			${NavigationFragments.navigation}
		`;
const NavigationGql = {
    queries: {
        getNavigationes: ɵ0$4
    }
};

class NgGqlService {
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
NgGqlService.ɵprov = ɵɵdefineInjectable({ factory: function NgGqlService_Factory() { return new NgGqlService(ɵɵinject(Apollo)); }, token: NgGqlService, providedIn: "root" });
NgGqlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgGqlService.ctorParameters = () => [
    { type: Apollo }
];

class EventerService {
    constructor() {
        this.eventMessage = new EventEmitter();
        this.eventAction = new EventEmitter();
    }
    emitMessageEvent(message) {
        this.eventMessage.emit(message);
    }
    emitActionEvent(action) {
        this.eventAction.emit(action);
    }
    getMessageEmitter() {
        return this.eventMessage;
    }
    getActionEmitter() {
        return this.eventAction;
    }
}
EventerService.ɵprov = ɵɵdefineInjectable({ factory: function EventerService_Factory() { return new EventerService(); }, token: EventerService, providedIn: "root" });
EventerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
EventerService.ctorParameters = () => [];

const LS_NAME = 'cartId';
class NgCartService {
    constructor(ngGqlService, eventer) {
        this.ngGqlService = ngGqlService;
        this.eventer = eventer;
        this.OrderFormChange = new BehaviorSubject(null);
        this.cart = new BehaviorSubject({});
        this.initialStorage();
        this.modifiers$ = new BehaviorSubject([]);
        this.modifiersMessage$ = new BehaviorSubject([]);
        this.modifiersMessage$.subscribe(messages => this.messages = messages);
    }
    getCartId() {
        return localStorage.getItem(LS_NAME);
    }
    setCartId(cartId) {
        if (!cartId)
            return null;
        localStorage.setItem(LS_NAME, cartId);
    }
    removeCartId() {
        localStorage.removeItem(LS_NAME);
    }
    userCart$() {
        return this.cart.pipe(filter(cart => !!cart));
    }
    setModifiers(modifiers, messages) {
        this.modifiers$.next(modifiers);
        if (messages)
            this.modifiersMessage$.next(messages);
    }
    getModifiers() {
        return this.modifiers$;
    }
    initialStorage() {
        var _a;
        this.cartId = this.getCartId();
        (_a = this.cartSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.cartSubscription = this.ngGqlService
            .getCart$(this.cartId)
            .pipe(tap(cart => {
            console.log('cart tap', cart);
            if ((cart === null || cart === void 0 ? void 0 : cart.state) == 'ORDER') {
                throwError(new Error('Cart in order state'));
            }
            this.setCartId(cart === null || cart === void 0 ? void 0 : cart.id);
        }))
            .subscribe(cart => this.cart.next(cart), error => this.removeCartId());
    }
    addDishToCart$(data) {
        if (this.messages.length) {
            this.messages.forEach(message => {
                this.eventer.emitMessageEvent(message);
            });
        }
        return this.ngGqlService.addDishToCart$(data);
    }
    removeDishFromCart$(dishId, amount) {
        return this.ngGqlService.removeDishFromCart$({
            cartDishId: dishId,
            cartId: this.cartId,
            amount
        });
    }
    orderCart$(data) {
        return this.ngGqlService.orderCart$(data);
    }
    paymentLink$(phone, fromPhone) {
        console.log('paymentLink', this.cartId, phone, fromPhone);
        //return of(null);
        return this.ngGqlService
            .customMutation$('paymentLink', {
            paymentLink: 1
        }, {
            cartId: this.cartId,
            phone,
            fromPhone
        })
            .pipe(map(data => data['paymentLink']), tap(() => { }, error => {
            console.log('error', error);
            this.eventer.emitMessageEvent({
                type: 'info',
                title: 'Не удалось отправить ссылку для оплаты.',
                body: error.message
            });
        }));
    }
    checkCart$(data) {
        console.log('Check cart$', data);
        return this.ngGqlService.checkCart$(data);
    }
    setDishCountToCart$(dishId, amount) {
        return this.ngGqlService.setDishAmount$({
            cartDishId: dishId,
            cartId: this.cartId,
            amount
        });
    }
    setDishComment$(dishId, comment) {
        return this.ngGqlService.setDishComment$({
            cartDishId: dishId,
            cartId: this.cartId,
            comment
        });
    }
}
NgCartService.ɵprov = ɵɵdefineInjectable({ factory: function NgCartService_Factory() { return new NgCartService(ɵɵinject(NgGqlService), ɵɵinject(EventerService)); }, token: NgCartService, providedIn: "root" });
NgCartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgCartService.ctorParameters = () => [
    { type: NgGqlService },
    { type: EventerService }
];

class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.loading = new EventEmitter();
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
        this.cartService
            .getModifiers()
            .subscribe(res => this.modifiers = res);
    }
    onClick() {
        this.addDishToCart(this.dish.id, this.amountDish);
    }
    addDishToCart(dishID, amount) {
        let data = {
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifiers,
            "comment": this.comment,
            "replace": this.replaceCartDishId ? true : undefined,
            "cartDishId": this.replaceCartDishId
        };
        if (this.cart.id)
            data.cartId = this.cart.id;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[addToCart]'
            },] }
];
AddDishToCartDirective.ctorParameters = () => [
    { type: NgCartService }
];
AddDishToCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    comment: [{ type: Input }],
    replaceCartDishId: [{ type: Input }],
    loading: [{ type: Output }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class AmountCartDirective {
    constructor(cartService, renderer, el) {
        this.cartService = cartService;
        this.renderer = renderer;
        this.el = el;
        this.amount = '0';
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        this.cartService
            .userCart$()
            .subscribe(res => {
            this.cart = res;
            this.amount = res.dishesCount || 0;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
AmountCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[amountCart]'
            },] }
];
AmountCartDirective.ctorParameters = () => [
    { type: NgCartService },
    { type: Renderer2 },
    { type: ElementRef }
];

class DeleteFromCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.cartService.removeDishFromCart$(this.dish.id, this.amountDish).subscribe();
    }
}
DeleteFromCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[deleteFromCart]'
            },] }
];
DeleteFromCartDirective.ctorParameters = () => [
    { type: NgCartService }
];
DeleteFromCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class OrderCartUserDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.requiredFields = ["name", "phone", "street", "house"];
        this.checkerFields = new BehaviorSubject(undefined);
    }
    onClick() {
        this.order(this.orderCart.value);
        console.log(this.orderCart.value);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.cartService
                .userCart$()
                .subscribe(cart => {
                if (this.cart && this.orderCart.valid && this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                    this.checkStreet(this.orderCart.value);
                }
                this.cart = cart;
            });
        }, 100);
        setTimeout(() => {
            this.checkerFields.next(this.checkForFields(this.orderCart._directives, this.requiredFields));
        }, 100);
        this.checkerFields.subscribe(state => {
            if (state) {
                this.orderCart.controls['street'].valueChanges.subscribe(val => {
                    if (typeof val === 'object') {
                        setTimeout(() => {
                            if (this.orderCart.controls['house'].valid) {
                                this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                                this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                                this.checkStreet(this.orderCart.value);
                            }
                        }, 100);
                    }
                });
                this.orderCart.controls['house'].valueChanges.subscribe(val => {
                    setTimeout(() => {
                        if (this.orderCart.controls['street'].valid) {
                            this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                            this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                            this.checkStreet(this.orderCart.value);
                        }
                    }, 100);
                });
            }
        });
    }
    checkForFields(formDirectives, requiredFields) {
        let fieldsAreAvailable = {};
        let noFields = [];
        formDirectives.forEach(element => {
            fieldsAreAvailable[element.name] = true;
        });
        requiredFields.forEach(element => {
            if (!fieldsAreAvailable.hasOwnProperty(element)) {
                noFields.push(element);
            }
        });
        if (noFields.length <= 0) {
            return true;
        }
        else {
            console.error("У формы отсутсвуют следующие обязательные для корректной работы модуля поля:", noFields);
            return false;
        }
    }
    order(dataToSend) {
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let payment;
            let comment = dataToSend.comment || "Не указан";
            if (dataToSend.cash) {
                payment = "Наличными курьеру";
            }
            else if (dataToSend.bankcard) {
                payment = "Банковской картой курьеру";
            }
            else {
                payment = "Не указан";
            }
            console.log(dataToSend);
            let data = {
                "cartId": this.cart.id,
                // TODO: тип оплаты надо вынести в отдельный модуль.
                "comment": "\n Тип оплаты:" + payment + "\nКоментарий:" + comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            this.cartService.orderCart$(data).subscribe();
        }
        else {
        }
    }
    checkStreet(dataToSend) {
        console.log(">>>>", dataToSend);
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let data = {
                "cartId": this.cart.id,
                "comment": dataToSend.comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            //this.cartService.checkStreet(data);
        }
        else {
        }
    }
    stringToNumber(str) {
        console.log(typeof str);
        if (typeof str === 'string') {
            return +str;
        }
        else if (typeof str === "number") {
            return str;
        }
        else {
            console.error("Параметр home должен быть или string или number");
        }
    }
}
OrderCartUserDirective.decorators = [
    { type: Directive, args: [{
                selector: '[orderCart]'
            },] }
];
OrderCartUserDirective.ctorParameters = () => [
    { type: NgCartService }
];
OrderCartUserDirective.propDecorators = {
    orderCart: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class SetAmountDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.changeAmount(this.action);
    }
    changeAmount(action) {
        switch (action) {
            case '+':
                this.cartService.setDishCountToCart$(this.dish.id, this.dish.amount + 1).subscribe();
                break;
            case '-':
                this.cartService.setDishCountToCart$(this.dish.id, this.dish.amount - 1).subscribe();
                break;
            default:
                console.log("Директива SetDishAmount получила ложное значение action");
                break;
        }
    }
}
SetAmountDirective.decorators = [
    { type: Directive, args: [{
                selector: '[setDishAmount]'
            },] }
];
SetAmountDirective.ctorParameters = () => [
    { type: NgCartService }
];
SetAmountDirective.propDecorators = {
    action: [{ type: Input }],
    dish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class DishCalcDirective {
    constructor(renderer, el, cartService) {
        this.renderer = renderer;
        this.el = el;
        this.cartService = cartService;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.amountModifiers = {};
        this.stateModifiers = {};
    }
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, "dish-calculator");
        this.amountDish = this.amount;
        this.amountDishToAdd.emit(this.amountDish);
        this.price = this.renderer.createElement("div");
        this.renderer.addClass(this.price, "dish-price");
        setTimeout(() => {
            this.renderDish(this.dish);
            this.render(this.dish.modifiers);
        }, 100);
    }
    renderDish(dish) {
        /*
         <div class="main-item">
         <div class="item-name">
         <div class="title">{{dish.name}}</div>
         </div>
         <div class="item-quantity">
         <!-- increase button-->
         <a class="item-quantity__button" (click)="changeAmountdish(-1)">&#8722;</a>
         <span class="item-quantity__counter" >{{amountDish}}</span>
         <!-- decrease button-->
         <a class="item-quantity__button" (click)="changeAmountdish(1)">&#x2b;</a>
         </div>
         <div class="weight-price">
         {{dish.price*amountDish}}&nbsp;&#x20bd;
         </div>
         </div>
    
    
         */
        let mainItem = this.renderer.createElement("div");
        this.renderer.addClass(mainItem, "dish-wraper");
        this.renderer.appendChild(this.el.nativeElement, mainItem);
        let itemName = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "name");
        this.renderer.appendChild(mainItem, itemName);
        let title = this.renderer.createElement("div");
        this.renderer.addClass(title, "title");
        this.renderer.setProperty(title, "innerHTML", this.dish.name);
        this.renderer.appendChild(itemName, title);
        let weightDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "dish");
        this.renderer.appendChild(mainItem, weightDishWrapper);
        let weightDishValue = this.renderer.createElement("div");
        this.renderer.addClass(weightDishValue, "value");
        this.renderer.setProperty(weightDishValue, "innerHTML", (this.dish.weight * 1000).toFixed(0) + " г.");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightDishValue, "zero");
        }
        this.renderer.appendChild(weightDishWrapper, weightDishValue);
        this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
        let priceDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceDishWrapper, "price");
        this.renderer.addClass(priceDishWrapper, "total");
        this.renderer.appendChild(priceDishWrapper, this.price);
        this.renderer.appendChild(mainItem, priceDishWrapper);
        let itemQuant = this.renderer.createElement("div");
        this.renderer.addClass(itemQuant, "quantity");
        this.renderer.appendChild(mainItem, itemQuant);
        let addButton = this.renderer.createElement("a");
        this.renderer.addClass(addButton, "quantity__button");
        this.renderer.addClass(addButton, "minus");
        this.renderer.setProperty(addButton, "innerHTML", "&#8722;");
        this.renderer.listen(addButton, "click", e => {
            this.changeAmountdish(-1);
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
            this.innerTotalWeight(weightTotal);
        });
        this.renderer.appendChild(itemQuant, addButton);
        let counter = this.renderer.createElement("span");
        this.renderer.addClass(counter, "quantity__counter");
        this.renderer.setProperty(counter, "innerHTML", this.amountDish);
        this.renderer.appendChild(itemQuant, counter);
        let minusButton = this.renderer.createElement("a");
        this.renderer.addClass(minusButton, "quantity__button");
        this.renderer.addClass(addButton, "plus");
        this.renderer.setProperty(minusButton, "innerHTML", "&#x2b;");
        this.renderer.listen(minusButton, "click", e => {
            this.changeAmountdish(1);
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
            this.innerTotalWeight(weightTotal);
        });
        this.renderer.appendChild(itemQuant, minusButton);
        let weightTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "total");
        this.renderer.appendChild(mainItem, weightTotalWrapper);
        let weightTotal = this.renderer.createElement("div");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightTotal, "zero");
        }
        this.renderer.addClass(weightTotal, "value");
        this.innerTotalWeight(weightTotal); // TODO: total Weight
        this.renderer.appendChild(weightTotalWrapper, weightTotal);
        this.weightTotal = weightTotal;
        this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(dish.price)); // TODO: правильно считать цену
        let priceTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceTotalWrapper, "price");
        this.renderer.addClass(priceTotalWrapper, "total");
        this.renderer.appendChild(priceTotalWrapper, this.price);
        this.renderer.appendChild(mainItem, priceTotalWrapper);
    }
    generatePrice(priceDish, amount, modifiersPrice) {
        let selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach(element => {
                this.dish.modifiers.forEach(groups => {
                    let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                });
            });
        let modSum = 0;
        selected.forEach(element => {
            modSum = modSum + element.dish.price * this.amountModifiers[element.groupId][element.modifierId];
        });
        modSum = modSum * this.amountDish;
        return (priceDish * this.amountDish + modSum + '<div class="currency">&nbsp;&#x20bd;</div>');
    }
    generateTotalWeight() {
        let selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach(element => {
                this.dish.modifiers.forEach(groups => {
                    let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                });
            });
        let modSum = 0;
        selected.forEach(element => {
            modSum = modSum + element.dish.weight * this.amountModifiers[element.groupId][element.modifierId] * 1000;
        });
        modSum = parseFloat((modSum * this.amountDish).toFixed(2));
        console.log(modSum, this.dish.weight * 1000 * this.amountDish);
        console.log(this.dish.weight, this.amountDish);
        let weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
        return (weight).toFixed(0) + " г. <div class='separator'></div>";
    }
    innerTotalWeight(totalWeigthDiv) {
        this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
    }
    changeAmountdish(value) {
        this.amountDish = this.amountDish + value;
        if (this.amountDish <= 0) {
            this.amountDish = 1;
        }
        if (this.amountDish >= 199) {
            this.amountDish = 199;
        }
        this.amountDishToAdd.emit(this.amountDish);
    }
    render(modifiers) {
        this.setModifiers();
        if (modifiers.length > 0) {
            let h = this.renderer.createElement("h5");
            this.renderer.setProperty(h, "innerHTML", "К этому блюду можно добавить:");
            // this.renderer.appendChild(this.el.nativeElement, h);
        }
        modifiers.forEach(elementGroup => {
            this.stateModifiers[elementGroup.modifierId] = {};
            this.amountModifiers[elementGroup.modifierId] = {};
            if (elementGroup.dish) {
                let groupDiv = this.groupDiv("Одночные модификаторы не поддерживаются");
                this.renderer.appendChild(this.el.nativeElement, groupDiv);
                console.log("elementGroup", elementGroup);
                //TODO: add single modificator logic
            }
            else if (elementGroup.childModifiers) {
                let groupDiv = this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                this.renderer.appendChild(this.el.nativeElement, groupDiv);
                let modArr = elementGroup.childModifiers;
                modArr.forEach(element => {
                    let modifireDiv = this.modifireDiv(element, elementGroup.modifierId);
                    this.renderer.appendChild(groupDiv, modifireDiv);
                    if (element.defaultAmount < 1) {
                        this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                    }
                    else {
                        this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                    }
                });
            }
        });
        if (modifiers.length > 0) {
            let h = this.renderer.createElement("div");
            this.renderer.setProperty(h, "innerHTML", "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>");
            this.renderer.appendChild(this.el.nativeElement, h);
        }
    }
    groupDiv(nameGorup) {
        let div = this.renderer.createElement("div");
        this.renderer.addClass(div, "group-modifiers-wraper");
        this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
        return div;
    }
    modifireDiv(element, groupId) {
        let div = this.renderer.createElement("div");
        this.renderer.addClass(div, "additional-item");
        this.renderOneModifire(element, div, groupId);
        return div;
    }
    renderOneModifire(element, modifireDiv, groupId) {
        console.info('renderOneModifire', element);
        console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
        // Рендер Названия модификатора
        let itemNameDiv = this.renderer.createElement("div");
        this.renderer.addClass(itemNameDiv, "item-name");
        let label = this.renderer.createElement("label");
        this.renderer.setAttribute(label, "for", element.modifierId);
        this.renderer.appendChild(itemNameDiv, label);
        this.renderer.setProperty(label, "innerHTML", element.dish.name);
        this.renderer.appendChild(modifireDiv, itemNameDiv);
        let weigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
        let weightModifireLeft = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireLeft, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireLeft, 'zero');
        }
        this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');
        this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
        this.renderer.appendChild(modifireDiv, weigthModifireWraper);
        // Рендер блока изминения количества модификатора
        let itemQuantity = this.renderer.createElement("div");
        /* TODO: нужно проверить:
         да 0,0,[0] - только выключеный чекбокс
         да 0,1 [0]- только чекбокс
         да 0,1 [d===1]- только чекбокс, включеный
    
         да 0,n[d=0] - по умолчанию 0 кнопки +-
         да 0,n[d>0<n] - по умолчанию d, кнопки +-
    
    
    
         k,n [k<n,d=0] - k по умолчанию!!! нужно чтобвы стояла цыфра k в амаунт, макс n(больше n не подниамалось) кнопки +- (частный случай когда d=0)
         k,n [k<n,0<d=<n]- d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-
    
    
    
         defaultAmount:0
         hideIfDefaultAmount:false //Признак того, что не нужно отображать список модификаторов, если их количество равно количеству
         maxAmount:0
         minAmount:0
    
         */
        let min = element.minAmount;
        let max = element.maxAmount;
        let def = element.defaultAmount;
        console.info('min max def', min, max, def);
        switch (true) {
            case min === 0 && max === 0 && def === 0: // 0,0,[0] - только выключеный чекбокс
                this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId);
                break;
            case min === 0 && max === 1 && def === 0: // 0,1 [0]- только чекбокс
                this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId);
                break;
            case min === 0 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
                this.renderCheckbox(element, true, itemQuantity, modifireDiv, groupId);
                break;
            case min === 1 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
                console.error(element.dish.name, "Значение не поддается настройке:", min, max, def);
                break;
            case min <= max && def >= min && def <= max && max > 1: //d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-
                this.renderInputButton(element, groupId, itemQuantity, modifireDiv);
                break;
            default:
                console.error(element.dish.name, "Ошибка рендера модификатора, для значений:", min, max, def);
                break;
        }
        if (element.maxAmount > 0 && element.minAmount > 0) {
        }
        else {
        }
        // Рендер блока стоимости и веса модификатора
        // let weightPriceDiv = this.renderer.createElement('div');
        // this.renderer.addClass(weightPriceDiv, 'modal-price');
        // let weight;
        // if(element.dish.weight>0){
        //   weight =  element.dish.weight + " г ";
        // }
        // let slash = "/ ";
        // let price;
        // if(element.dish.price>0){
        //   price = element.dish.price + "&nbsp;&#x20bd;";
        // }
        // let weightAndPriceHTML = (weight||'')+(weight&&price? slash : '')+( price || '');
        // this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
        // this.renderer.appendChild(modifireDiv, weightPriceDiv);
        let rightweigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
        let weightModifireRight = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireRight, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireRight, 'zero');
        }
        this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');
        this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
        this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);
        let price = this.renderer.createElement("div");
        this.renderer.addClass(price, "item-price");
        let priceValue;
        if (element.dish.price > 0) {
            priceValue = element.dish.price + "<div class = 'currency'>&nbsp;&#x20bd;</div>";
            this.renderer.setProperty(price, "innerHTML", priceValue);
            this.renderer.appendChild(modifireDiv, price);
        }
        else {
            this.renderer.addClass(price, "zero-price");
        }
        this.setModifiers();
        this.innerTotalWeight(this.weightTotal);
        this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
    }
    renderCheckbox(element, isActive, itemQuantity, modifireDiv, groupId) {
        let input = this.renderer.createElement("input");
        this.renderer.setAttribute(input, "type", "checkbox");
        this.renderer.setAttribute(input, "id", element.modifierId);
        if (isActive) {
            this.renderer.setProperty(input, 'checked', true);
            element.checked = true;
            this.stateModifiers[groupId][element.modifierId] = true;
            this.amountModifiers[groupId][element.modifierId] = 1;
        }
        else {
            element.checked = false;
            this.stateModifiers[groupId][element.modifierId] = false;
            this.amountModifiers[groupId][element.modifierId] = 0;
        }
        this.renderer.addClass(input, "modal-checkbox");
        this.renderer.appendChild(itemQuantity, input);
        this.renderer.listen(input, "change", e => {
            if (this.idRadioBox(groupId)) {
                for (const key in this.stateModifiers[groupId]) {
                    if (this.stateModifiers[groupId].hasOwnProperty(key)) {
                        this.stateModifiers[groupId][key] = false;
                        // this.renderer.setProperty(input, 'checked',   true);
                    }
                }
                let groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                groupDivBlock.forEach(element => {
                    if (element.id != e.target.id)
                        element.checked = false;
                });
            }
            this.stateModifiers[groupId][e.target.id] = e.target.checked;
            if (e.target.checked) {
                this.amountModifiers[groupId][e.target.id] = 1;
            }
            this.setModifiers();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
        this.renderer.appendChild(modifireDiv, itemQuantity);
    }
    renderInputButton(element, groupId, itemQuantity, modifireDiv) {
        let startAmount;
        if (element.defaultAmount > 0) {
            startAmount = element.defaultAmount;
        }
        else {
            startAmount = element.minAmount;
        }
        if (startAmount > 0) {
            this.stateModifiers[groupId][element.modifierId] = true;
        }
        let aMinusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aMinusDiv, "quantity__button");
        this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
        this.renderer.appendChild(itemQuantity, aMinusDiv);
        this.renderer.listen(aMinusDiv, "click", e => {
            let value = +this.amountModifiers[groupId][element.modifierId];
            this.amountModifiers[groupId][element.modifierId] = value - 1;
            if (this.amountModifiers[groupId][element.modifierId] < element.minAmount)
                this.amountModifiers[groupId][element.modifierId] = element.minAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifiers[groupId][element.modifierId]);
            if (this.amountModifiers[groupId][element.modifierId] === 0) {
                this.stateModifiers[groupId][element.modifierId] = false;
            }
            this.setModifiers();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
        let span = this.renderer.createElement("span");
        this.renderer.addClass(span, "item-quantity__counter");
        this.amountModifiers[groupId][element.modifierId] = startAmount;
        this.renderer.setProperty(span, "innerHTML", this.amountModifiers[groupId][element.modifierId]);
        this.renderer.appendChild(itemQuantity, span);
        let aPlusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aPlusDiv, "quantity__button");
        this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
        this.renderer.appendChild(itemQuantity, aPlusDiv);
        this.renderer.appendChild(modifireDiv, itemQuantity);
        this.renderer.listen(aPlusDiv, "click", e => {
            let value = +this.amountModifiers[groupId][element.modifierId];
            this.amountModifiers[groupId][element.modifierId] = value + 1;
            if (this.amountModifiers[groupId][element.modifierId] >
                element.maxAmount &&
                element.maxAmount != 0)
                this.amountModifiers[groupId][element.modifierId] = element.maxAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifiers[groupId][element.modifierId]);
            if (this.amountModifiers[groupId][element.modifierId] > 0) {
                this.stateModifiers[groupId][element.modifierId] = true;
            }
            this.setModifiers();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
    }
    setModifiers() {
        let modifiersToSelect = [];
        /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
          modifiersToSelect = this.selectedModifiers;
        }*/
        let modifiers = [];
        console.info('setModifiers modifiersToSelect', modifiersToSelect);
        console.info('setModifiers stateModifiers before', this.stateModifiers);
        console.info('setModifiers selectedModifiers before', this.selectedModifiers);
        for (let groupId in this.stateModifiers) {
            for (let modifireId in this.stateModifiers[groupId]) {
                if (this.stateModifiers[groupId][modifireId] || modifiersToSelect.find(item => item.modifierId == modifireId)) {
                    modifiers.push({
                        id: modifireId,
                        amount: this.amountModifiers[groupId][modifireId],
                        groupId: groupId
                    });
                }
            }
        }
        this.selectedModifiers = modifiers;
        if (this.dish.modifiers.length > 0) {
            let message = [];
            this.dish.modifiers.forEach(group => {
                if (group.required) {
                    if (this.stateModifiers[group.modifierId]) {
                        let selectedModif = [];
                        let localModif = this.stateModifiers[group.modifierId]; //.filter(element=>element);
                        for (const mod in localModif) {
                            if (localModif.hasOwnProperty(mod)) {
                                if (localModif[mod]) {
                                    selectedModif.push(localModif[mod]);
                                }
                            }
                        }
                        if (selectedModif.length < group.minAmount) {
                            message.push({
                                type: "warning",
                                title: "Внимание",
                                body: " Обязательно выберите модификаторы из категории: " +
                                    group.group.name
                            });
                            this.validate.emit(false);
                            this.cartService.setModifiers(modifiers, message);
                        }
                        else {
                            this.validate.emit(true);
                            this.cartService.setModifiers(modifiers, []);
                        }
                    }
                    else {
                        message.push({
                            type: "warning",
                            title: "Внимание",
                            body: " Обязательно выберите модификаторы из категории: " +
                                group.group.name
                        });
                        this.validate.emit(false);
                        this.cartService.setModifiers(modifiers, message);
                    }
                }
                else {
                    this.validate.emit(true);
                    this.cartService.setModifiers(modifiers);
                }
            });
        }
        else {
            this.validate.emit(true);
            this.cartService.setModifiers(modifiers, []);
        }
        console.info('setModifiers stateModifiers after', this.stateModifiers);
        console.info('setModifiers selectedModifiers after', this.selectedModifiers);
    }
    /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
     если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
    idRadioBox(groupId) {
        let currentGroup = this.dish.modifiers.find(x => x.modifierId === groupId);
        return currentGroup.minAmount === 1 && currentGroup.maxAmount === 1;
    }
    // Проверяет минимальное количество модификаторовкоторые были выбраны
    checkMinAmountModifiers(groupId, modifire) {
    }
    ngOnDestroy() {
        //this.dish.modifiers =[];
        this.validate.emit(true);
        this.cartService.setModifiers([], []);
    }
}
DishCalcDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dishCalc]'
            },] }
];
DishCalcDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgCartService }
];
DishCalcDirective.propDecorators = {
    dish: [{ type: Input }],
    amount: [{ type: Input }],
    selectedModifiers: [{ type: Input }],
    validate: [{ type: Output }],
    amountDishToAdd: [{ type: Output }]
};

class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.paymentRedirect = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(() => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
                return true;
            }
        }), 
        /*filter(() => {
          const formChangeKey = JSON.stringify({
            1: this.locationId,
            2: this.streetId,
            3: this.street,
            4: this.home,
            5: this.cartTotal,
            6: this.bonuses,
            7: this.delivery,
            8: this.paymentMethodId
          });

          if(formChangeKey !== this.lastFormChangeKey) {
            this.lastFormChangeKey = formChangeKey;
            return true;
          }
        }),*/
        debounceTime(1000))
            .subscribe(() => this.checkStreet());
    }
    onClick() {
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        let comment = this.comment || "";
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.id,
            "comment": comment,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
        };
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.callback) {
            data["customData"] = { callback: true };
            data["comment"] = 'Позвоните мне для уточнения деталей. ' + data["comment"];
        }
        //if(this.date) {
        //  data["date"] = this.date;
        //}
        //if(this.notifyMethodId) {
        //  data["notifyMethodId"] = this.notifyMethodId;
        //}
        data["selfService"] = this.selfService;
        //if(this.bonuses) {
        //  data['bonuses'] = this.bonuses.map(b => {
        //    return {
        //      name: b.name,
        //      amount: b.amount
        //    }
        //  });
        //}
        if (this.locationId) {
            //  data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "street": this.street,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        const cartId = this.cart.id;
        const onSuccess = result => {
            var _a, _b;
            if ((_b = (_a = result === null || result === void 0 ? void 0 : result.action) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.redirectLink) {
                this.paymentRedirect.emit(result.action.data['redirectLink']);
            }
            else {
                console.log('Emit cartId', cartId);
                this.success.emit(cartId);
            }
        };
        if (this.phonePaymentSmsCode) {
            this.cartService
                .paymentLink$(this.phonePaymentSmsCode, this.phone)
                .subscribe(onSuccess, error => this.error.emit(error));
        }
        else {
            this.cartService
                .orderCart$(data)
                .subscribe(onSuccess, error => this.error.emit(error));
        }
    }
    ngOnChanges(changes) {
        this.cartService.OrderFormChange.next(changes);
    }
    checkStreet() {
        //if(this.streetId == '0') return;
        let comment = this.comment || "Не указан";
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.id,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : null,
                "mail": this.email,
                "name": this.name || null
            },
            "personsCount": +this.personsCount
        };
        data["selfService"] = this.selfService;
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.callback) {
            data["customData"] = { callback: true };
        }
        if (this.date) {
            data["date"] = this.date;
        }
        if (this.notifyMethodId) {
            data["notifyMethodId"] = this.notifyMethodId;
        }
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "street": this.street,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        if (this.callback) {
            data["customData"] = { callback: true };
        }
        this.isChecking.emit(true);
        this.cartService
            .checkCart$(data)
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        result => this.isChecking.emit(false), error => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[checkout]'
            },] }
];
CheckoutDirective.ctorParameters = () => [
    { type: NgCartService }
];
CheckoutDirective.propDecorators = {
    cartTotal: [{ type: Input }],
    bonuses: [{ type: Input }],
    name: [{ type: Input }],
    email: [{ type: Input }],
    phone: [{ type: Input }],
    phonePaymentSmsCode: [{ type: Input }],
    delivery: [{ type: Input }],
    selfService: [{ type: Input }],
    locationId: [{ type: Input }],
    street: [{ type: Input }],
    streetId: [{ type: Input }],
    home: [{ type: Input }],
    housing: [{ type: Input }],
    apartment: [{ type: Input }],
    entrance: [{ type: Input }],
    doorphone: [{ type: Input }],
    floor: [{ type: Input }],
    paymentMethod: [{ type: Input }],
    paymentMethodId: [{ type: Input }],
    personsCount: [{ type: Input }],
    comment: [{ type: Input }],
    callback: [{ type: Input }],
    date: [{ type: Input }],
    notifyMethodId: [{ type: Input }],
    success: [{ type: Output }],
    paymentRedirect: [{ type: Output }],
    error: [{ type: Output }],
    isChecking: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class SetDishCommentDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.setComment();
    }
    setComment() {
        this.cartService.setDishComment$(this.dish.id, this.comment).subscribe(res => this.success.emit(true), err => this.error.emit(err));
    }
}
SetDishCommentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[setDishComment]'
            },] }
];
SetDishCommentDirective.ctorParameters = () => [
    { type: NgCartService }
];
SetDishCommentDirective.propDecorators = {
    comment: [{ type: Input }],
    dish: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

const DIRECTIVES = [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    //ModifiresDirective,
    DishCalcDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
];
const defaultUrl = 'https://stage4.api.lifenadym.webresto.dev/graphql';
class NgGqlModule {
    constructor(apollo, httpLink, config) {
        // Create an http link:
        const http = httpLink.create({
            uri: config.url,
        });
        // Create a WebSocket link:
        const ws = new WebSocketLink({
            uri: config.url.replace('http', 'ws'),
            options: {
                reconnect: true,
            },
        });
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
        // split based on operation type
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (kind === 'OperationDefinition' && operation === 'subscription');
        }, ws, http);
        if (apollo.client)
            return;
        apollo.create({
            link,
            cache: new InMemoryCache()
        });
    }
    static forRoot(config) {
        return {
            ngModule: NgGqlModule,
            providers: [
                {
                    provide: 'config',
                    useValue: config
                }
            ]
        };
    }
}
NgGqlModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [DIRECTIVES],
                declarations: [DIRECTIVES]
            },] }
];
NgGqlModule.ctorParameters = () => [
    { type: Apollo },
    { type: HttpLink },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] }] }
];

class StateService {
    constructor() {
        this.maintenance$ = new BehaviorSubject(null);
    }
}
StateService.ɵprov = ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
StateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
StateService.ctorParameters = () => [];

class EventMessage {
    constructor(type, title, body) {
        this.type = type;
        this.title = title;
        this.body = body;
    }
}

/*
 * Public API Surface of ng-gql
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddDishToCartDirective, AmountCartDirective, Cart, CartDish, CheckPhoneResponse, CheckResponse, CheckoutDirective, DeleteFromCartDirective, Dish, DishCalcDirective, EventMessage, EventerService, Group, GroupModifier, Modifier, NgCartService, NgGqlModule, NgGqlService, Order, OrderCartUserDirective, PaymentMethod, Phone, SetAmountDirective, SetDishCommentDirective, StateService };
//# sourceMappingURL=webresto-ng-gql.js.map
