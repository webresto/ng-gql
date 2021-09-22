import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
export const CartDishFragments = {
    cartDish: gql `
		fragment CartDishFragment on CartDish {
			id
			amount
			dish {
				...DishFragment
			}
			modifiers {
				id
				dish {
					...DishFragment
				}
				amount
				groupId
			}
			discountTotal
			comment
			weight
			totalWeight
			itemTotal
			uniqueItems
		}
		${DishFragments.dish}
	`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1kaXNoLmdxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FydC1kaXNoL2NhcnQtZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JWLGFBQWEsQ0FBQyxJQUFJO0VBQ3BCO0NBQ0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9kaXNoL2Rpc2guZ3FsJztcblxuZXhwb3J0IGNvbnN0IENhcnREaXNoRnJhZ21lbnRzID0ge1xuXHRjYXJ0RGlzaDogZ3FsYFxuXHRcdGZyYWdtZW50IENhcnREaXNoRnJhZ21lbnQgb24gQ2FydERpc2gge1xuXHRcdFx0aWRcblx0XHRcdGFtb3VudFxuXHRcdFx0ZGlzaCB7XG5cdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0fVxuXHRcdFx0bW9kaWZpZXJzIHtcblx0XHRcdFx0aWRcblx0XHRcdFx0ZGlzaCB7XG5cdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdH1cblx0XHRcdFx0YW1vdW50XG5cdFx0XHRcdGdyb3VwSWRcblx0XHRcdH1cblx0XHRcdGRpc2NvdW50VG90YWxcblx0XHRcdGNvbW1lbnRcblx0XHRcdHdlaWdodFxuXHRcdFx0dG90YWxXZWlnaHRcblx0XHRcdGl0ZW1Ub3RhbFxuXHRcdFx0dW5pcXVlSXRlbXNcblx0XHR9XG5cdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdGBcbn07Il19