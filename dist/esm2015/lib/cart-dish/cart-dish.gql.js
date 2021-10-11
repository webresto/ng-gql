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
			discountType
			comment
			weight
			totalWeight
			itemTotal
			itemTotalBeforeDiscount
			uniqueItems
		}
		${DishFragments.dish}
	`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1kaXNoLmdxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FydC1kaXNoL2NhcnQtZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QlYsYUFBYSxDQUFDLElBQUk7RUFDcEI7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgRGlzaEZyYWdtZW50cyB9IGZyb20gJy4uL2Rpc2gvZGlzaC5ncWwnO1xuXG5leHBvcnQgY29uc3QgQ2FydERpc2hGcmFnbWVudHMgPSB7XG5cdGNhcnREaXNoOiBncWxgXG5cdFx0ZnJhZ21lbnQgQ2FydERpc2hGcmFnbWVudCBvbiBDYXJ0RGlzaCB7XG5cdFx0XHRpZFxuXHRcdFx0YW1vdW50XG5cdFx0XHRkaXNoIHtcblx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHR9XG5cdFx0XHRtb2RpZmllcnMge1xuXHRcdFx0XHRpZFxuXHRcdFx0XHRkaXNoIHtcblx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0XHRhbW91bnRcblx0XHRcdFx0Z3JvdXBJZFxuXHRcdFx0fVxuXHRcdFx0ZGlzY291bnRUb3RhbFxuXHRcdFx0ZGlzY291bnRUeXBlXG5cdFx0XHRjb21tZW50XG5cdFx0XHR3ZWlnaHRcblx0XHRcdHRvdGFsV2VpZ2h0XG5cdFx0XHRpdGVtVG90YWxcblx0XHRcdGl0ZW1Ub3RhbEJlZm9yZURpc2NvdW50XG5cdFx0XHR1bmlxdWVJdGVtc1xuXHRcdH1cblx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0YFxufTsiXX0=