import { gql } from 'apollo-angular';
import type { CustomfFields } from '../custom-fields/custom-fields';

export const NavigationFragments = {
	navigation: gql`
		fragment NavigationFragment on Navigation {
			mnemonicId,
			description,
			options,
			id,
			navigation_menu
		}
	`
};

export const NavigationGql = {
	queries: {
		getNavigationes: (customFields: CustomfFields) => gql`
			query GetNavigation {
				navigations {
					...NavigationFragment
					${(customFields['Navigation'] || []).join('\n')}
				}
			}
			${NavigationFragments.navigation}
		`
	}
}