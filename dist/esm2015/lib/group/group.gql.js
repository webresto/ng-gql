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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ncm91cC9ncm91cC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7O0VBU1Q7Q0FDRCxDQUFDO1dBSVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7Ozs7S0FTakIsY0FBYyxDQUFDLEtBQUs7S0FDcEIsYUFBYSxDQUFDLElBQUk7R0FDcEIsT0FDbUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7S0FZMUIsY0FBYyxDQUFDLEtBQUs7S0FDcEIsYUFBYSxDQUFDLElBQUk7R0FDcEI7QUE1QkgsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHO0lBQ3ZCLE9BQU8sRUFBRTtRQUNSLFNBQVMsSUFXUjtRQUNELGtCQUFrQixJQWNqQjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9kaXNoL2Rpc2guZ3FsJztcblxuZXhwb3J0IGNvbnN0IEdyb3VwRnJhZ21lbnRzID0ge1xuXHRncm91cDogZ3FsYFxuXHRcdGZyYWdtZW50IEdyb3VwRnJhZ21lbnQgb24gR3JvdXAge1xuXHRcdFx0aWRcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRuYW1lXG5cdFx0XHRvcmRlclxuXHRcdFx0dmlzaWJsZVxuXHRcdFx0c2x1Z1xuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwR3FsID0ge1xuXHRxdWVyaWVzOiB7XG5cdFx0Z2V0R3JvdXBzOiAoKSA9PiBncWxgXG5cdFx0XHRxdWVyeSBHZXRNZW51IHtcblx0XHRcdFx0Z3JvdXBzIHtcblx0XHRcdFx0XHQuLi5Hcm91cEZyYWdtZW50XG5cdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtHcm91cEZyYWdtZW50cy5ncm91cH1cblx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdGAsXG5cdFx0Z2V0R3JvdXBzQW5kRGlzaGVzOiAoKSA9PiBncWxgXG5cdFx0XHRxdWVyeSBHZXRHcm91cHNBbmREaXNoZXMge1xuXHRcdFx0XHRncm91cHMge1xuXHRcdFx0XHRcdHBhcmVudEdyb3VwIHtcblx0XHRcdFx0XHRcdGlkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC4uLkdyb3VwRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQke0dyb3VwRnJhZ21lbnRzLmdyb3VwfVxuXHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0YFxuXHR9XG59Il19