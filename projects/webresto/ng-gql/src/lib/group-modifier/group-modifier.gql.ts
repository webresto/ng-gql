import { gql } from 'apollo-angular';
import { ModifierFragments } from '../modifier/modifier.gql';

export const GroupModifierFragments = {
	groupModifier: gql`
		fragment GroupModifierFragment on GroupModifier {
			modifierId
			maxAmount
			minAmount
			required
			childModifiers {
				...ModifierFragment
			}
			group {
				id
				name
			}
		}
		${ModifierFragments.modifier}
	`
};
