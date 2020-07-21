import React from 'react';
import renderer from 'react-test-renderer';

import ProgressBarMini from './ProgressBarMini';

test('renders correctly', () => {
	const tree = renderer.create(<ProgressBarMini />).toJSON();
	expect(tree).toMatchSnapshot();
});
