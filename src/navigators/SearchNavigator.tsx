import React from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Conference from '../containers/conferences/conference'
import Presenter from '../containers/presenters/presenter'
import Search from '../containers/search'
import Serie from '../containers/series/serie'
import Sponsor from '../containers/sponsors/sponsor'
import { GlobalStyles, headerTintColor } from '../styles'

const Navigator = createStackNavigator({
  Search,
  Presenter,
  Conference,
  Sponsor,
  Serie,
}, {
  navigationOptions: {
    headerShown: false,
  },
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
  },
})

export default Navigator
