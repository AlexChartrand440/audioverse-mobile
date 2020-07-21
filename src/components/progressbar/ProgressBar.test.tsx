import React from 'react'
import renderer from 'react-test-renderer'

import ProgressBar from './ProgressBar'


test('renders correctly', () => {
  const tree = renderer.create(<ProgressBar rate={1} />).toJSON()
  expect(tree).toMatchSnapshot()
})
