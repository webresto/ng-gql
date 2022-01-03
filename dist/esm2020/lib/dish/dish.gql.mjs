import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
import { GroupModifierFragments } from '../group-modifier/group-modifier.gql';
export const DishFragments = {
    dish: gql `
		fragment DishFragment on Dish {
			id
			name
			description
			groupId
			price
			weight
			balance
			tags
			additionalInfo
			seoDescription
			seoKeywords
			seoText
			seoTitle
			carbohydrateAmount
			carbohydrateFullAmount
			energyAmount
			energyFullAmount
			fatAmount
			fatFullAmount
			fiberAmount
			fiberFullAmount
			measureUnit
			type
			order
			isDeleted
			isModificable
			composition
			visible
			modifier
			promo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
				dishPlaceholder {
					...ImageFragment
				}
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};
export const DishGql = {
    queries: {
        getDishes: (customFields) => gql `
			query GetDishes {
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${DishFragments.dish}
		`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkNOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3RCLE9BQU8sRUFBRTtRQUNSLFNBQVMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFBOzs7O09BSTNCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztLQUd6QyxhQUFhLENBQUMsSUFBSTtHQUNwQjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEltYWdlRnJhZ21lbnRzIH0gZnJvbSAnLi4vaW1hZ2UvaW1hZ2UuZ3FsJztcbmltcG9ydCB7IEdyb3VwTW9kaWZpZXJGcmFnbWVudHMgfSBmcm9tICcuLi9ncm91cC1tb2RpZmllci9ncm91cC1tb2RpZmllci5ncWwnO1xuXG5leHBvcnQgY29uc3QgRGlzaEZyYWdtZW50cyA9IHtcblx0ZGlzaDogZ3FsYFxuXHRcdGZyYWdtZW50IERpc2hGcmFnbWVudCBvbiBEaXNoIHtcblx0XHRcdGlkXG5cdFx0XHRuYW1lXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0Z3JvdXBJZFxuXHRcdFx0cHJpY2Vcblx0XHRcdHdlaWdodFxuXHRcdFx0YmFsYW5jZVxuXHRcdFx0dGFnc1xuXHRcdFx0YWRkaXRpb25hbEluZm9cblx0XHRcdHNlb0Rlc2NyaXB0aW9uXG5cdFx0XHRzZW9LZXl3b3Jkc1xuXHRcdFx0c2VvVGV4dFxuXHRcdFx0c2VvVGl0bGVcblx0XHRcdGNhcmJvaHlkcmF0ZUFtb3VudFxuXHRcdFx0Y2FyYm9oeWRyYXRlRnVsbEFtb3VudFxuXHRcdFx0ZW5lcmd5QW1vdW50XG5cdFx0XHRlbmVyZ3lGdWxsQW1vdW50XG5cdFx0XHRmYXRBbW91bnRcblx0XHRcdGZhdEZ1bGxBbW91bnRcblx0XHRcdGZpYmVyQW1vdW50XG5cdFx0XHRmaWJlckZ1bGxBbW91bnRcblx0XHRcdG1lYXN1cmVVbml0XG5cdFx0XHR0eXBlXG5cdFx0XHRvcmRlclxuXHRcdFx0aXNEZWxldGVkXG5cdFx0XHRpc01vZGlmaWNhYmxlXG5cdFx0XHRjb21wb3NpdGlvblxuXHRcdFx0dmlzaWJsZVxuXHRcdFx0bW9kaWZpZXJcblx0XHRcdHByb21vXG5cdFx0XHRpbWFnZXMge1xuXHRcdFx0XHQuLi5JbWFnZUZyYWdtZW50XG5cdFx0XHR9XG5cdFx0XHRtb2RpZmllcnMge1xuXHRcdFx0XHQuLi5Hcm91cE1vZGlmaWVyRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdHBhcmVudEdyb3VwIHtcblx0XHRcdFx0aWRcblx0XHRcdFx0ZGlzaFBsYWNlaG9sZGVyIHtcblx0XHRcdFx0XHQuLi5JbWFnZUZyYWdtZW50XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0JHtJbWFnZUZyYWdtZW50cy5pbWFnZX1cblx0XHQke0dyb3VwTW9kaWZpZXJGcmFnbWVudHMuZ3JvdXBNb2RpZmllcn1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IERpc2hHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXREaXNoZXM6IChjdXN0b21GaWVsZHMpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldERpc2hlcyB7XG5cdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydEaXNoJ10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRgXG5cdH1cbn0iXX0=