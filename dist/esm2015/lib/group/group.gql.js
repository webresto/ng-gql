import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
export const GroupFragments = {
    group: gql `
		fragment GroupFragment on Group {
			id
			description
			discount
			name
			order
			visible
			slug
		}
	`
};
const ɵ0 = () => gql `
			query GetMenu {
				groups {
					...GroupFragment
					dishes {
						...DishFragment
					}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`, ɵ1 = () => gql `
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
				}
				dishes {
					...DishFragment
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`;
export const GroupGql = {
    queries: {
        getGroups: ɵ0,
        getGroupsAndDishes: ɵ1
    }
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ncm91cC9ncm91cC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7OztFQVVUO0NBQ0QsQ0FBQztXQUlXLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQTs7Ozs7Ozs7O0tBU2pCLGNBQWMsQ0FBQyxLQUFLO0tBQ3BCLGFBQWEsQ0FBQyxJQUFJO0dBQ3BCLE9BQ21CLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0tBWTFCLGNBQWMsQ0FBQyxLQUFLO0tBQ3BCLGFBQWEsQ0FBQyxJQUFJO0dBQ3BCO0FBNUJILE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUN2QixPQUFPLEVBQUU7UUFDUixTQUFTLElBV1I7UUFDRCxrQkFBa0IsSUFjakI7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBHcm91cEZyYWdtZW50cyA9IHtcblx0Z3JvdXA6IGdxbGBcblx0XHRmcmFnbWVudCBHcm91cEZyYWdtZW50IG9uIEdyb3VwIHtcblx0XHRcdGlkXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0ZGlzY291bnRcblx0XHRcdG5hbWVcblx0XHRcdG9yZGVyXG5cdFx0XHR2aXNpYmxlXG5cdFx0XHRzbHVnXG5cdFx0fVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRHcm91cHM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE1lbnUge1xuXHRcdFx0XHRncm91cHMge1xuXHRcdFx0XHRcdC4uLkdyb3VwRnJhZ21lbnRcblx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQke0dyb3VwRnJhZ21lbnRzLmdyb3VwfVxuXHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0YCxcblx0XHRnZXRHcm91cHNBbmREaXNoZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldEdyb3Vwc0FuZERpc2hlcyB7XG5cdFx0XHRcdGdyb3VwcyB7XG5cdFx0XHRcdFx0cGFyZW50R3JvdXAge1xuXHRcdFx0XHRcdFx0aWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Li4uR3JvdXBGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7R3JvdXBGcmFnbWVudHMuZ3JvdXB9XG5cdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRgXG5cdH1cbn0iXX0=