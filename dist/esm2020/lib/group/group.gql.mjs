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
        getGroupsAndDishes: (customFields) => gql `
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
					${(customFields['Group'] || []).join('\n')}
				}
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ncm91cC9ncm91cC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7O0VBU1Q7Q0FDRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHO0lBQ3ZCLE9BQU8sRUFBRTtRQUNSLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7Ozs7OztLQVNqQixjQUFjLENBQUMsS0FBSztLQUNwQixhQUFhLENBQUMsSUFBSTtHQUNwQjtRQUNELGtCQUFrQixFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7Ozs7T0FPcEMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztPQUl4QyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7S0FHekMsY0FBYyxDQUFDLEtBQUs7S0FDcEIsYUFBYSxDQUFDLElBQUk7R0FDcEI7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBHcm91cEZyYWdtZW50cyA9IHtcblx0Z3JvdXA6IGdxbGBcblx0XHRmcmFnbWVudCBHcm91cEZyYWdtZW50IG9uIEdyb3VwIHtcblx0XHRcdGlkXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0bmFtZVxuXHRcdFx0b3JkZXJcblx0XHRcdHZpc2libGVcblx0XHRcdHNsdWdcblx0XHR9XG5cdGBcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldEdyb3VwczogKCkgPT4gZ3FsYFxuXHRcdFx0cXVlcnkgR2V0TWVudSB7XG5cdFx0XHRcdGdyb3VwcyB7XG5cdFx0XHRcdFx0Li4uR3JvdXBGcmFnbWVudFxuXHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7R3JvdXBGcmFnbWVudHMuZ3JvdXB9XG5cdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRgLFxuXHRcdGdldEdyb3Vwc0FuZERpc2hlczogKGN1c3RvbUZpZWxkcykgPT4gZ3FsYFxuXHRcdFx0cXVlcnkgR2V0R3JvdXBzQW5kRGlzaGVzIHtcblx0XHRcdFx0Z3JvdXBzIHtcblx0XHRcdFx0XHRwYXJlbnRHcm91cCB7XG5cdFx0XHRcdFx0XHRpZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQuLi5Hcm91cEZyYWdtZW50XG5cdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydHcm91cCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0fVxuXHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snRGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtHcm91cEZyYWdtZW50cy5ncm91cH1cblx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdGBcblx0fVxufSJdfQ==