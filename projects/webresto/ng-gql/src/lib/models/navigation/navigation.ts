export interface Navigation {
	mnemonicId: string;
	description: string;
	options: NavigationsOptions;
	id: number;
	navigation_menu: NavigationsMenuItem[];
}

export interface NavigationsMenuItem {
	label: string;
	link: string;
	icon?: string;
	groupSlug: string;
	active?: boolean;
	visible?: boolean;
}

export interface NavigationsOptions {
	initGroupSlug?: string;
	behavior?: `newpagebyslug`  //Построение через initGroupSlug где каждый раздел создается на своей странице
	| `onepagebyslug`  //Построение через initGroupSlug где все подразделы на одной страницы с навигацией по # (переход реализуется прокруткой)
	| `newpagebynavigationmenu`   //Построение из меню которое пришло в navigation_menu где каждый раздел создается на своей странице
	| `onepagebynavigationmenu`; //Построение из меню которое пришло в navigation_menu где все разделы аккамулируются на одной странице, акамуляция происходит по массиву из `navigation_menu` с учетом очереди
}
