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
export const DishGql = {
    queries: {
        getDishes: () => gql `
			query GetDishes {
				dishes {
					...DishFragment
				}
			}
			${DishFragments.dish}
		`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3RCLE9BQU8sRUFBRTtRQUNSLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7OztLQU1qQixhQUFhLENBQUMsSUFBSTtHQUNwQjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEltYWdlRnJhZ21lbnRzIH0gZnJvbSAnLi4vaW1hZ2UvaW1hZ2UuZ3FsJztcbmltcG9ydCB7IEdyb3VwTW9kaWZpZXJGcmFnbWVudHMgfSBmcm9tICcuLi9ncm91cC1tb2RpZmllci9ncm91cC1tb2RpZmllci5ncWwnO1xuXG5leHBvcnQgY29uc3QgRGlzaEZyYWdtZW50cyA9IHtcblx0ZGlzaDogZ3FsYFxuXHRcdGZyYWdtZW50IERpc2hGcmFnbWVudCBvbiBEaXNoIHtcblx0XHRcdGlkXG5cdFx0XHRuYW1lXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0Z3JvdXBJZFxuXHRcdFx0cHJpY2Vcblx0XHRcdHdlaWdodFxuXHRcdFx0YmFsYW5jZVxuXHRcdFx0dGFnc1xuXHRcdFx0YWRkaXRpb25hbEluZm9cblx0XHRcdGltYWdlcyB7XG5cdFx0XHRcdC4uLkltYWdlRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdG1vZGlmaWVycyB7XG5cdFx0XHRcdC4uLkdyb3VwTW9kaWZpZXJGcmFnbWVudFxuXHRcdFx0fVxuXHRcdFx0cGFyZW50R3JvdXAge1xuXHRcdFx0XHRpZFxuXHRcdFx0fVxuXHRcdH1cblx0XHQke0ltYWdlRnJhZ21lbnRzLmltYWdlfVxuXHRcdCR7R3JvdXBNb2RpZmllckZyYWdtZW50cy5ncm91cE1vZGlmaWVyfVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgRGlzaEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldERpc2hlczogKCkgPT4gZ3FsYFxuXHRcdFx0cXVlcnkgR2V0RGlzaGVzIHtcblx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0YFxuXHR9XG59Il19