import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, Input, Output, HostListener, NgModule, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap, first, take, map, filter, catchError, debounceTime } from 'rxjs/operators';
import * as i1 from 'apollo-angular';
import { gql } from 'apollo-angular';
import { split, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import * as i2 from 'apollo-angular/http';

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
const PaymentMethodGql = {
    queries: {
        getPaymentMethod: (cartId = null, customFields) => {
            if (cartId == 'null') {
                cartId = null;
            }
            ;
            const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
            return gql `
				query GetPaymentMethods {
					paymentMethods:paymentMethod${queryArguments} {
						...PaymentMethodFragment
						${(customFields['PaymentMethod'] || []).join('\n')}
					}
				}
				${PaymentMethodFragments.paymentMethod}
			`;
        }
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
			seoDescription
			seoKeywords
			seoText
			seoTitle
			carbohydrateAmount
			carbohydrateFullAmount
			energyAmount
			energyFullAmount
			fatAmount
			fatFullAmount
			fiberAmount
			fiberFullAmount
			measureUnit
			type
			order
			isDeleted
			isModificable
			composition
			visible
			modifier
			promo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
				dishPlaceholder {
					...ImageFragment
				}
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};
const DishGql = {
    queries: {
        getDishes: (customFields) => gql `
			query GetDishes {
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${DishFragments.dish}
		`
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
			discountType
			comment
			weight
			totalWeight
			itemTotal
			uniqueItems
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
			customData
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
const CartGql = {
    queries: {
        getOrder: (orderId, customFields) => {
            const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
            return gql `
				query getOrder {
					getOrder${queryArguments} {
						cart {
							...CartFragment
							...CartOrderDataFragment
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
							}
							paymentMethod {
								...PaymentMethodFragment
								${(customFields['PaymentMethod'] || []).join('\n')}
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
        },
        getCart: (cartId = null, customFields) => {
            if (cartId == 'null')
                cartId = null;
            const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
            return gql `
				query GetCart {
					cart${queryArguments} {
						...CartFragment
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
			`;
        },
        getPhone: (phone, customFields) => {
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
						${(customFields['Phone'] || []).join('\n')}
					}
				}
			`;
        },
        checkPhone: (phone, customFields) => {
            return gql `
				query checkPhone {
					checkPhone(phone: "${phone}") {
						type
						title
						message
						confirmed
						firstbuy
						${(customFields['Phone'] || []).join('\n')}
					}
				}
			`;
        }
    },
    mutations: {
        addDishToCart: (customFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
        },
        removeDishFromCart: (customFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
        },
        setDishAmount: (customFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
        },
        setDishComment: (customFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
        },
        orderCart: (customFields) => {
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
							${(customFields['Cart'] || []).join('\n')}
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
							}
							deliveryItem {
								...DishFragment
								${(customFields['Dish'] || []).join('\n')}
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
        },
        checkCart: (customFields) => {
            return gql `
				mutation checkCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!,
					$comment: String,
					$date: String,
					$customData: Json
				) {
					checkCart(
						cartId: $cartId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer,
						comment: $comment,
						date: $date,
						customData: $customData
					) {
						cart {
							...CartFragment
							${(customFields['Cart'] || []).join('\n')}
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
							}
							deliveryItem {
								...DishFragment
								${(customFields['Dish'] || []).join('\n')}
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
        },
        checkPhoneCode: (customFields) => {
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
						${(customFields['PhoneCode'] || []).join('\n')}
					}
				}
			`;
        },
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
const GroupGql = {
    queries: {
        getGroups: () => gql `
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
		`,
        getGroupsAndDishes: (customFields) => gql `
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
					${(customFields['Group'] || []).join('\n')}
				}
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`
    }
};

class EventMessage {
    constructor(type, title, body) {
        this.type = type;
        this.title = title;
        this.body = body;
    }
}

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
					discount
				}
			}
		}
	`
};
const NavigationGql = {
    queries: {
        getNavigationes: (customFields) => gql `
			query GetNavigation {
				navigation {
					...NavigationFragment
					${(customFields['Navigation'] || []).join('\n')}
				}
			}
			${NavigationFragments.navigation}
		`
    }
};

;

class NgGqlService {
    constructor(apollo) {
        this.apollo = apollo;
        this.menu$ = new BehaviorSubject(null);
        this.dishes$ = new BehaviorSubject(null);
        this.cart$ = new BehaviorSubject(null);
        this.navigationData$ = new BehaviorSubject(null);
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
        return this.cart$.asObservable().pipe(filter((cart) => !!cart));
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
            ;
            queryArgumentsStrings.push(`${key}: ${valueString}`);
        }
        ;
        let queryArgumentsString = queryArgumentsStrings.length
            ? `(${queryArgumentsStrings.join(', ')})`
            : ``;
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
        ;
        return this.apollo.watchQuery({
            query: gql `query ${name}${query}`,
            canonizeResults: true
        }).valueChanges
            .pipe(map(res => res.error || res.errors ? res.data : null), filter((data) => !!data));
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
NgGqlService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlService, deps: [{ token: i1.Apollo }], target: i0.ɵɵFactoryTarget.Injectable });
NgGqlService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Apollo }]; } });

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
EventerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: EventerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EventerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: EventerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: EventerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const LS_NAME = 'cartId';
class NgCartService {
    constructor(ngGqlService, eventer) {
        this.ngGqlService = ngGqlService;
        this.eventer = eventer;
        this.cart = new BehaviorSubject(null);
        this.modifiers$ = new BehaviorSubject([]);
        this.modifiersMessage$ = new BehaviorSubject([]);
        this.messages = [];
        this.OrderFormChange = new BehaviorSubject(null);
        this.initialStorage();
        this.modifiersMessage$.subscribe(messages => this.messages = messages);
    }
    ;
    getCartId() {
        return localStorage.getItem(LS_NAME) ?? undefined;
    }
    setCartId(cartId) {
        if (cartId) {
            localStorage.setItem(LS_NAME, cartId);
        }
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
        this.cartId = this.getCartId();
        this.cartSubscription?.unsubscribe();
        this.cartSubscription = this.ngGqlService
            .getCart$(this.cartId)
            .pipe(tap(cart => {
            console.log('cart tap', cart);
            if (cart?.state == 'ORDER') {
                throw new Error('Cart in order state');
            }
            this.setCartId(cart.id);
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
        return this.ngGqlService.customMutation$('paymentLink', {
            paymentLink: 1
        }, {
            cartId: this.cartId,
            phone,
            fromPhone
        })
            .pipe(map(data => data.data), catchError(error => {
            console.log('error', error);
            this.eventer.emitMessageEvent({
                type: 'info',
                title: 'Не удалось отправить ссылку для оплаты.',
                body: error.message
            });
            return of(null);
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
NgCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgCartService, deps: [{ token: NgGqlService }, { token: EventerService }], target: i0.ɵɵFactoryTarget.Injectable });
NgCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgCartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgCartService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: NgGqlService }, { type: EventerService }]; } });

class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.modifiers = [];
        this.amountDish = 0;
        this.replaceCartDishId = false;
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
            "cartDishId": this.cart?.id
        };
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddDishToCartDirective, deps: [{ token: NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
AddDishToCartDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: AddDishToCartDirective, selector: "[addToCart]", inputs: { dish: "dish", amountDish: "amountDish", comment: "comment", replaceCartDishId: "replaceCartDishId" }, outputs: { loading: "loading", success: "success", error: "error" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddDishToCartDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[addToCart]'
                }]
        }], ctorParameters: function () { return [{ type: NgCartService }]; }, propDecorators: { dish: [{
                type: Input
            }], amountDish: [{
                type: Input
            }], comment: [{
                type: Input
            }], replaceCartDishId: [{
                type: Input
            }], loading: [{
                type: Output
            }], success: [{
                type: Output
            }], error: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.personsCount = 0;
        this.success = new EventEmitter();
        this.paymentRedirect = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(value => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
                return true;
            }
            else {
                return false;
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
        let data = {
            "cartId": this.cart.id,
            //"comment": comment,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
            //"personsCount": +this.personsCount
        };
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        //if(this.callback) {
        //  data["customData"] = { callback: true };
        //  data["comment"] = 'Позвоните мне для уточнения деталей. ' + data["comment"];
        //}
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
        const onSuccess = (result) => {
            if (result?.action?.data?.redirectLink) {
                this.paymentRedirect.emit(result.action.data['redirectLink']);
            }
            else {
                console.log('Emit cartId', cartId);
                this.success.emit(cartId);
            }
        };
        if (this.phonePaymentSmsCode && this.phone) {
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
        let comment = this.comment || "";
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.id,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : '',
                "mail": this.email,
                "name": this.name || ''
            },
            "personsCount": +this.personsCount
        };
        data["selfService"] = this.selfService;
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.callback) {
            data["customData"] = { callback: true };
            data["comment"] = 'Позвоните мне для уточнения деталей. ' + data["comment"];
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
        () => this.isChecking.emit(false), () => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CheckoutDirective, deps: [{ token: NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
CheckoutDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: CheckoutDirective, selector: "[checkout]", inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", phonePaymentSmsCode: "phonePaymentSmsCode", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", callback: "callback", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", paymentRedirect: "paymentRedirect", error: "error", isChecking: "isChecking" }, host: { listeners: { "click": "onClick()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CheckoutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[checkout]'
                }]
        }], ctorParameters: function () { return [{ type: NgCartService }]; }, propDecorators: { cartTotal: [{
                type: Input
            }], bonuses: [{
                type: Input
            }], name: [{
                type: Input
            }], email: [{
                type: Input
            }], phone: [{
                type: Input
            }], phonePaymentSmsCode: [{
                type: Input
            }], delivery: [{
                type: Input
            }], selfService: [{
                type: Input
            }], locationId: [{
                type: Input
            }], street: [{
                type: Input
            }], streetId: [{
                type: Input
            }], home: [{
                type: Input
            }], housing: [{
                type: Input
            }], apartment: [{
                type: Input
            }], entrance: [{
                type: Input
            }], doorphone: [{
                type: Input
            }], floor: [{
                type: Input
            }], paymentMethod: [{
                type: Input
            }], paymentMethodId: [{
                type: Input
            }], personsCount: [{
                type: Input
            }], comment: [{
                type: Input
            }], callback: [{
                type: Input
            }], date: [{
                type: Input
            }], notifyMethodId: [{
                type: Input
            }], success: [{
                type: Output
            }], paymentRedirect: [{
                type: Output
            }], error: [{
                type: Output
            }], isChecking: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

//import { ModifiresDirective } from './directives/modifires.directive';
const DIRECTIVES = [
    AddDishToCartDirective,
    CheckoutDirective,
];
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
NgGqlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, deps: [{ token: i1.Apollo }, { token: i2.HttpLink }, { token: 'config' }], target: i0.ɵɵFactoryTarget.NgModule });
NgGqlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, declarations: [AddDishToCartDirective,
        CheckoutDirective], exports: [AddDishToCartDirective,
        CheckoutDirective] });
NgGqlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [DIRECTIVES],
                    declarations: [DIRECTIVES]
                }]
        }], ctorParameters: function () { return [{ type: i1.Apollo }, { type: i2.HttpLink }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }]; } });

/*
 * Public API Surface of ng-gql
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddDishToCartDirective, CartFragments, CartGql, CheckoutDirective, DishFragments, DishGql, EventMessage, EventerService, GroupFragments, GroupGql, NavigationFragments, NavigationGql, NgCartService, NgGqlModule, NgGqlService, PaymentMethodFragments, PaymentMethodGql };
//# sourceMappingURL=webresto-ng-gql.mjs.map
