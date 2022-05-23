import type { ValuesOrBoolean } from '../values-or-boolean';

/**
 * @interface NavigationBase
 * Базовый интерфейс для объектов, содержащих информацию о навигации внутри приложения.
 */
export interface NavigationBase {
	id: number;
	description: string;
}

/**
 * @interface NavigationLoader<T>
 * Интерфейс объекта для потока, в котором происходит загрузка массива обьъектов навигации для прилоржения.
 * @property options.queryObject -  Объект ValuesOrBoolean для загрузки навигации
 * @property options.uniqueKeyForCompareItem - наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id').
 * Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки.
 */
export interface NavigationLoader<T> {
	nameQuery: string;
	nameSubscribe: string;
	queryObject: ValuesOrBoolean<T>;
	uniqueKeyForCompareItem: keyof {
		[ K in keyof T ]: K extends string ? K : never
	};
}

export interface Navigation extends NavigationBase {
	mnemonicId: string;
	options: NavigationsOptions;
	navigation_menu: NavigationsMenuItem[];
}

export interface NavigationsMenuItemBase {
	label: string;
	link: string;
	concept: 'origin' | string;

	active?: boolean;
}

export interface NavigationsMenuItem extends NavigationsMenuItemBase {

	visible?: boolean;
	icon?: string;
	groupSlug: string;
}

export interface NavigationsOptions {
	initGroupSlug: string;
	concept: string | 'origin' | null | undefined;
	behavior?: `newpagebyslug`  //Построение через initGroupSlug где каждый раздел создается на своей странице
	| `onepagebyslug`  //Построение через initGroupSlug где все подразделы на одной страницы с навигацией по # (переход реализуется прокруткой)
	| `newpagebynavigationmenu`   //Построение из меню которое пришло в navigation_menu где каждый раздел создается на своей странице
	| `onepagebynavigationmenu`; //Построение из меню которое пришло в navigation_menu где все разделы аккамулируются на одной странице, акамуляция происходит по массиву из `navigation_menu` с учетом очереди
}


export const NavigationFragments = {
	vOb: <ValuesOrBoolean<Navigation>> {
		mnemonicId: true,
		description: true,
		options: true,
		id: true,
		navigation_menu: true
	}
};
