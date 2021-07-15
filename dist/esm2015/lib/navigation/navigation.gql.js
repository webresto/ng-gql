import { gql } from 'apollo-angular';
export const NavigationFragments = {
    navigation: gql `
		fragment NavigationFragment on Navigation {
			id 
			name
			description
			data {
				label
				link
				timeWork
				phone
				icon
				active
				slug
				child {
					tags
					slug
					visible
					name
				}
			}
		}
	`
};
const ɵ0 = () => gql `
			query GetNavigation {
				navigation {
					...NavigationFragment
				}
			}
			${NavigationFragments.navigation}
		`;
export const NavigationGql = {
    queries: {
        getNavigationes: ɵ0
    }
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2xDLFVBQVUsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXFCZDtDQUNELENBQUM7V0FJaUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7S0FNdkIsbUJBQW1CLENBQUMsVUFBVTtHQUNoQztBQVRILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUM1QixPQUFPLEVBQUU7UUFDUixlQUFlLElBT2Q7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dxbH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5leHBvcnQgY29uc3QgTmF2aWdhdGlvbkZyYWdtZW50cyA9IHtcblx0bmF2aWdhdGlvbjogZ3FsYFxuXHRcdGZyYWdtZW50IE5hdmlnYXRpb25GcmFnbWVudCBvbiBOYXZpZ2F0aW9uIHtcblx0XHRcdGlkIFxuXHRcdFx0bmFtZVxuXHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdGRhdGEge1xuXHRcdFx0XHRsYWJlbFxuXHRcdFx0XHRsaW5rXG5cdFx0XHRcdHRpbWVXb3JrXG5cdFx0XHRcdHBob25lXG5cdFx0XHRcdGljb25cblx0XHRcdFx0YWN0aXZlXG5cdFx0XHRcdHNsdWdcblx0XHRcdFx0Y2hpbGQge1xuXHRcdFx0XHRcdHRhZ3Ncblx0XHRcdFx0XHRzbHVnXG5cdFx0XHRcdFx0dmlzaWJsZVxuXHRcdFx0XHRcdG5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25HcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXROYXZpZ2F0aW9uZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE5hdmlnYXRpb24ge1xuXHRcdFx0XHRuYXZpZ2F0aW9uIHtcblx0XHRcdFx0XHQuLi5OYXZpZ2F0aW9uRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtOYXZpZ2F0aW9uRnJhZ21lbnRzLm5hdmlnYXRpb259XG5cdFx0YFxuXHR9XG59Il19