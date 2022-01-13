import { gql } from 'apollo-angular';

export const ImageFragments = {
	image: gql`
		fragment ImageFragment on Image {
			id
			uploadDate
			images
		}
	`
};
