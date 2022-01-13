import {gql} from 'apollo-angular';
import type { CustomfFields } from '../custom-fields/custom-fields';

export const NavigationFragments = {
	navigation: gql`
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

export const NavigationGql = {
	queries: {
		getNavigationes: (customFields:CustomfFields) => gql`
			query GetNavigation {
				navigation {
					...NavigationFragment
					${(customFields['Navigation'] || []).join('\n')}
				}
			}
			${NavigationFragments.navigation}
		`
	}
}