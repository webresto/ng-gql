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
				controller
				slug
				warning
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2xDLFVBQVUsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdUJkO0NBQ0QsQ0FBQztXQUlpQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7OztLQU12QixtQkFBbUIsQ0FBQyxVQUFVO0dBQ2hDO0FBVEgsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLE9BQU8sRUFBRTtRQUNSLGVBQWUsSUFPZDtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z3FsfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBOYXZpZ2F0aW9uRnJhZ21lbnRzID0ge1xuXHRuYXZpZ2F0aW9uOiBncWxgXG5cdFx0ZnJhZ21lbnQgTmF2aWdhdGlvbkZyYWdtZW50IG9uIE5hdmlnYXRpb24ge1xuXHRcdFx0aWQgXG5cdFx0XHRuYW1lXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0ZGF0YSB7XG5cdFx0XHRcdGxhYmVsXG5cdFx0XHRcdGxpbmtcblx0XHRcdFx0dGltZVdvcmtcblx0XHRcdFx0cGhvbmVcblx0XHRcdFx0aWNvblxuXHRcdFx0XHRhY3RpdmVcblx0XHRcdFx0Y29udHJvbGxlclxuXHRcdFx0XHRzbHVnXG5cdFx0XHRcdHdhcm5pbmdcblx0XHRcdFx0Y2hpbGQge1xuXHRcdFx0XHRcdHRhZ3Ncblx0XHRcdFx0XHRzbHVnXG5cdFx0XHRcdFx0dmlzaWJsZVxuXHRcdFx0XHRcdG5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25HcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXROYXZpZ2F0aW9uZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE5hdmlnYXRpb24ge1xuXHRcdFx0XHRuYXZpZ2F0aW9uIHtcblx0XHRcdFx0XHQuLi5OYXZpZ2F0aW9uRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtOYXZpZ2F0aW9uRnJhZ21lbnRzLm5hdmlnYXRpb259XG5cdFx0YFxuXHR9XG59Il19