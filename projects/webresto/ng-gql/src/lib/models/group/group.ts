import type { Dish } from '../dish/dish';

export interface Group {
	id: string;
	description: string;
	name: string;
	slug?: string;
	visible: boolean;
	isIncludedInMenu: boolean;
	order: number;
	dishes?: Dish[];
	discount?: number;
	parentGroup?: Group;
	childGroups: Group[];
}	
