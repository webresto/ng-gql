import {gql} from 'apollo-angular';

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
				child {
					tags
					slug
					visible
					name
				}
			}
		}
	`
};

export const NavigationGql = {
	queries: {
		getNavigationes: () => gql`
			query GetNavigation {
				navigation {
					...NavigationFragment
				}
			}
			${NavigationFragments.navigation}
		`
	}
}