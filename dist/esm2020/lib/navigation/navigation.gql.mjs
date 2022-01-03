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
					discount
				}
			}
		}
	`
};
export const NavigationGql = {
    queries: {
        getNavigationes: (customFields) => gql `
			query GetNavigation {
				navigation {
					...NavigationFragment
					${(customFields['Navigation'] || []).join('\n')}
				}
			}
			${NavigationFragments.navigation}
		`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2xDLFVBQVUsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCZDtDQUNELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsT0FBTyxFQUFFO1FBQ1IsZUFBZSxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUE7Ozs7T0FJakMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0tBRy9DLG1CQUFtQixDQUFDLFVBQVU7R0FDaEM7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dxbH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5leHBvcnQgY29uc3QgTmF2aWdhdGlvbkZyYWdtZW50cyA9IHtcblx0bmF2aWdhdGlvbjogZ3FsYFxuXHRcdGZyYWdtZW50IE5hdmlnYXRpb25GcmFnbWVudCBvbiBOYXZpZ2F0aW9uIHtcblx0XHRcdGlkIFxuXHRcdFx0bmFtZVxuXHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdGRhdGEge1xuXHRcdFx0XHRsYWJlbFxuXHRcdFx0XHRsaW5rXG5cdFx0XHRcdHRpbWVXb3JrXG5cdFx0XHRcdHBob25lXG5cdFx0XHRcdGljb25cblx0XHRcdFx0YWN0aXZlXG5cdFx0XHRcdGNvbnRyb2xsZXJcblx0XHRcdFx0c2x1Z1xuXHRcdFx0XHR3YXJuaW5nXG5cdFx0XHRcdGNoaWxkIHtcblx0XHRcdFx0XHR0YWdzXG5cdFx0XHRcdFx0c2x1Z1xuXHRcdFx0XHRcdHZpc2libGVcblx0XHRcdFx0XHRuYW1lXG5cdFx0XHRcdFx0ZGlzY291bnRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25HcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXROYXZpZ2F0aW9uZXM6IChjdXN0b21GaWVsZHMpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldE5hdmlnYXRpb24ge1xuXHRcdFx0XHRuYXZpZ2F0aW9uIHtcblx0XHRcdFx0XHQuLi5OYXZpZ2F0aW9uRnJhZ21lbnRcblx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ05hdmlnYXRpb24nXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7TmF2aWdhdGlvbkZyYWdtZW50cy5uYXZpZ2F0aW9ufVxuXHRcdGBcblx0fVxufSJdfQ==