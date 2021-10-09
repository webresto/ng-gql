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
			oldPrice
			weight
			balance
			tags
			additionalInfo
			discountAmount
			discountType
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO1dBSVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7S0FNakIsYUFBYSxDQUFDLElBQUk7R0FDcEI7QUFUSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsU0FBUyxJQU9SO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSW1hZ2VGcmFnbWVudHMgfSBmcm9tICcuLi9pbWFnZS9pbWFnZS5ncWwnO1xuaW1wb3J0IHsgR3JvdXBNb2RpZmllckZyYWdtZW50cyB9IGZyb20gJy4uL2dyb3VwLW1vZGlmaWVyL2dyb3VwLW1vZGlmaWVyLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBEaXNoRnJhZ21lbnRzID0ge1xuXHRkaXNoOiBncWxgXG5cdFx0ZnJhZ21lbnQgRGlzaEZyYWdtZW50IG9uIERpc2gge1xuXHRcdFx0aWRcblx0XHRcdG5hbWVcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRncm91cElkXG5cdFx0XHRwcmljZVxuXHRcdFx0b2xkUHJpY2Vcblx0XHRcdHdlaWdodFxuXHRcdFx0YmFsYW5jZVxuXHRcdFx0dGFnc1xuXHRcdFx0YWRkaXRpb25hbEluZm9cblx0XHRcdGRpc2NvdW50QW1vdW50XG5cdFx0XHRkaXNjb3VudFR5cGVcblx0XHRcdGltYWdlcyB7XG5cdFx0XHRcdC4uLkltYWdlRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdG1vZGlmaWVycyB7XG5cdFx0XHRcdC4uLkdyb3VwTW9kaWZpZXJGcmFnbWVudFxuXHRcdFx0fVxuXHRcdFx0cGFyZW50R3JvdXAge1xuXHRcdFx0XHRpZFxuXHRcdFx0fVxuXHRcdH1cblx0XHQke0ltYWdlRnJhZ21lbnRzLmltYWdlfVxuXHRcdCR7R3JvdXBNb2RpZmllckZyYWdtZW50cy5ncm91cE1vZGlmaWVyfVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgRGlzaEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldERpc2hlczogKCkgPT4gZ3FsYFxuXHRcdFx0cXVlcnkgR2V0RGlzaGVzIHtcblx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0YFxuXHR9XG59Il19