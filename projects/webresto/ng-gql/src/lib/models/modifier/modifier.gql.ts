import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';

export const ModifierFragments = {
	modifier: gql`
		fragment ModifierFragment on Modifier {
			modifierId
			maxAmount
			minAmount
			defaultAmount
			dish {
				id
				name
				description
				price
				weight
				balance
				tags
				groupId 
				images {
					...ImageFragment
				}
			}
		}
		${ImageFragments.image}
	`
};
