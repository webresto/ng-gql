import { Dish } from '../dish/dish';
import { Image } from "../image/image";

export class Group {
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
	dishPlaceholder: Image
}	
