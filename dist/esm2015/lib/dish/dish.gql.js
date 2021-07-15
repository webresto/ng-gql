import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
import { GroupModifierFragments } from '../group-modifier/group-modifier.gql';
export const DishFragments = {
    dish: gql `
		fragment DishFragment on Dish {
			id
			name
			description
			groupId
			price
			weight
			balance
			tags
			additionalInfo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};
const ɵ0 = () => gql `
			query GetDishes {
				dishes {
					...DishFragment
				}
			}
			${DishFragments.dish}
		`;
export const DishGql = {
    queries: {
        getDishes: ɵ0
    }
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO1dBSVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7S0FNakIsYUFBYSxDQUFDLElBQUk7R0FDcEI7QUFUSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsU0FBUyxJQU9SO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSW1hZ2VGcmFnbWVudHMgfSBmcm9tICcuLi9pbWFnZS9pbWFnZS5ncWwnO1xuaW1wb3J0IHsgR3JvdXBNb2RpZmllckZyYWdtZW50cyB9IGZyb20gJy4uL2dyb3VwLW1vZGlmaWVyL2dyb3VwLW1vZGlmaWVyLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBEaXNoRnJhZ21lbnRzID0ge1xuXHRkaXNoOiBncWxgXG5cdFx0ZnJhZ21lbnQgRGlzaEZyYWdtZW50IG9uIERpc2gge1xuXHRcdFx0aWRcblx0XHRcdG5hbWVcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRncm91cElkXG5cdFx0XHRwcmljZVxuXHRcdFx0d2VpZ2h0XG5cdFx0XHRiYWxhbmNlXG5cdFx0XHR0YWdzXG5cdFx0XHRhZGRpdGlvbmFsSW5mb1xuXHRcdFx0aW1hZ2VzIHtcblx0XHRcdFx0Li4uSW1hZ2VGcmFnbWVudFxuXHRcdFx0fVxuXHRcdFx0bW9kaWZpZXJzIHtcblx0XHRcdFx0Li4uR3JvdXBNb2RpZmllckZyYWdtZW50XG5cdFx0XHR9XG5cdFx0XHRwYXJlbnRHcm91cCB7XG5cdFx0XHRcdGlkXG5cdFx0XHR9XG5cdFx0fVxuXHRcdCR7SW1hZ2VGcmFnbWVudHMuaW1hZ2V9XG5cdFx0JHtHcm91cE1vZGlmaWVyRnJhZ21lbnRzLmdyb3VwTW9kaWZpZXJ9XG5cdGBcbn07XG5cbmV4cG9ydCBjb25zdCBEaXNoR3FsID0ge1xuXHRxdWVyaWVzOiB7XG5cdFx0Z2V0RGlzaGVzOiAoKSA9PiBncWxgXG5cdFx0XHRxdWVyeSBHZXREaXNoZXMge1xuXHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRgXG5cdH1cbn0iXX0=