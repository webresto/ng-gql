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
		getNavigationes: (customFields) => gql`
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