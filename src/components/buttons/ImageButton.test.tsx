import React from 'react';
import renderer from 'react-test-renderer';

import { defaultImage } from '../../styles';

import ImageButton from './ImageButton';

test('renders correctly', () => {
	const tree = renderer
		.create(
			<ImageButton
				onPress={() => {
					//
				}}
				source={defaultImage}
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
