import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';

export const ModifierFragments = {
	modifier: gql`
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
