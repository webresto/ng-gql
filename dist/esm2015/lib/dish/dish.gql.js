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
			oldPrice
			weight
			balance
			tags
			additionalInfo
			discountAmount
			discountType
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
const ɵ0 = () => gql `
			query GetDishes {
				dishes {
					...DishFragment
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Rpc2gvZGlzaC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkNOLGNBQWMsQ0FBQyxLQUFLO0lBQ3BCLHNCQUFzQixDQUFDLGFBQWE7RUFDdEM7Q0FDRCxDQUFDO1dBSVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBOzs7Ozs7S0FNakIsYUFBYSxDQUFDLElBQUk7R0FDcEI7QUFUSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsU0FBUyxJQU9SO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSW1hZ2VGcmFnbWVudHMgfSBmcm9tICcuLi9pbWFnZS9pbWFnZS5ncWwnO1xuaW1wb3J0IHsgR3JvdXBNb2RpZmllckZyYWdtZW50cyB9IGZyb20gJy4uL2dyb3VwLW1vZGlmaWVyL2dyb3VwLW1vZGlmaWVyLmdxbCc7XG5cbmV4cG9ydCBjb25zdCBEaXNoRnJhZ21lbnRzID0ge1xuXHRkaXNoOiBncWxgXG5cdFx0ZnJhZ21lbnQgRGlzaEZyYWdtZW50IG9uIERpc2gge1xuXHRcdFx0aWRcblx0XHRcdG5hbWVcblx0XHRcdGRlc2NyaXB0aW9uXG5cdFx0XHRncm91cElkXG5cdFx0XHRwcmljZVxuXHRcdFx0b2xkUHJpY2Vcblx0XHRcdHdlaWdodFxuXHRcdFx0YmFsYW5jZVxuXHRcdFx0dGFnc1xuXHRcdFx0YWRkaXRpb25hbEluZm9cblx0XHRcdGRpc2NvdW50QW1vdW50XG5cdFx0XHRkaXNjb3VudFR5cGVcblx0XHRcdHNlb0Rlc2NyaXB0aW9uXG5cdFx0XHRzZW9LZXl3b3Jkc1xuXHRcdFx0c2VvVGV4dFxuXHRcdFx0c2VvVGl0bGVcblx0XHRcdGNhcmJvaHlkcmF0ZUFtb3VudFxuXHRcdFx0Y2FyYm9oeWRyYXRlRnVsbEFtb3VudFxuXHRcdFx0ZW5lcmd5QW1vdW50XG5cdFx0XHRlbmVyZ3lGdWxsQW1vdW50XG5cdFx0XHRmYXRBbW91bnRcblx0XHRcdGZhdEZ1bGxBbW91bnRcblx0XHRcdGZpYmVyQW1vdW50XG5cdFx0XHRmaWJlckZ1bGxBbW91bnRcblx0XHRcdG1lYXN1cmVVbml0XG5cdFx0XHR0eXBlXG5cdFx0XHRvcmRlclxuXHRcdFx0aXNEZWxldGVkXG5cdFx0XHRpc01vZGlmaWNhYmxlXG5cdFx0XHRjb21wb3NpdGlvblxuXHRcdFx0dmlzaWJsZVxuXHRcdFx0bW9kaWZpZXJcblx0XHRcdHByb21vXG5cdFx0XHRpbWFnZXMge1xuXHRcdFx0XHQuLi5JbWFnZUZyYWdtZW50XG5cdFx0XHR9XG5cdFx0XHRtb2RpZmllcnMge1xuXHRcdFx0XHQuLi5Hcm91cE1vZGlmaWVyRnJhZ21lbnRcblx0XHRcdH1cblx0XHRcdHBhcmVudEdyb3VwIHtcblx0XHRcdFx0aWRcblx0XHRcdH1cblx0XHR9XG5cdFx0JHtJbWFnZUZyYWdtZW50cy5pbWFnZX1cblx0XHQke0dyb3VwTW9kaWZpZXJGcmFnbWVudHMuZ3JvdXBNb2RpZmllcn1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IERpc2hHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXREaXNoZXM6ICgpID0+IGdxbGBcblx0XHRcdHF1ZXJ5IEdldERpc2hlcyB7XG5cdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdGBcblx0fVxufSJdfQ==