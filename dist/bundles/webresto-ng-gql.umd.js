(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('apollo-angular'), require('rxjs'), require('rxjs/operators'), require('apollo-angular/http'), require('@apollo/client/core'), require('@apollo/client/link/ws'), require('@apollo/client/utilities')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-gql', ['exports', '@angular/core', 'apollo-angular', 'rxjs', 'rxjs/operators', 'apollo-angular/http', '@apollo/client/core', '@apollo/client/link/ws', '@apollo/client/utilities'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-gql'] = {}), global.ng.core, global.i1, global.rxjs, global.rxjs.operators, global.http, global.core, global.ws, global.utilities));
}(this, (function (exports, i0, i1, rxjs, operators, http, core, ws, utilities) { 'use strict';

    var CartDish = /** @class */ (function () {
        function CartDish() {
        }
        return CartDish;
    }());

    var Cart = /** @class */ (function () {
        function Cart() {
        }
        return Cart;
    }());

    var Order = /** @class */ (function () {
        function Order() {
        }
        return Order;
    }());

    var CheckPhoneResponse = /** @class */ (function () {
        function CheckPhoneResponse() {
        }
        return CheckPhoneResponse;
    }());

    var CheckResponse = /** @class */ (function () {
        function CheckResponse() {
        }
        return CheckResponse;
    }());

    var Phone = /** @class */ (function () {
        function Phone() {
        }
        return Phone;
    }());

    var Dish = /** @class */ (function () {
        function Dish() {
        }
        return Dish;
    }());

    var Group = /** @class */ (function () {
        function Group() {
        }
        return Group;
    }());

    var Modifier = /** @class */ (function () {
        function Modifier() {
        }
        return Modifier;
    }());

    var GroupModifier = /** @class */ (function () {
        function GroupModifier() {
            this.totalAmount = 0;
        }
        return GroupModifier;
    }());

    var PaymentMethod = /** @class */ (function () {
        function PaymentMethod() {
        }
        return PaymentMethod;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var PaymentMethodFragments = {
        paymentMethod: i1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tfragment PaymentMethodFragment on PaymentMethod {\n\t\t\tid\n\t\t\ttype\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tadapter\n\t\t\torder\n\t\t\tenable\n\t\t\tcustomData\n\t\t}\n\t"], ["\n\t\tfragment PaymentMethodFragment on PaymentMethod {\n\t\t\tid\n\t\t\ttype\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tadapter\n\t\t\torder\n\t\t\tenable\n\t\t\tcustomData\n\t\t}\n\t"])))
    };
    var ɵ0 = function (cartId) {
        if (cartId === void 0) { cartId = null; }
        if (cartId == 'null')
            cartId = null;
        var queryArguments = cartId ? "(cartId: \"" + cartId + "\")" : '';
        return i1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\t\tquery GetPaymentMethods {\n\t\t\t\t\tpaymentMethods:paymentMethod", " {\n\t\t\t\t\t\t...PaymentMethodFragment\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tquery GetPaymentMethods {\n\t\t\t\t\tpaymentMethods:paymentMethod", " {\n\t\t\t\t\t\t...PaymentMethodFragment\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t"])), queryArguments, PaymentMethodFragments.paymentMethod);
    };
    var PaymentMethodGql = {
        queries: {
            getPaymentMethod: ɵ0
        }
    };
    var templateObject_1, templateObject_2;

    var ImageFragments = {
        image: i1.gql(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n\t\tfragment ImageFragment on Image {\n\t\t\tid\n\t\t\tuploadDate\n\t\t\timages\n\t\t}\n\t"], ["\n\t\tfragment ImageFragment on Image {\n\t\t\tid\n\t\t\tuploadDate\n\t\t\timages\n\t\t}\n\t"])))
    };
    var templateObject_1$1;

    var ModifierFragments = {
        modifier: i1.gql(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n\t\tfragment ModifierFragment on Modifier {\n\t\t\tmodifierId\n\t\t\tmaxAmount\n\t\t\tminAmount\n\t\t\tdefaultAmount\n\t\t\thideIfDefaultAmount\n\t\t\tdish {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tgroupId\n\t\t\t\tprice\n\t\t\t\tweight\n\t\t\t\tbalance\n\t\t\t\ttags\n\t\t\t\timages {\n\t\t\t\t\t...ImageFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t", "\n\t"], ["\n\t\tfragment ModifierFragment on Modifier {\n\t\t\tmodifierId\n\t\t\tmaxAmount\n\t\t\tminAmount\n\t\t\tdefaultAmount\n\t\t\thideIfDefaultAmount\n\t\t\tdish {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tgroupId\n\t\t\t\tprice\n\t\t\t\tweight\n\t\t\t\tbalance\n\t\t\t\ttags\n\t\t\t\timages {\n\t\t\t\t\t...ImageFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t", "\n\t"])), ImageFragments.image)
    };
    var templateObject_1$2;

    var GroupModifierFragments = {
        groupModifier: i1.gql(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n\t\tfragment GroupModifierFragment on GroupModifier {\n\t\t\tmodifierId\n\t\t\tmaxAmount\n\t\t\tminAmount\n\t\t\trequired\n\t\t\tchildModifiers {\n\t\t\t\t...ModifierFragment\n\t\t\t}\n\t\t\tgroup {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\t", "\n\t"], ["\n\t\tfragment GroupModifierFragment on GroupModifier {\n\t\t\tmodifierId\n\t\t\tmaxAmount\n\t\t\tminAmount\n\t\t\trequired\n\t\t\tchildModifiers {\n\t\t\t\t...ModifierFragment\n\t\t\t}\n\t\t\tgroup {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\t", "\n\t"])), ModifierFragments.modifier)
    };
    var templateObject_1$3;

    var DishFragments = {
        dish: i1.gql(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n\t\tfragment DishFragment on Dish {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tgroupId\n\t\t\tprice\n\t\t\tweight\n\t\t\tbalance\n\t\t\ttags\n\t\t\tadditionalInfo\n\t\t\timages {\n\t\t\t\t...ImageFragment\n\t\t\t}\n\t\t\tmodifiers {\n\t\t\t\t...GroupModifierFragment\n\t\t\t}\n\t\t\tparentGroup {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\t", "\n\t\t", "\n\t"], ["\n\t\tfragment DishFragment on Dish {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tgroupId\n\t\t\tprice\n\t\t\tweight\n\t\t\tbalance\n\t\t\ttags\n\t\t\tadditionalInfo\n\t\t\timages {\n\t\t\t\t...ImageFragment\n\t\t\t}\n\t\t\tmodifiers {\n\t\t\t\t...GroupModifierFragment\n\t\t\t}\n\t\t\tparentGroup {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\t", "\n\t\t", "\n\t"])), ImageFragments.image, GroupModifierFragments.groupModifier)
    };
    var ɵ0$1 = function () { return i1.gql(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n\t\t\tquery GetDishes {\n\t\t\t\tdishes {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t"], ["\n\t\t\tquery GetDishes {\n\t\t\t\tdishes {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t"])), DishFragments.dish); };
    var DishGql = {
        queries: {
            getDishes: ɵ0$1
        }
    };
    var templateObject_1$4, templateObject_2$1;

    var CartDishFragments = {
        cartDish: i1.gql(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n\t\tfragment CartDishFragment on CartDish {\n\t\t\tid\n\t\t\tamount\n\t\t\tdish {\n\t\t\t\t...DishFragment\n\t\t\t}\n\t\t\tmodifiers {\n\t\t\t\tid\n\t\t\t\tdish {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t\tamount\n\t\t\t\tgroupId\n\t\t\t}\n\t\t\tdiscountTotal\n\t\t\tcomment\n\t\t\tweight\n\t\t\ttotalWeight\n\t\t}\n\t\t", "\n\t"], ["\n\t\tfragment CartDishFragment on CartDish {\n\t\t\tid\n\t\t\tamount\n\t\t\tdish {\n\t\t\t\t...DishFragment\n\t\t\t}\n\t\t\tmodifiers {\n\t\t\t\tid\n\t\t\t\tdish {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t\tamount\n\t\t\t\tgroupId\n\t\t\t}\n\t\t\tdiscountTotal\n\t\t\tcomment\n\t\t\tweight\n\t\t\ttotalWeight\n\t\t}\n\t\t", "\n\t"])), DishFragments.dish)
    };
    var templateObject_1$5;

    var CartFragments = {
        cart: i1.gql(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n\t\tfragment CartFragment on Cart {\n\t\t\tid\n\t\t\tdishesCount\n\t\t\tcomment\n\t\t\tpersonsCount\n\t\t\tdeliveryDescription\n\t\t\tmessage\n\t\t\tdeliveryCost\n\t\t\ttotalWeight\n\t\t\ttotal\n\t\t\torderTotal\n\t\t\tcartTotal\n\t\t\tdiscountTotal\n\t\t\tstate\n\t\t}\n\t"], ["\n\t\tfragment CartFragment on Cart {\n\t\t\tid\n\t\t\tdishesCount\n\t\t\tcomment\n\t\t\tpersonsCount\n\t\t\tdeliveryDescription\n\t\t\tmessage\n\t\t\tdeliveryCost\n\t\t\ttotalWeight\n\t\t\ttotal\n\t\t\torderTotal\n\t\t\tcartTotal\n\t\t\tdiscountTotal\n\t\t\tstate\n\t\t}\n\t"]))),
        cartOrderData: i1.gql(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n\t\tfragment CartOrderDataFragment on Cart {\n\t\t\trmsDelivered\n\t\t\trmsId\n\t\t\trmsOrderNumber\n\t\t\trmsOrderData\n\t\t\trmsDeliveryDate\n\t\t\trmsErrorMessage\n\t\t\trmsErrorCode\n\t\t\trmsStatusCode\n\t\t\tcustomer\n\t\t\taddress\n\t\t\tpaid\n\t\t\tisPaymentPromise\n\t\t}\n\t"], ["\n\t\tfragment CartOrderDataFragment on Cart {\n\t\t\trmsDelivered\n\t\t\trmsId\n\t\t\trmsOrderNumber\n\t\t\trmsOrderData\n\t\t\trmsDeliveryDate\n\t\t\trmsErrorMessage\n\t\t\trmsErrorCode\n\t\t\trmsStatusCode\n\t\t\tcustomer\n\t\t\taddress\n\t\t\tpaid\n\t\t\tisPaymentPromise\n\t\t}\n\t"]))),
    };
    var ɵ0$2 = function (orderId) {
        var queryArguments = orderId ? "(orderNumber: \"" + orderId + "\")" : '';
        return i1.gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\t\tquery getOrder {\n\t\t\t\t\tgetOrder", " {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\t...CartOrderDataFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tpaymentMethod {\n\t\t\t\t\t\t\t\t...PaymentMethodFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcustomData\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tquery getOrder {\n\t\t\t\t\tgetOrder", " {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\t...CartOrderDataFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tpaymentMethod {\n\t\t\t\t\t\t\t\t...PaymentMethodFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcustomData\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), queryArguments, CartFragments.cart, CartDishFragments.cartDish, CartFragments.cartOrderData, PaymentMethodFragments.paymentMethod);
    }, ɵ1 = function (cartId) {
        if (cartId === void 0) { cartId = null; }
        if (cartId == 'null')
            cartId = null;
        var queryArguments = cartId ? "(cartId: \"" + cartId + "\")" : '';
        return i1.gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\t\tquery GetCart {\n\t\t\t\t\tcart", " {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tquery GetCart {\n\t\t\t\t\tcart", " {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), queryArguments, CartFragments.cart, CartDishFragments.cartDish);
    }, ɵ2 = function (phone) {
        return i1.gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\t\t\tquery phone {\n\t\t\t\t\tphone(phone: \"", "\") {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tphone\n\t\t\t\t\t\tisFirst\n\t\t\t\t\t\tisConfirm\n\t\t\t\t\t\tcodeTime\n\t\t\t\t\t\tconfirmCode\n\t\t\t\t\t\tcustomData\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery phone {\n\t\t\t\t\tphone(phone: \"", "\") {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tphone\n\t\t\t\t\t\tisFirst\n\t\t\t\t\t\tisConfirm\n\t\t\t\t\t\tcodeTime\n\t\t\t\t\t\tconfirmCode\n\t\t\t\t\t\tcustomData\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"])), phone);
    }, ɵ3 = function (phone) {
        return i1.gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t\t\t\tquery checkPhone {\n\t\t\t\t\tcheckPhone(phone: \"", "\") {\n\t\t\t\t\t\ttype\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tconfirmed\n\t\t\t\t\t\tfirstbuy\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery checkPhone {\n\t\t\t\t\tcheckPhone(phone: \"", "\") {\n\t\t\t\t\t\ttype\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tconfirmed\n\t\t\t\t\t\tfirstbuy\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"])), phone);
    }, ɵ4 = function () {
        return i1.gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\t\t\t\tmutation AddDishToCart(\n\t\t\t\t\t$cartId: String, \n\t\t\t\t\t$dishId: String, \n\t\t\t\t\t$amount: Int, \n\t\t\t\t\t$modifiers: Json, \n\t\t\t\t\t$comment: String,\n\t\t\t\t\t$from: String,\n\t\t\t\t\t$replace: Boolean,\n\t\t\t\t\t$cartDishId: Int\n\t\t\t\t) {\n\t\t\t\t\tcartAddDish(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tdishId: $dishId,\n\t\t\t\t\t\tamount: $amount,\n\t\t\t\t\t\tmodifiers: $modifiers,\n\t\t\t\t\t\tcomment: $comment,\n\t\t\t\t\t\tfrom: $from,\n\t\t\t\t\t\treplace: $replace,\n\t\t\t\t\t\tcartDishId: $cartDishId\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation AddDishToCart(\n\t\t\t\t\t$cartId: String, \n\t\t\t\t\t$dishId: String, \n\t\t\t\t\t$amount: Int, \n\t\t\t\t\t$modifiers: Json, \n\t\t\t\t\t$comment: String,\n\t\t\t\t\t$from: String,\n\t\t\t\t\t$replace: Boolean,\n\t\t\t\t\t$cartDishId: Int\n\t\t\t\t) {\n\t\t\t\t\tcartAddDish(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tdishId: $dishId,\n\t\t\t\t\t\tamount: $amount,\n\t\t\t\t\t\tmodifiers: $modifiers,\n\t\t\t\t\t\tcomment: $comment,\n\t\t\t\t\t\tfrom: $from,\n\t\t\t\t\t\treplace: $replace,\n\t\t\t\t\t\tcartDishId: $cartDishId\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ5 = function () {
        return i1.gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n\t\t\t\tmutation cartRemoveDish(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$cartDishId: Int!, \n\t\t\t\t\t$amount: Int!, \n\t\t\t\t) {\n\t\t\t\t\tcartRemoveDish(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tamount: $amount,\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation cartRemoveDish(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$cartDishId: Int!, \n\t\t\t\t\t$amount: Int!, \n\t\t\t\t) {\n\t\t\t\t\tcartRemoveDish(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tamount: $amount,\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ6 = function () {
        return i1.gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n\t\t\t\tmutation cartSetDishAmount(\n\t\t\t\t\t$cartId: String,\n\t\t\t\t\t$cartDishId: Int,\n\t\t\t\t\t$amount: Int\n\t\t\t\t) {\n\t\t\t\t\tcartSetDishAmount(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tamount: $amount\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation cartSetDishAmount(\n\t\t\t\t\t$cartId: String,\n\t\t\t\t\t$cartDishId: Int,\n\t\t\t\t\t$amount: Int\n\t\t\t\t) {\n\t\t\t\t\tcartSetDishAmount(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tamount: $amount\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ7 = function () {
        return i1.gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n\t\t\t\tmutation cartSetDishComment(\n\t\t\t\t\t$cartId: String,\n\t\t\t\t\t$cartDishId: Int,\n\t\t\t\t\t$comment: Int\n\t\t\t\t) {\n\t\t\t\t\tcartSetDishComment(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tcomment: $comment\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation cartSetDishComment(\n\t\t\t\t\t$cartId: String,\n\t\t\t\t\t$cartDishId: Int,\n\t\t\t\t\t$comment: Int\n\t\t\t\t) {\n\t\t\t\t\tcartSetDishComment(\n\t\t\t\t\t\tid: $cartId,\n\t\t\t\t\t\tcartDishId: $cartDishId,\n\t\t\t\t\t\tcomment: $comment\n\t\t\t\t\t) {\n\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ8 = function () {
        return i1.gql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n\t\t\t\tmutation orderCart(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$paymentMethodId: String!,\n\t\t\t\t\t$selfService: Boolean,\n\t\t\t\t\t$address: Address,\n\t\t\t\t\t$customer: Customer!\n\t\t\t\t) {\n\t\t\t\t\torderCart(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tpaymentMethodId: $paymentMethodId,\n\t\t\t\t\t\tselfService: $selfService,\n\t\t\t\t\t\taddress: $address,\n\t\t\t\t\t\tcustomer: $customer\n\t\t\t\t\t) {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmessage {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tmessage\n\t\t\t\t\t\t}\n\t\t\t\t\t\taction {\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tdata\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation orderCart(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$paymentMethodId: String!,\n\t\t\t\t\t$selfService: Boolean,\n\t\t\t\t\t$address: Address,\n\t\t\t\t\t$customer: Customer!\n\t\t\t\t) {\n\t\t\t\t\torderCart(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tpaymentMethodId: $paymentMethodId,\n\t\t\t\t\t\tselfService: $selfService,\n\t\t\t\t\t\taddress: $address,\n\t\t\t\t\t\tcustomer: $customer\n\t\t\t\t\t) {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmessage {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tmessage\n\t\t\t\t\t\t}\n\t\t\t\t\t\taction {\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tdata\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ9 = function () {
        return i1.gql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n\t\t\t\tmutation checkCart(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$paymentMethodId: String!,\n\t\t\t\t\t$selfService: Boolean,\n\t\t\t\t\t$address: Address,\n\t\t\t\t\t$customer: Customer!\n\t\t\t\t) {\n\t\t\t\t\tcheckCart(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tpaymentMethodId: $paymentMethodId,\n\t\t\t\t\t\tselfService: $selfService,\n\t\t\t\t\t\taddress: $address,\n\t\t\t\t\t\tcustomer: $customer\n\t\t\t\t\t) {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmessage {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tmessage\n\t\t\t\t\t\t}\n\t\t\t\t\t\taction {\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tdata\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"], ["\n\t\t\t\tmutation checkCart(\n\t\t\t\t\t$cartId: String!, \n\t\t\t\t\t$paymentMethodId: String!,\n\t\t\t\t\t$selfService: Boolean,\n\t\t\t\t\t$address: Address,\n\t\t\t\t\t$customer: Customer!\n\t\t\t\t) {\n\t\t\t\t\tcheckCart(\n\t\t\t\t\t\tcartId: $cartId,\n\t\t\t\t\t\tpaymentMethodId: $paymentMethodId,\n\t\t\t\t\t\tselfService: $selfService,\n\t\t\t\t\t\taddress: $address,\n\t\t\t\t\t\tcustomer: $customer\n\t\t\t\t\t) {\n\t\t\t\t\t\tcart {\n\t\t\t\t\t\t\t...CartFragment\n\t\t\t\t\t\t\tdishes {\n\t\t\t\t\t\t\t\t...CartDishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tdeliveryItem {\n\t\t\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmessage {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tmessage\n\t\t\t\t\t\t}\n\t\t\t\t\t\taction {\n\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\tdata\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"])), CartFragments.cart, CartDishFragments.cartDish, DishFragments.dish);
    }, ɵ10 = function () {
        return i1.gql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n\t\t\t\tmutation checkPhoneCode(\n\t\t\t\t\t$phone: String!,\n\t\t\t\t\t$code: String!\n\t\t\t\t) {\n\t\t\t\t\tsetPhoneCode(\n\t\t\t\t\t\tphone: $phone,\n\t\t\t\t\t\tcode: $code\n\t\t\t\t\t) {\n\t\t\t\t\t\ttype\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tconfirmed\n\t\t\t\t\t\tfirstbuy\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tmutation checkPhoneCode(\n\t\t\t\t\t$phone: String!,\n\t\t\t\t\t$code: String!\n\t\t\t\t) {\n\t\t\t\t\tsetPhoneCode(\n\t\t\t\t\t\tphone: $phone,\n\t\t\t\t\t\tcode: $code\n\t\t\t\t\t) {\n\t\t\t\t\t\ttype\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tconfirmed\n\t\t\t\t\t\tfirstbuy\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"])));
    };
    var CartGql = {
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
    var templateObject_1$6, templateObject_2$2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

    var GroupFragments = {
        group: i1.gql(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n\t\tfragment GroupFragment on Group {\n\t\t\tid\n\t\t\tdescription\n\t\t\tname\n\t\t\torder\n\t\t\tvisible\n\t\t\tslug\n\t\t}\n\t"], ["\n\t\tfragment GroupFragment on Group {\n\t\t\tid\n\t\t\tdescription\n\t\t\tname\n\t\t\torder\n\t\t\tvisible\n\t\t\tslug\n\t\t}\n\t"])))
    };
    var ɵ0$3 = function () { return i1.gql(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n\t\t\tquery GetMenu {\n\t\t\t\tgroups {\n\t\t\t\t\t...GroupFragment\n\t\t\t\t\tdishes {\n\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t\t", "\n\t\t"], ["\n\t\t\tquery GetMenu {\n\t\t\t\tgroups {\n\t\t\t\t\t...GroupFragment\n\t\t\t\t\tdishes {\n\t\t\t\t\t\t...DishFragment\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t\t", "\n\t\t"])), GroupFragments.group, DishFragments.dish); }, ɵ1$1 = function () { return i1.gql(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n\t\t\tquery GetGroupsAndDishes {\n\t\t\t\tgroups {\n\t\t\t\t\tparentGroup {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t\t...GroupFragment\n\t\t\t\t}\n\t\t\t\tdishes {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t\t", "\n\t\t"], ["\n\t\t\tquery GetGroupsAndDishes {\n\t\t\t\tgroups {\n\t\t\t\t\tparentGroup {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t\t...GroupFragment\n\t\t\t\t}\n\t\t\t\tdishes {\n\t\t\t\t\t...DishFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t\t", "\n\t\t"])), GroupFragments.group, DishFragments.dish); };
    var GroupGql = {
        queries: {
            getGroups: ɵ0$3,
            getGroupsAndDishes: ɵ1$1
        }
    };
    var templateObject_1$7, templateObject_2$3, templateObject_3$1;

    var NavigationFragments = {
        navigation: i1.gql(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n\t\tfragment NavigationFragment on Navigation {\n\t\t\tid \n\t\t\tname\n\t\t\tdescription\n\t\t\tdata {\n\t\t\t\tlabel\n\t\t\t\tlink\n\t\t\t\ttimeWork\n\t\t\t\tphone\n\t\t\t\ticon\n\t\t\t\tactive\n\t\t\t\tcontroller\n\t\t\t\tslug\n\t\t\t\twarning\n\t\t\t\tchild {\n\t\t\t\t\ttags\n\t\t\t\t\tslug\n\t\t\t\t\tvisible\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"], ["\n\t\tfragment NavigationFragment on Navigation {\n\t\t\tid \n\t\t\tname\n\t\t\tdescription\n\t\t\tdata {\n\t\t\t\tlabel\n\t\t\t\tlink\n\t\t\t\ttimeWork\n\t\t\t\tphone\n\t\t\t\ticon\n\t\t\t\tactive\n\t\t\t\tcontroller\n\t\t\t\tslug\n\t\t\t\twarning\n\t\t\t\tchild {\n\t\t\t\t\ttags\n\t\t\t\t\tslug\n\t\t\t\t\tvisible\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"])))
    };
    var ɵ0$4 = function () { return i1.gql(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n\t\t\tquery GetNavigation {\n\t\t\t\tnavigation {\n\t\t\t\t\t...NavigationFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t"], ["\n\t\t\tquery GetNavigation {\n\t\t\t\tnavigation {\n\t\t\t\t\t...NavigationFragment\n\t\t\t\t}\n\t\t\t}\n\t\t\t", "\n\t\t"])), NavigationFragments.navigation); };
    var NavigationGql = {
        queries: {
            getNavigationes: ɵ0$4
        }
    };
    var templateObject_1$8, templateObject_2$4;

    var NgGqlService = /** @class */ (function () {
        function NgGqlService(apollo) {
            this.apollo = apollo;
            this.menu$ = new rxjs.BehaviorSubject(null);
            this.dishes$ = new rxjs.BehaviorSubject(null);
            this.cart$ = new rxjs.BehaviorSubject(null);
            this.navigationData$ = new rxjs.BehaviorSubject(null);
            this.customQueryiesDataByName = {};
            this.customQueriesDataLoadingByName = {};
            this.cart$.subscribe(function (res) { return console.log('control cart res', res); });
        }
        NgGqlService.prototype.getNavigation$ = function () {
            var _this = this;
            if (!this.navigationData$.getValue() && !this.navigationDataLoading) {
                this.apollo.watchQuery({
                    query: NavigationGql.queries.getNavigationes()
                })
                    .valueChanges
                    .pipe(operators.tap(function (_c) {
                    var e_1, _d;
                    var data = _c.data, loading = _c.loading;
                    _this.menuLoading = loading;
                    var navigationData = {};
                    try {
                        for (var _e = __values(data.navigation), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var navigation = _f.value;
                            navigationData[navigation.name] = navigation;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    _this.navigationData$.next(navigationData);
                }))
                    .subscribe();
            }
            return this.navigationData$;
        };
        NgGqlService.prototype.getMenu$ = function (slug) {
            var _this = this;
            if (slug === void 0) { slug = null; }
            if (!this.menuLoading) {
                this.apollo.watchQuery({
                    query: GroupGql.queries.getGroupsAndDishes()
                })
                    .valueChanges
                    .pipe(operators.tap(function (_c) {
                    var e_2, _d, e_3, _e;
                    var data = _c.data, loading = _c.loading;
                    var _a, _b;
                    _this.menuLoading = loading;
                    var groups = data.groups, dishes = data.dishes;
                    var groupsById = {};
                    var groupIdsBySlug = {};
                    try {
                        // Groups indexing
                        for (var groups_1 = __values(groups), groups_1_1 = groups_1.next(); !groups_1_1.done; groups_1_1 = groups_1.next()) {
                            var group = groups_1_1.value;
                            groupsById[group.id] = Object.assign(Object.assign({}, group), { dishes: [], childGroups: [] });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (groups_1_1 && !groups_1_1.done && (_d = groups_1.return)) _d.call(groups_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    try {
                        // Inserting dishes by groups
                        for (var dishes_1 = __values(dishes), dishes_1_1 = dishes_1.next(); !dishes_1_1.done; dishes_1_1 = dishes_1.next()) {
                            var dish = dishes_1_1.value;
                            //const { groupId } = dish;
                            var groupId = (_a = dish.parentGroup) === null || _a === void 0 ? void 0 : _a.id;
                            if (!groupId)
                                continue;
                            if (!groupsById[groupId])
                                continue;
                            groupsById[groupId].dishes.push(dish);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (dishes_1_1 && !dishes_1_1.done && (_e = dishes_1.return)) _e.call(dishes_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    // Create groups hierarchy
                    for (var groupId in groupsById) {
                        var group = groupsById[groupId];
                        var parentGroupId = (_b = group.parentGroup) === null || _b === void 0 ? void 0 : _b.id;
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
                                    _this.menu$.next([]);
                                    return;
                                }
                                _this.menu$.next(groupsById[groupIdsBySlug[slug]].childGroups.sort(function (g1, g2) { return g1.order - g2.order; }));
                                break;
                            case 'object':
                                if (!slug.length) {
                                    _this.menu$.next([]);
                                    return;
                                }
                                _this.menu$.next(slug.map(function (s) { return groupsById[groupIdsBySlug[s]]; }));
                                break;
                        }
                        return;
                    }
                    var groupsAndDishes = Object.values(groupsById).sort(function (g1, g2) { return g1.order - g2.order; });
                    _this.menu$.next(groupsAndDishes);
                }))
                    .subscribe();
            }
            return this.menu$;
        };
        NgGqlService.prototype.getDishes$ = function () {
            var _this = this;
            if (!this.dishes$.getValue() && !this.dishesLoading) {
                this.apollo.watchQuery({
                    query: DishGql.queries.getDishes()
                })
                    .valueChanges
                    .pipe(operators.tap(function (_c) {
                    var data = _c.data, loading = _c.loading;
                    _this.dishesLoading = loading;
                    _this.dishes$.next(data.dishes);
                }))
                    .subscribe();
            }
            return this.dishes$;
        };
        NgGqlService.prototype.getOrder$ = function (orderId) {
            if (orderId === void 0) { orderId = null; }
            return this.apollo.watchQuery({
                query: CartGql.queries.getOrder(orderId)
            })
                .valueChanges
                .pipe(operators.take(1), operators.map(function (_c) {
                var data = _c.data;
                return data.getOrder;
            }));
        };
        NgGqlService.prototype.getCart$ = function (cartId) {
            var _this = this;
            if (cartId === void 0) { cartId = null; }
            var lastCart = this.cart$.getValue();
            if (!(lastCart && lastCart.id == cartId) && !this.cartLoading) {
                this.apollo.watchQuery({
                    query: CartGql.queries.getCart(cartId),
                    fetchPolicy: 'no-cache'
                })
                    .valueChanges
                    .pipe(operators.take(1), operators.tap(function (_c) {
                    var data = _c.data, loading = _c.loading;
                    _this.cartLoading = loading;
                    _this.cart$.next(data.cart);
                }))
                    .subscribe();
            }
            return this.cart$;
        };
        NgGqlService.prototype.getPhone$ = function (phone) {
            var _this = this;
            return this.apollo.watchQuery({
                query: CartGql.queries.getPhone(phone),
                fetchPolicy: 'no-cache'
            })
                .valueChanges
                .pipe(operators.map(function (_c) {
                var data = _c.data, loading = _c.loading;
                _this.getPhoneLoading = loading;
                return data.phone;
            }));
        };
        NgGqlService.prototype.checkPhone$ = function (phone) {
            var _this = this;
            return this.apollo.watchQuery({
                query: CartGql.queries.checkPhone(phone),
                fetchPolicy: 'no-cache'
            })
                .valueChanges
                .pipe(operators.map(function (_c) {
                var data = _c.data, loading = _c.loading;
                _this.checkPhoneLoading = loading;
                return data.checkPhone;
            }));
        };
        NgGqlService.prototype.getPaymentMethods$ = function (cartId) {
            var _this = this;
            return this.apollo.watchQuery({
                query: PaymentMethodGql.queries.getPaymentMethod(cartId)
            })
                .valueChanges
                .pipe(operators.map(function (_c) {
                var data = _c.data, loading = _c.loading;
                _this.paymentMethodLoading = loading;
                return data.paymentMethods;
            }));
        };
        NgGqlService.prototype.addDishToCart$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.addDishToCart(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var cart = data['cartAddDish'];
                _this.cart$.next(cart);
                return cart;
            }));
        };
        NgGqlService.prototype.orderCart$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.orderCart(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var checkResponse = data['orderCart'];
                _this.cart$.next(checkResponse.cart);
                return checkResponse;
            }));
        };
        NgGqlService.prototype.checkCart$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.checkCart(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var checkResponse = data['checkCart'];
                _this.cart$.next(checkResponse.cart);
                return checkResponse;
            }));
        };
        NgGqlService.prototype.checkPhoneCode$ = function (data) {
            return this.apollo.mutate({
                mutation: CartGql.mutations.checkPhoneCode(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var checkPhoneResponse = data['setPhoneCode'];
                return checkPhoneResponse;
            }));
        };
        NgGqlService.prototype.removeDishFromCart$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.removeDishFromCart(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var cart = data['cartRemoveDish'];
                _this.cart$.next(cart);
                return cart;
            }));
        };
        NgGqlService.prototype.setDishAmount$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.setDishAmount(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var cart = data['cartSetDishAmount'];
                _this.cart$.next(cart);
                return cart;
            }));
        };
        NgGqlService.prototype.setDishComment$ = function (data) {
            var _this = this;
            return this.apollo.mutate({
                mutation: CartGql.mutations.setDishComment(),
                variables: data
            })
                .pipe(operators.map(function (_c) {
                var data = _c.data;
                var cart = data['cartSetDishComment'];
                _this.cart$.next(cart);
                return cart;
            }));
        };
        NgGqlService.prototype.customQuery$ = function (name, queryObject, variables) {
            var _this = this;
            if (variables === void 0) { variables = {}; }
            var queryArgumentsStrings = [];
            for (var key in variables) {
                var valueString = variables[key];
                switch (typeof valueString) {
                    case 'object':
                        valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:');
                        break;
                    case 'string':
                        valueString = "\"" + valueString + "\"";
                        break;
                }
                queryArgumentsStrings.push(key + ": " + valueString);
            }
            var queryArgumentsString = queryArgumentsStrings.length
                ? "(" + queryArgumentsStrings.join(', ') + ")"
                : "";
            var queryKey = (name + queryArgumentsString).replace(/[^a-z0-9]/gi, '');
            var query = JSON.stringify(queryObject)
                .replace(/"/g, '')
                .replace(/\:[a-z0-9]+/gi, '')
                .replace(/\:/g, '');
            if (queryArgumentsString) {
                var queriesKeys = Object.keys(queryObject);
                var countOfQueries = queriesKeys.length;
                if (countOfQueries == 1) {
                    query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + queryArgumentsString);
                }
            }
            if (!this.customQueryiesDataByName[queryKey]) {
                this.customQueryiesDataByName[queryKey] = new rxjs.BehaviorSubject(null);
                this.customQueriesDataLoadingByName[queryKey] = false;
            }
            if (!this.customQueryiesDataByName[queryKey].getValue() && !this.customQueriesDataLoadingByName[queryKey]) {
                this.apollo.watchQuery({
                    query: i1.gql(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["query ", "", ""], ["query ", "", ""])), name, query),
                    fetchPolicy: 'no-cache'
                })
                    .valueChanges
                    .pipe(operators.tap(function (_c) {
                    var data = _c.data, loading = _c.loading;
                    _this.customQueriesDataLoadingByName[queryKey] = loading;
                    _this.customQueryiesDataByName[queryKey].next(data);
                }), operators.catchError(function (error) {
                    _this.customQueryiesDataByName[queryKey].next({
                        error: error
                    });
                    return rxjs.of(null);
                }))
                    .subscribe();
            }
            return this.customQueryiesDataByName[queryKey].pipe(operators.switchMap(function (data) {
                if (data && data.error) {
                    return rxjs.throwError(data.error);
                }
                return rxjs.of(data);
            }), operators.filter(function (data) { return !!data; }));
        };
        NgGqlService.prototype.customMutation$ = function (name, queryObject, variables) {
            if (variables === void 0) { variables = {}; }
            var mutationArgumentsStrings = [];
            for (var key in variables) {
                var valueString = variables[key];
                switch (typeof valueString) {
                    case 'object':
                        valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:');
                        break;
                    case 'string':
                        valueString = "\"" + valueString + "\"";
                        break;
                }
                mutationArgumentsStrings.push(key + ": " + valueString);
            }
            var mutationArgumentsString = mutationArgumentsStrings.length
                ? "(" + mutationArgumentsStrings.join(', ') + ")"
                : "";
            var query = JSON.stringify(queryObject)
                .replace(/"/g, '')
                .replace(/\:[a-z0-9]+/gi, '')
                .replace(/\:/g, '');
            if (mutationArgumentsString) {
                var queriesKeys = Object.keys(queryObject);
                var countOfQueries = queriesKeys.length;
                if (countOfQueries == 1) {
                    query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + mutationArgumentsString);
                }
            }
            return this.apollo.mutate({
                mutation: i1.gql(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["mutation ", "", ""], ["mutation ", "", ""])), name, query)
            });
        };
        return NgGqlService;
    }());
    NgGqlService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgGqlService_Factory() { return new NgGqlService(i0.ɵɵinject(i1.Apollo)); }, token: NgGqlService, providedIn: "root" });
    NgGqlService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgGqlService.ctorParameters = function () { return [
        { type: i1.Apollo }
    ]; };
    var templateObject_1$9, templateObject_2$5;

    var EventerService = /** @class */ (function () {
        function EventerService() {
            this.eventMessage = new i0.EventEmitter();
            this.eventAction = new i0.EventEmitter();
        }
        EventerService.prototype.emitMessageEvent = function (message) {
            this.eventMessage.emit(message);
        };
        EventerService.prototype.emitActionEvent = function (action) {
            this.eventAction.emit(action);
        };
        EventerService.prototype.getMessageEmitter = function () {
            return this.eventMessage;
        };
        EventerService.prototype.getActionEmitter = function () {
            return this.eventAction;
        };
        return EventerService;
    }());
    EventerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function EventerService_Factory() { return new EventerService(); }, token: EventerService, providedIn: "root" });
    EventerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    EventerService.ctorParameters = function () { return []; };

    var LS_NAME = 'cartId';
    var NgCartService = /** @class */ (function () {
        function NgCartService(ngGqlService, eventer) {
            var _this = this;
            this.ngGqlService = ngGqlService;
            this.eventer = eventer;
            this.OrderFormChange = new rxjs.BehaviorSubject(null);
            this.cart = new rxjs.BehaviorSubject({});
            this.initialStorage();
            this.modifiers$ = new rxjs.BehaviorSubject([]);
            this.modifiersMessage$ = new rxjs.BehaviorSubject([]);
            this.modifiersMessage$.subscribe(function (messages) { return _this.messages = messages; });
        }
        NgCartService.prototype.getCartId = function () {
            return localStorage.getItem(LS_NAME);
        };
        NgCartService.prototype.setCartId = function (cartId) {
            if (!cartId)
                return null;
            localStorage.setItem(LS_NAME, cartId);
        };
        NgCartService.prototype.removeCartId = function () {
            localStorage.removeItem(LS_NAME);
        };
        NgCartService.prototype.userCart$ = function () {
            return this.cart.pipe(operators.filter(function (cart) { return !!cart; }));
        };
        NgCartService.prototype.setModifiers = function (modifiers, messages) {
            this.modifiers$.next(modifiers);
            if (messages)
                this.modifiersMessage$.next(messages);
        };
        NgCartService.prototype.getModifiers = function () {
            return this.modifiers$;
        };
        NgCartService.prototype.initialStorage = function () {
            var _this = this;
            var _a;
            this.cartId = this.getCartId();
            (_a = this.cartSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.cartSubscription = this.ngGqlService
                .getCart$(this.cartId)
                .pipe(operators.tap(function (cart) {
                console.log('cart tap', cart);
                if ((cart === null || cart === void 0 ? void 0 : cart.state) == 'ORDER') {
                    rxjs.throwError(new Error('Cart in order state'));
                }
                _this.setCartId(cart === null || cart === void 0 ? void 0 : cart.id);
            }))
                .subscribe(function (cart) { return _this.cart.next(cart); }, function (error) { return _this.removeCartId(); });
        };
        NgCartService.prototype.addDishToCart$ = function (data) {
            var _this = this;
            if (this.messages.length) {
                this.messages.forEach(function (message) {
                    _this.eventer.emitMessageEvent(message);
                });
            }
            return this.ngGqlService.addDishToCart$(data);
        };
        NgCartService.prototype.removeDishFromCart$ = function (dishId, amount) {
            return this.ngGqlService.removeDishFromCart$({
                cartDishId: dishId,
                cartId: this.cartId,
                amount: amount
            });
        };
        NgCartService.prototype.orderCart$ = function (data) {
            return this.ngGqlService.orderCart$(data);
        };
        NgCartService.prototype.checkCart$ = function (data) {
            console.log('Check cart$', data);
            return this.ngGqlService.checkCart$(data);
        };
        NgCartService.prototype.setDishCountToCart$ = function (dishId, amount) {
            return this.ngGqlService.setDishAmount$({
                cartDishId: dishId,
                cartId: this.cartId,
                amount: amount
            });
        };
        NgCartService.prototype.setDishComment$ = function (dishId, comment) {
            return this.ngGqlService.setDishComment$({
                cartDishId: dishId,
                cartId: this.cartId,
                comment: comment
            });
        };
        return NgCartService;
    }());
    NgCartService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgCartService_Factory() { return new NgCartService(i0.ɵɵinject(NgGqlService), i0.ɵɵinject(EventerService)); }, token: NgCartService, providedIn: "root" });
    NgCartService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgCartService.ctorParameters = function () { return [
        { type: NgGqlService },
        { type: EventerService }
    ]; };

    var AddDishToCartDirective = /** @class */ (function () {
        function AddDishToCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.loading = new i0.EventEmitter();
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.cartService
                .userCart$()
                .subscribe(function (res) { return _this.cart = res; });
            this.cartService
                .getModifiers()
                .subscribe(function (res) { return _this.modifiers = res; });
        }
        AddDishToCartDirective.prototype.onClick = function () {
            this.addDishToCart(this.dish.id, this.amountDish);
        };
        AddDishToCartDirective.prototype.addDishToCart = function (dishID, amount) {
            var _this = this;
            var data = {
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
                .subscribe(function (_) { return _this.success.emit(true); }, function (e) { return _this.error.emit(e); }, function () {
                _this.loading.emit(false);
            });
        };
        return AddDishToCartDirective;
    }());
    AddDishToCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[addToCart]'
                },] }
    ];
    AddDishToCartDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    AddDishToCartDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        amountDish: [{ type: i0.Input }],
        comment: [{ type: i0.Input }],
        replaceCartDishId: [{ type: i0.Input }],
        loading: [{ type: i0.Output }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var AmountCartDirective = /** @class */ (function () {
        function AmountCartDirective(cartService, renderer, el) {
            var _this = this;
            this.cartService = cartService;
            this.renderer = renderer;
            this.el = el;
            this.amount = '0';
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
            this.cartService
                .userCart$()
                .subscribe(function (res) {
                _this.cart = res;
                _this.amount = res.dishesCount || 0;
                _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
            });
        }
        return AmountCartDirective;
    }());
    AmountCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[amountCart]'
                },] }
    ];
    AmountCartDirective.ctorParameters = function () { return [
        { type: NgCartService },
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };

    var DeleteFromCartDirective = /** @class */ (function () {
        function DeleteFromCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart$()
                .subscribe(function (res) { return _this.cart = res; });
        }
        DeleteFromCartDirective.prototype.onClick = function () {
            this.cartService.removeDishFromCart$(this.dish.id, this.amountDish).subscribe();
        };
        return DeleteFromCartDirective;
    }());
    DeleteFromCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[deleteFromCart]'
                },] }
    ];
    DeleteFromCartDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    DeleteFromCartDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        amountDish: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var OrderCartUserDirective = /** @class */ (function () {
        function OrderCartUserDirective(cartService) {
            this.cartService = cartService;
            this.requiredFields = ["name", "phone", "street", "house"];
            this.checkerFields = new rxjs.BehaviorSubject(undefined);
        }
        OrderCartUserDirective.prototype.onClick = function () {
            this.order(this.orderCart.value);
            console.log(this.orderCart.value);
        };
        OrderCartUserDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.cartService
                    .userCart$()
                    .subscribe(function (cart) {
                    if (_this.cart && _this.orderCart.valid && _this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                        _this.checkStreet(_this.orderCart.value);
                    }
                    _this.cart = cart;
                });
            }, 100);
            setTimeout(function () {
                _this.checkerFields.next(_this.checkForFields(_this.orderCart._directives, _this.requiredFields));
            }, 100);
            this.checkerFields.subscribe(function (state) {
                if (state) {
                    _this.orderCart.controls['street'].valueChanges.subscribe(function (val) {
                        if (typeof val === 'object') {
                            setTimeout(function () {
                                if (_this.orderCart.controls['house'].valid) {
                                    _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                    _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                    _this.checkStreet(_this.orderCart.value);
                                }
                            }, 100);
                        }
                    });
                    _this.orderCart.controls['house'].valueChanges.subscribe(function (val) {
                        setTimeout(function () {
                            if (_this.orderCart.controls['street'].valid) {
                                _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                _this.checkStreet(_this.orderCart.value);
                            }
                        }, 100);
                    });
                }
            });
        };
        OrderCartUserDirective.prototype.checkForFields = function (formDirectives, requiredFields) {
            var fieldsAreAvailable = {};
            var noFields = [];
            formDirectives.forEach(function (element) {
                fieldsAreAvailable[element.name] = true;
            });
            requiredFields.forEach(function (element) {
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
        };
        OrderCartUserDirective.prototype.order = function (dataToSend) {
            if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
                var payment = void 0;
                var comment = dataToSend.comment || "Не указан";
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
                var data = {
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
        };
        OrderCartUserDirective.prototype.checkStreet = function (dataToSend) {
            console.log(">>>>", dataToSend);
            if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
                var data = {
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
        };
        OrderCartUserDirective.prototype.stringToNumber = function (str) {
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
        };
        return OrderCartUserDirective;
    }());
    OrderCartUserDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[orderCart]'
                },] }
    ];
    OrderCartUserDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    OrderCartUserDirective.propDecorators = {
        orderCart: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var SetAmountDirective = /** @class */ (function () {
        function SetAmountDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart$()
                .subscribe(function (res) { return _this.cart = res; });
        }
        SetAmountDirective.prototype.onClick = function () {
            this.changeAmount(this.action);
        };
        SetAmountDirective.prototype.changeAmount = function (action) {
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
        };
        return SetAmountDirective;
    }());
    SetAmountDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[setDishAmount]'
                },] }
    ];
    SetAmountDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    SetAmountDirective.propDecorators = {
        action: [{ type: i0.Input }],
        dish: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var DishCalcDirective = /** @class */ (function () {
        function DishCalcDirective(renderer, el, cartService) {
            this.renderer = renderer;
            this.el = el;
            this.cartService = cartService;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
            this.amountModifiers = {};
            this.stateModifiers = {};
        }
        DishCalcDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.renderer.addClass(this.el.nativeElement, "dish-calculator");
            this.amountDish = this.amount;
            this.amountDishToAdd.emit(this.amountDish);
            this.price = this.renderer.createElement("div");
            this.renderer.addClass(this.price, "dish-price");
            setTimeout(function () {
                _this.renderDish(_this.dish);
                _this.render(_this.dish.modifiers);
            }, 100);
        };
        DishCalcDirective.prototype.renderDish = function (dish) {
            var _this = this;
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
            var mainItem = this.renderer.createElement("div");
            this.renderer.addClass(mainItem, "dish-wraper");
            this.renderer.appendChild(this.el.nativeElement, mainItem);
            var itemName = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "name");
            this.renderer.appendChild(mainItem, itemName);
            var title = this.renderer.createElement("div");
            this.renderer.addClass(title, "title");
            this.renderer.setProperty(title, "innerHTML", this.dish.name);
            this.renderer.appendChild(itemName, title);
            var weightDishWrapper = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "weight");
            this.renderer.addClass(itemName, "dish");
            this.renderer.appendChild(mainItem, weightDishWrapper);
            var weightDishValue = this.renderer.createElement("div");
            this.renderer.addClass(weightDishValue, "value");
            this.renderer.setProperty(weightDishValue, "innerHTML", (this.dish.weight * 1000).toFixed(0) + " г.");
            if (this.dish.weight === 0 || !this.dish.weight) {
                this.renderer.addClass(weightDishValue, "zero");
            }
            this.renderer.appendChild(weightDishWrapper, weightDishValue);
            this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
            var priceDishWrapper = this.renderer.createElement("div");
            this.renderer.addClass(priceDishWrapper, "price");
            this.renderer.addClass(priceDishWrapper, "total");
            this.renderer.appendChild(priceDishWrapper, this.price);
            this.renderer.appendChild(mainItem, priceDishWrapper);
            var itemQuant = this.renderer.createElement("div");
            this.renderer.addClass(itemQuant, "quantity");
            this.renderer.appendChild(mainItem, itemQuant);
            var addButton = this.renderer.createElement("a");
            this.renderer.addClass(addButton, "quantity__button");
            this.renderer.addClass(addButton, "minus");
            this.renderer.setProperty(addButton, "innerHTML", "&#8722;");
            this.renderer.listen(addButton, "click", function (e) {
                _this.changeAmountdish(-1);
                _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
                _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
                _this.innerTotalWeight(weightTotal);
            });
            this.renderer.appendChild(itemQuant, addButton);
            var counter = this.renderer.createElement("span");
            this.renderer.addClass(counter, "quantity__counter");
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.appendChild(itemQuant, counter);
            var minusButton = this.renderer.createElement("a");
            this.renderer.addClass(minusButton, "quantity__button");
            this.renderer.addClass(addButton, "plus");
            this.renderer.setProperty(minusButton, "innerHTML", "&#x2b;");
            this.renderer.listen(minusButton, "click", function (e) {
                _this.changeAmountdish(1);
                _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
                _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
                _this.innerTotalWeight(weightTotal);
            });
            this.renderer.appendChild(itemQuant, minusButton);
            var weightTotalWrapper = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "weight");
            this.renderer.addClass(itemName, "total");
            this.renderer.appendChild(mainItem, weightTotalWrapper);
            var weightTotal = this.renderer.createElement("div");
            if (this.dish.weight === 0 || !this.dish.weight) {
                this.renderer.addClass(weightTotal, "zero");
            }
            this.renderer.addClass(weightTotal, "value");
            this.innerTotalWeight(weightTotal); // TODO: total Weight
            this.renderer.appendChild(weightTotalWrapper, weightTotal);
            this.weightTotal = weightTotal;
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(dish.price)); // TODO: правильно считать цену
            var priceTotalWrapper = this.renderer.createElement("div");
            this.renderer.addClass(priceTotalWrapper, "price");
            this.renderer.addClass(priceTotalWrapper, "total");
            this.renderer.appendChild(priceTotalWrapper, this.price);
            this.renderer.appendChild(mainItem, priceTotalWrapper);
        };
        DishCalcDirective.prototype.generatePrice = function (priceDish, amount, modifiersPrice) {
            var _this = this;
            var selected = [];
            if (this.selectedModifiers)
                this.selectedModifiers.forEach(function (element) {
                    _this.dish.modifiers.forEach(function (groups) {
                        var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                        if (mod.length > 0) {
                            mod[0].groupId = groups.group.id;
                            selected.push(mod[0]);
                        }
                    });
                });
            var modSum = 0;
            selected.forEach(function (element) {
                modSum = modSum + element.dish.price * _this.amountModifiers[element.groupId][element.modifierId];
            });
            modSum = modSum * this.amountDish;
            return (priceDish * this.amountDish + modSum + '<div class="currency">&nbsp;&#x20bd;</div>');
        };
        DishCalcDirective.prototype.generateTotalWeight = function () {
            var _this = this;
            var selected = [];
            if (this.selectedModifiers)
                this.selectedModifiers.forEach(function (element) {
                    _this.dish.modifiers.forEach(function (groups) {
                        var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                        if (mod.length > 0) {
                            mod[0].groupId = groups.group.id;
                            selected.push(mod[0]);
                        }
                    });
                });
            var modSum = 0;
            selected.forEach(function (element) {
                modSum = modSum + element.dish.weight * _this.amountModifiers[element.groupId][element.modifierId] * 1000;
            });
            modSum = parseFloat((modSum * this.amountDish).toFixed(2));
            console.log(modSum, this.dish.weight * 1000 * this.amountDish);
            console.log(this.dish.weight, this.amountDish);
            var weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
            return (weight).toFixed(0) + " г. <div class='separator'></div>";
        };
        DishCalcDirective.prototype.innerTotalWeight = function (totalWeigthDiv) {
            this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
        };
        DishCalcDirective.prototype.changeAmountdish = function (value) {
            this.amountDish = this.amountDish + value;
            if (this.amountDish <= 0) {
                this.amountDish = 1;
            }
            if (this.amountDish >= 199) {
                this.amountDish = 199;
            }
            this.amountDishToAdd.emit(this.amountDish);
        };
        DishCalcDirective.prototype.render = function (modifiers) {
            var _this = this;
            this.setModifiers();
            if (modifiers.length > 0) {
                var h = this.renderer.createElement("h5");
                this.renderer.setProperty(h, "innerHTML", "К этому блюду можно добавить:");
                // this.renderer.appendChild(this.el.nativeElement, h);
            }
            modifiers.forEach(function (elementGroup) {
                _this.stateModifiers[elementGroup.modifierId] = {};
                _this.amountModifiers[elementGroup.modifierId] = {};
                if (elementGroup.dish) {
                    var groupDiv = _this.groupDiv("Одночные модификаторы не поддерживаются");
                    _this.renderer.appendChild(_this.el.nativeElement, groupDiv);
                    console.log("elementGroup", elementGroup);
                    //TODO: add single modificator logic
                }
                else if (elementGroup.childModifiers) {
                    var groupDiv_1 = _this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                    _this.renderer.appendChild(_this.el.nativeElement, groupDiv_1);
                    var modArr = elementGroup.childModifiers;
                    modArr.forEach(function (element) {
                        var modifireDiv = _this.modifireDiv(element, elementGroup.modifierId);
                        _this.renderer.appendChild(groupDiv_1, modifireDiv);
                        if (element.defaultAmount < 1) {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                        }
                        else {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                        }
                    });
                }
            });
            if (modifiers.length > 0) {
                var h = this.renderer.createElement("div");
                this.renderer.setProperty(h, "innerHTML", "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>");
                this.renderer.appendChild(this.el.nativeElement, h);
            }
        };
        DishCalcDirective.prototype.groupDiv = function (nameGorup) {
            var div = this.renderer.createElement("div");
            this.renderer.addClass(div, "group-modifiers-wraper");
            this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
            return div;
        };
        DishCalcDirective.prototype.modifireDiv = function (element, groupId) {
            var div = this.renderer.createElement("div");
            this.renderer.addClass(div, "additional-item");
            this.renderOneModifire(element, div, groupId);
            return div;
        };
        DishCalcDirective.prototype.renderOneModifire = function (element, modifireDiv, groupId) {
            console.info('renderOneModifire', element);
            console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
            // Рендер Названия модификатора
            var itemNameDiv = this.renderer.createElement("div");
            this.renderer.addClass(itemNameDiv, "item-name");
            var label = this.renderer.createElement("label");
            this.renderer.setAttribute(label, "for", element.modifierId);
            this.renderer.appendChild(itemNameDiv, label);
            this.renderer.setProperty(label, "innerHTML", element.dish.name);
            this.renderer.appendChild(modifireDiv, itemNameDiv);
            var weigthModifireWraper = this.renderer.createElement('div');
            this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
            var weightModifireLeft = this.renderer.createElement('div');
            this.renderer.addClass(weightModifireLeft, 'weight');
            if (element.dish.weight === 0 || element.dish.weight < 0) {
                this.renderer.addClass(weightModifireLeft, 'zero');
            }
            this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');
            this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
            this.renderer.appendChild(modifireDiv, weigthModifireWraper);
            // Рендер блока изминения количества модификатора
            var itemQuantity = this.renderer.createElement("div");
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
            var min = element.minAmount;
            var max = element.maxAmount;
            var def = element.defaultAmount;
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
            var rightweigthModifireWraper = this.renderer.createElement('div');
            this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
            var weightModifireRight = this.renderer.createElement('div');
            this.renderer.addClass(weightModifireRight, 'weight');
            if (element.dish.weight === 0 || element.dish.weight < 0) {
                this.renderer.addClass(weightModifireRight, 'zero');
            }
            this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');
            this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
            this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);
            var price = this.renderer.createElement("div");
            this.renderer.addClass(price, "item-price");
            var priceValue;
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
        };
        DishCalcDirective.prototype.renderCheckbox = function (element, isActive, itemQuantity, modifireDiv, groupId) {
            var _this = this;
            var input = this.renderer.createElement("input");
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
            this.renderer.listen(input, "change", function (e) {
                if (_this.idRadioBox(groupId)) {
                    for (var key in _this.stateModifiers[groupId]) {
                        if (_this.stateModifiers[groupId].hasOwnProperty(key)) {
                            _this.stateModifiers[groupId][key] = false;
                            // this.renderer.setProperty(input, 'checked',   true);
                        }
                    }
                    var groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                    groupDivBlock.forEach(function (element) {
                        if (element.id != e.target.id)
                            element.checked = false;
                    });
                }
                _this.stateModifiers[groupId][e.target.id] = e.target.checked;
                if (e.target.checked) {
                    _this.amountModifiers[groupId][e.target.id] = 1;
                }
                _this.setModifiers();
                _this.innerTotalWeight(_this.weightTotal);
                _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
            });
            this.renderer.appendChild(modifireDiv, itemQuantity);
        };
        DishCalcDirective.prototype.renderInputButton = function (element, groupId, itemQuantity, modifireDiv) {
            var _this = this;
            var startAmount;
            if (element.defaultAmount > 0) {
                startAmount = element.defaultAmount;
            }
            else {
                startAmount = element.minAmount;
            }
            if (startAmount > 0) {
                this.stateModifiers[groupId][element.modifierId] = true;
            }
            var aMinusDiv = this.renderer.createElement("a");
            this.renderer.addClass(aMinusDiv, "quantity__button");
            this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
            this.renderer.appendChild(itemQuantity, aMinusDiv);
            this.renderer.listen(aMinusDiv, "click", function (e) {
                var value = +_this.amountModifiers[groupId][element.modifierId];
                _this.amountModifiers[groupId][element.modifierId] = value - 1;
                if (_this.amountModifiers[groupId][element.modifierId] < element.minAmount)
                    _this.amountModifiers[groupId][element.modifierId] = element.minAmount;
                _this.renderer.setProperty(span, "innerHTML", _this.amountModifiers[groupId][element.modifierId]);
                if (_this.amountModifiers[groupId][element.modifierId] === 0) {
                    _this.stateModifiers[groupId][element.modifierId] = false;
                }
                _this.setModifiers();
                _this.innerTotalWeight(_this.weightTotal);
                _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
            });
            var span = this.renderer.createElement("span");
            this.renderer.addClass(span, "item-quantity__counter");
            this.amountModifiers[groupId][element.modifierId] = startAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifiers[groupId][element.modifierId]);
            this.renderer.appendChild(itemQuantity, span);
            var aPlusDiv = this.renderer.createElement("a");
            this.renderer.addClass(aPlusDiv, "quantity__button");
            this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
            this.renderer.appendChild(itemQuantity, aPlusDiv);
            this.renderer.appendChild(modifireDiv, itemQuantity);
            this.renderer.listen(aPlusDiv, "click", function (e) {
                var value = +_this.amountModifiers[groupId][element.modifierId];
                _this.amountModifiers[groupId][element.modifierId] = value + 1;
                if (_this.amountModifiers[groupId][element.modifierId] >
                    element.maxAmount &&
                    element.maxAmount != 0)
                    _this.amountModifiers[groupId][element.modifierId] = element.maxAmount;
                _this.renderer.setProperty(span, "innerHTML", _this.amountModifiers[groupId][element.modifierId]);
                if (_this.amountModifiers[groupId][element.modifierId] > 0) {
                    _this.stateModifiers[groupId][element.modifierId] = true;
                }
                _this.setModifiers();
                _this.innerTotalWeight(_this.weightTotal);
                _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
            });
        };
        DishCalcDirective.prototype.setModifiers = function () {
            var _this = this;
            var modifiersToSelect = [];
            /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
              modifiersToSelect = this.selectedModifiers;
            }*/
            var modifiers = [];
            console.info('setModifiers modifiersToSelect', modifiersToSelect);
            console.info('setModifiers stateModifiers before', this.stateModifiers);
            console.info('setModifiers selectedModifiers before', this.selectedModifiers);
            for (var groupId in this.stateModifiers) {
                var _loop_1 = function (modifireId) {
                    if (this_1.stateModifiers[groupId][modifireId] || modifiersToSelect.find(function (item) { return item.modifierId == modifireId; })) {
                        modifiers.push({
                            id: modifireId,
                            amount: this_1.amountModifiers[groupId][modifireId],
                            groupId: groupId
                        });
                    }
                };
                var this_1 = this;
                for (var modifireId in this.stateModifiers[groupId]) {
                    _loop_1(modifireId);
                }
            }
            this.selectedModifiers = modifiers;
            if (this.dish.modifiers.length > 0) {
                var message_1 = [];
                this.dish.modifiers.forEach(function (group) {
                    if (group.required) {
                        if (_this.stateModifiers[group.modifierId]) {
                            var selectedModif = [];
                            var localModif = _this.stateModifiers[group.modifierId]; //.filter(element=>element);
                            for (var mod in localModif) {
                                if (localModif.hasOwnProperty(mod)) {
                                    if (localModif[mod]) {
                                        selectedModif.push(localModif[mod]);
                                    }
                                }
                            }
                            if (selectedModif.length < group.minAmount) {
                                message_1.push({
                                    type: "warning",
                                    title: "Внимание",
                                    body: " Обязательно выберите модификаторы из категории: " +
                                        group.group.name
                                });
                                _this.validate.emit(false);
                                _this.cartService.setModifiers(modifiers, message_1);
                            }
                            else {
                                _this.validate.emit(true);
                                _this.cartService.setModifiers(modifiers, []);
                            }
                        }
                        else {
                            message_1.push({
                                type: "warning",
                                title: "Внимание",
                                body: " Обязательно выберите модификаторы из категории: " +
                                    group.group.name
                            });
                            _this.validate.emit(false);
                            _this.cartService.setModifiers(modifiers, message_1);
                        }
                    }
                    else {
                        _this.validate.emit(true);
                        _this.cartService.setModifiers(modifiers);
                    }
                });
            }
            else {
                this.validate.emit(true);
                this.cartService.setModifiers(modifiers, []);
            }
            console.info('setModifiers stateModifiers after', this.stateModifiers);
            console.info('setModifiers selectedModifiers after', this.selectedModifiers);
        };
        /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
         если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
        DishCalcDirective.prototype.idRadioBox = function (groupId) {
            var currentGroup = this.dish.modifiers.find(function (x) { return x.modifierId === groupId; });
            return currentGroup.minAmount === 1 && currentGroup.maxAmount === 1;
        };
        // Проверяет минимальное количество модификаторовкоторые были выбраны
        DishCalcDirective.prototype.checkMinAmountModifiers = function (groupId, modifire) {
        };
        DishCalcDirective.prototype.ngOnDestroy = function () {
            //this.dish.modifiers =[];
            this.validate.emit(true);
            this.cartService.setModifiers([], []);
        };
        return DishCalcDirective;
    }());
    DishCalcDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[dishCalc]'
                },] }
    ];
    DishCalcDirective.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: NgCartService }
    ]; };
    DishCalcDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        amount: [{ type: i0.Input }],
        selectedModifiers: [{ type: i0.Input }],
        validate: [{ type: i0.Output }],
        amountDishToAdd: [{ type: i0.Output }]
    };

    var CheckoutDirective = /** @class */ (function () {
        function CheckoutDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.paymentRedirect = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.isChecking = new i0.EventEmitter();
            this.cartService
                .userCart$()
                .subscribe(function (cart) { return _this.cart = cart; });
            this.cartService.OrderFormChange
                .pipe(operators.filter(function () {
                //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
                if (_this.locationId || (_this.streetId || _this.street) && _this.home || _this.selfService) {
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
            operators.debounceTime(1000))
                .subscribe(function () { return _this.checkStreet(); });
        }
        CheckoutDirective.prototype.onClick = function () {
            var _this = this;
            if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
                this.error.emit('Нужно указать адрес');
                return;
            }
            var comment = this.comment || "Не указан";
            var paymentMethod = this.paymentMethod || "Не указано";
            var data = {
                "cartId": this.cart.id,
                //"comment": comment,
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
            var cartId = this.cart.id;
            this.cartService
                .orderCart$(data)
                .subscribe(function (result) {
                if (result.action.data['redirectLink']) {
                    //window.location.href = result.action['paymentRedirect'];
                    _this.paymentRedirect.emit(result.action.data['redirectLink']);
                }
                else {
                    _this.success.emit(cartId);
                }
            }, function (error) { return _this.error.emit(error); });
        };
        CheckoutDirective.prototype.ngOnChanges = function (changes) {
            this.cartService.OrderFormChange.next(changes);
        };
        CheckoutDirective.prototype.checkStreet = function () {
            var _this = this;
            //if(this.streetId == '0') return;
            var comment = this.comment || "Не указан";
            var paymentMethod = this.paymentMethod || "Не указано";
            var data = {
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
            function (result) { return _this.isChecking.emit(false); }, function (error) { return _this.isChecking.emit(false); });
        };
        CheckoutDirective.prototype.preparePhone = function (phone) {
            if (!phone)
                return '';
            phone = '+' + phone.replace(/[^0-9]/gim, '');
            return phone.replace('+8', '+7');
        };
        return CheckoutDirective;
    }());
    CheckoutDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[checkout]'
                },] }
    ];
    CheckoutDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        cartTotal: [{ type: i0.Input }],
        bonuses: [{ type: i0.Input }],
        name: [{ type: i0.Input }],
        email: [{ type: i0.Input }],
        phone: [{ type: i0.Input }],
        delivery: [{ type: i0.Input }],
        selfService: [{ type: i0.Input }],
        locationId: [{ type: i0.Input }],
        street: [{ type: i0.Input }],
        streetId: [{ type: i0.Input }],
        home: [{ type: i0.Input }],
        housing: [{ type: i0.Input }],
        apartment: [{ type: i0.Input }],
        entrance: [{ type: i0.Input }],
        doorphone: [{ type: i0.Input }],
        floor: [{ type: i0.Input }],
        paymentMethod: [{ type: i0.Input }],
        paymentMethodId: [{ type: i0.Input }],
        personsCount: [{ type: i0.Input }],
        comment: [{ type: i0.Input }],
        callback: [{ type: i0.Input }],
        date: [{ type: i0.Input }],
        notifyMethodId: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        paymentRedirect: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        isChecking: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var SetDishCommentDirective = /** @class */ (function () {
        function SetDishCommentDirective(cartService) {
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        SetDishCommentDirective.prototype.onClick = function () {
            this.setComment();
        };
        SetDishCommentDirective.prototype.setComment = function () {
            var _this = this;
            this.cartService.setDishComment$(this.dish.id, this.comment).subscribe(function (res) { return _this.success.emit(true); }, function (err) { return _this.error.emit(err); });
        };
        return SetDishCommentDirective;
    }());
    SetDishCommentDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[setDishComment]'
                },] }
    ];
    SetDishCommentDirective.ctorParameters = function () { return [
        { type: NgCartService }
    ]; };
    SetDishCommentDirective.propDecorators = {
        comment: [{ type: i0.Input }],
        dish: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var DIRECTIVES = [
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
    var defaultUrl = 'https://stage4.api.lifenadym.webresto.dev/graphql';
    var NgGqlModule = /** @class */ (function () {
        function NgGqlModule(apollo, httpLink, config) {
            // Create an http link:
            var http = httpLink.create({
                uri: config.url,
            });
            // Create a WebSocket link:
            var ws$1 = new ws.WebSocketLink({
                uri: config.url.replace('http', 'ws'),
                options: {
                    reconnect: true,
                },
            });
            // using the ability to split links, you can send data to each link
            // depending on what kind of operation is being sent
            var link = core.split(
            // split based on operation type
            function (_a) {
                var query = _a.query;
                var _b = utilities.getMainDefinition(query), kind = _b.kind, operation = _b.operation;
                return (kind === 'OperationDefinition' && operation === 'subscription');
            }, ws$1, http);
            if (apollo.client)
                return;
            apollo.create({
                link: link,
                cache: new core.InMemoryCache()
            });
        }
        NgGqlModule.forRoot = function (config) {
            return {
                ngModule: NgGqlModule,
                providers: [
                    {
                        provide: 'config',
                        useValue: config
                    }
                ]
            };
        };
        return NgGqlModule;
    }());
    NgGqlModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [],
                    exports: [DIRECTIVES],
                    declarations: [DIRECTIVES]
                },] }
    ];
    NgGqlModule.ctorParameters = function () { return [
        { type: i1.Apollo },
        { type: http.HttpLink },
        { type: undefined, decorators: [{ type: i0.Inject, args: ['config',] }] }
    ]; };

    var StateService = /** @class */ (function () {
        function StateService() {
            this.maintenance$ = new rxjs.BehaviorSubject(null);
        }
        return StateService;
    }());
    StateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
    StateService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    StateService.ctorParameters = function () { return []; };

    var EventMessage = /** @class */ (function () {
        function EventMessage(type, title, body) {
            this.type = type;
            this.title = title;
            this.body = body;
        }
        return EventMessage;
    }());

    /*
     * Public API Surface of ng-gql
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddDishToCartDirective = AddDishToCartDirective;
    exports.AmountCartDirective = AmountCartDirective;
    exports.Cart = Cart;
    exports.CartDish = CartDish;
    exports.CheckPhoneResponse = CheckPhoneResponse;
    exports.CheckResponse = CheckResponse;
    exports.CheckoutDirective = CheckoutDirective;
    exports.DeleteFromCartDirective = DeleteFromCartDirective;
    exports.Dish = Dish;
    exports.DishCalcDirective = DishCalcDirective;
    exports.EventMessage = EventMessage;
    exports.EventerService = EventerService;
    exports.Group = Group;
    exports.GroupModifier = GroupModifier;
    exports.Modifier = Modifier;
    exports.NgCartService = NgCartService;
    exports.NgGqlModule = NgGqlModule;
    exports.NgGqlService = NgGqlService;
    exports.Order = Order;
    exports.OrderCartUserDirective = OrderCartUserDirective;
    exports.PaymentMethod = PaymentMethod;
    exports.Phone = Phone;
    exports.SetAmountDirective = SetAmountDirective;
    exports.SetDishCommentDirective = SetDishCommentDirective;
    exports.StateService = StateService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webresto-ng-gql.umd.js.map
