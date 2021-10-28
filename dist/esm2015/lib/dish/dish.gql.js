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
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};
const ɵ0 = (customFields) => gql `
			query GetDishes {
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${DishFragments.dish}
		`;
export const DishGql = {
    queries: {
        getDishes: ɵ0
    }
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMENOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO1dBSVcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQTs7OztPQUkzQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7S0FHekMsYUFBYSxDQUFDLElBQUk7R0FDcEI7QUFWSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsU0FBUyxJQVFSO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSW1hZ2VGcmFnbWVudHMgfSBmcm9tICcuLi9pbWFnZS9pbWFnZS5ncWwnO1xuaW1wb3J0IHsgR3JvdXBNb2RpZmllckZyYWdtZW50cyB9IGZyb20gJy4uL2dyb3VwLW1vZGlmaWVyL2dyb3VwLW1vZGlmaWVyLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBEaXNoRnJhZ21lbnRzID0ge1xuXHRkaXNoOiBncWxgXG5cdFx0ZnJhZ21lbnQgRGlzaEZyYWdtZW50IG9uIERpc2gge1xuXHRcdFx0aWRcblx0XHRcdG5hbWVcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRncm91cElkXG5cdFx0XHRwcmljZVxuXHRcdFx0d2VpZ2h0XG5cdFx0XHRiYWxhbmNlXG5cdFx0XHR0YWdzXG5cdFx0XHRhZGRpdGlvbmFsSW5mb1xuXHRcdFx0c2VvRGVzY3JpcHRpb25cblx0XHRcdHNlb0tleXdvcmRzXG5cdFx0XHRzZW9UZXh0XG5cdFx0XHRzZW9UaXRsZVxuXHRcdFx0Y2FyYm9oeWRyYXRlQW1vdW50XG5cdFx0XHRjYXJib2h5ZHJhdGVGdWxsQW1vdW50XG5cdFx0XHRlbmVyZ3lBbW91bnRcblx0XHRcdGVuZXJneUZ1bGxBbW91bnRcblx0XHRcdGZhdEFtb3VudFxuXHRcdFx0ZmF0RnVsbEFtb3VudFxuXHRcdFx0ZmliZXJBbW91bnRcblx0XHRcdGZpYmVyRnVsbEFtb3VudFxuXHRcdFx0bWVhc3VyZVVuaXRcblx0XHRcdHR5cGVcblx0XHRcdG9yZGVyXG5cdFx0XHRpc0RlbGV0ZWRcblx0XHRcdGlzTW9kaWZpY2FibGVcblx0XHRcdGNvbXBvc2l0aW9uXG5cdFx0XHR2aXNpYmxlXG5cdFx0XHRtb2RpZmllclxuXHRcdFx0cHJvbW9cblx0XHRcdGltYWdlcyB7XG5cdFx0XHRcdC4uLkltYWdlRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdG1vZGlmaWVycyB7XG5cdFx0XHRcdC4uLkdyb3VwTW9kaWZpZXJGcmFnbWVudFxuXHRcdFx0fVxuXHRcdFx0cGFyZW50R3JvdXAge1xuXHRcdFx0XHRpZFxuXHRcdFx0fVxuXHRcdH1cblx0XHQke0ltYWdlRnJhZ21lbnRzLmltYWdlfVxuXHRcdCR7R3JvdXBNb2RpZmllckZyYWdtZW50cy5ncm91cE1vZGlmaWVyfVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgRGlzaEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldERpc2hlczogKGN1c3RvbUZpZWxkcykgPT4gZ3FsYFxuXHRcdFx0cXVlcnkgR2V0RGlzaGVzIHtcblx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0Rpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdGBcblx0fVxufSJdfQ==