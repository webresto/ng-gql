import { Dish } from '../dish/dish';

export class Group {
	id: string;
	description: string;
	name: string;
	visible: string;
	order: number;
	dishes?: Dish[];
	parentGroup?: Group;
  	slug?: string;
}
