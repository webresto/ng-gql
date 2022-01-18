import type { Dish } from '../dish/dish';

export interface Group {
	id: string;
	description: string;
	name: string;
	visible: string;
	order: number;
	dishes?: Dish[];
	discount?: number;
	parentGroup?: Group;
  	slug?: string;
	childGroups: Group[]
}	
