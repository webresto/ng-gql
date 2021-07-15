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
		}
		${DishFragments.dish}
	`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1kaXNoLmdxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FydC1kaXNoL2NhcnQtZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CVixhQUFhLENBQUMsSUFBSTtFQUNwQjtDQUNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBDYXJ0RGlzaEZyYWdtZW50cyA9IHtcblx0Y2FydERpc2g6IGdxbGBcblx0XHRmcmFnbWVudCBDYXJ0RGlzaEZyYWdtZW50IG9uIENhcnREaXNoIHtcblx0XHRcdGlkXG5cdFx0XHRhbW91bnRcblx0XHRcdGRpc2gge1xuXHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdG1vZGlmaWVycyB7XG5cdFx0XHRcdGlkXG5cdFx0XHRcdGRpc2gge1xuXHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHRcdGFtb3VudFxuXHRcdFx0XHRncm91cElkXG5cdFx0XHR9XG5cdFx0XHRkaXNjb3VudFRvdGFsXG5cdFx0XHRjb21tZW50XG5cdFx0XHR3ZWlnaHRcblx0XHRcdHRvdGFsV2VpZ2h0XG5cdFx0fVxuXHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRgXG59O1xuIl19