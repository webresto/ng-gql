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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2xDLFVBQVUsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQmQ7Q0FDRCxDQUFDO1dBSWlCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQTs7Ozs7O0tBTXZCLG1CQUFtQixDQUFDLFVBQVU7R0FDaEM7QUFUSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsT0FBTyxFQUFFO1FBQ1IsZUFBZSxJQU9kO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtncWx9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25GcmFnbWVudHMgPSB7XG5cdG5hdmlnYXRpb246IGdxbGBcblx0XHRmcmFnbWVudCBOYXZpZ2F0aW9uRnJhZ21lbnQgb24gTmF2aWdhdGlvbiB7XG5cdFx0XHRpZCBcblx0XHRcdG5hbWVcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRkYXRhIHtcblx0XHRcdFx0bGFiZWxcblx0XHRcdFx0bGlua1xuXHRcdFx0XHR0aW1lV29ya1xuXHRcdFx0XHRwaG9uZVxuXHRcdFx0XHRpY29uXG5cdFx0XHRcdGFjdGl2ZVxuXHRcdFx0XHRjb250cm9sbGVyXG5cdFx0XHRcdHNsdWdcblx0XHRcdFx0Y2hpbGQge1xuXHRcdFx0XHRcdHRhZ3Ncblx0XHRcdFx0XHRzbHVnXG5cdFx0XHRcdFx0dmlzaWJsZVxuXHRcdFx0XHRcdG5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25HcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXROYXZpZ2F0aW9uZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE5hdmlnYXRpb24ge1xuXHRcdFx0XHRuYXZpZ2F0aW9uIHtcblx0XHRcdFx0XHQuLi5OYXZpZ2F0aW9uRnJhZ21lbnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JHtOYXZpZ2F0aW9uRnJhZ21lbnRzLm5hdmlnYXRpb259XG5cdFx0YFxuXHR9XG59Il19