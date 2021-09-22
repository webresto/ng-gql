import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
export const GroupFragments = {
    group: gql `
		fragment GroupFragment on Group {
			id
			description
			name
			order
			visible
			slug
		}
	`
};
export const GroupGql = {
    queries: {
        getGroups: () => gql `
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
		`,
        getGroupsAndDishes: () => gql `
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
		`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ncm91cC9ncm91cC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7O0VBU1Q7Q0FDRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHO0lBQ3ZCLE9BQU8sRUFBRTtRQUNSLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7Ozs7OztLQVNqQixjQUFjLENBQUMsS0FBSztLQUNwQixhQUFhLENBQUMsSUFBSTtHQUNwQjtRQUNELGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0tBWTFCLGNBQWMsQ0FBQyxLQUFLO0tBQ3BCLGFBQWEsQ0FBQyxJQUFJO0dBQ3BCO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgRGlzaEZyYWdtZW50cyB9IGZyb20gJy4uL2Rpc2gvZGlzaC5ncWwnO1xuXG5leHBvcnQgY29uc3QgR3JvdXBGcmFnbWVudHMgPSB7XG5cdGdyb3VwOiBncWxgXG5cdFx0ZnJhZ21lbnQgR3JvdXBGcmFnbWVudCBvbiBHcm91cCB7XG5cdFx0XHRpZFxuXHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdG5hbWVcblx0XHRcdG9yZGVyXG5cdFx0XHR2aXNpYmxlXG5cdFx0XHRzbHVnXG5cdFx0fVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRHcm91cHM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE1lbnUge1xuXHRcdFx0XHRncm91cHMge1xuXHRcdFx0XHRcdC4uLkdyb3VwRnJhZ21lbnRcblx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQke0dyb3VwRnJhZ21lbnRzLmdyb3VwfVxuXHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0YCxcblx0XHRnZXRHcm91cHNBbmREaXNoZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldEdyb3Vwc0FuZERpc2hlcyB7XG5cdFx0XHRcdGdyb3VwcyB7XG5cdFx0XHRcdFx0cGFyZW50R3JvdXAge1xuXHRcdFx0XHRcdFx0aWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Li4uR3JvdXBGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7R3JvdXBGcmFnbWVudHMuZ3JvdXB9XG5cdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRgXG5cdH1cbn0iXX0=