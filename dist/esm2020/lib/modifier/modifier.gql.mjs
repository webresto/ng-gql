import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
export const ModifierFragments = {
    modifier: gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZXIuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tb2RpZmllci9tb2RpZmllci5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQlYsY0FBYyxDQUFDLEtBQUs7RUFDdEI7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSW1hZ2VGcmFnbWVudHMgfSBmcm9tICcuLi9pbWFnZS9pbWFnZS5ncWwnO1xuXG5leHBvcnQgY29uc3QgTW9kaWZpZXJGcmFnbWVudHMgPSB7XG5cdG1vZGlmaWVyOiBncWxgXG5cdFx0ZnJhZ21lbnQgTW9kaWZpZXJGcmFnbWVudCBvbiBNb2RpZmllciB7XG5cdFx0XHRtb2RpZmllcklkXG5cdFx0XHRtYXhBbW91bnRcblx0XHRcdG1pbkFtb3VudFxuXHRcdFx0ZGVmYXVsdEFtb3VudFxuXHRcdFx0aGlkZUlmRGVmYXVsdEFtb3VudFxuXHRcdFx0ZGlzaCB7XG5cdFx0XHRcdGlkXG5cdFx0XHRcdG5hbWVcblx0XHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdFx0Z3JvdXBJZFxuXHRcdFx0XHRwcmljZVxuXHRcdFx0XHR3ZWlnaHRcblx0XHRcdFx0YmFsYW5jZVxuXHRcdFx0XHR0YWdzXG5cdFx0XHRcdGltYWdlcyB7XG5cdFx0XHRcdFx0Li4uSW1hZ2VGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCR7SW1hZ2VGcmFnbWVudHMuaW1hZ2V9XG5cdGBcbn07XG4iXX0=