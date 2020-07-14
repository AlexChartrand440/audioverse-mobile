import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationInjectedProps } from 'react-navigation'

import { GlobalStyles, headerTintColor } from '../styles'
import Menu from '../containers/menu'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import Downloads from '../containers/lists/downloads'
import MyListsNavigator from './ListsNavigator'
import BibleNavigator from './BibleNavigator'
import BooksNavigator from './BooksNavigator'
import ScriptureSongsNavigator from './ScriptureSongsNavigator'
import Stories from '../containers/stories'
import Story from '../containers/stories/story'
import Presenters from '../containers/presenters'
import Presenter from '../containers/presenters/presenter'
import Conferences from '../containers/conferences'
import Conference from '../containers/conferences/conference'
import Sponsors from '../containers/sponsors'
import Sponsor from '../containers/sponsors/sponsor'
import Series from '../containers/series'
import Serie from '../containers/series/serie'
import Topics from '../containers/topics'
import Topic from '../containers/topics/topic'
import DownloadsQueue from '../containers/downloadsqueue'
import Settings from '../containers/settings'
import About from '../containers/about'
import SearchNavigator from './SearchNavigator'

MyListsNavigator.params = {
  title: 'my_lists',
}
MyListsNavigator.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const options: {[key: string]: any} = {}
  if (navigation.state.index > 0) {
    options.headerShown = false
  }
  return options
}

BibleNavigator.params = {
  title: 'bible',
  showBackButton: true,
}
BibleNavigator.navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
  headerShown: false,
})

BooksNavigator.params = {
  title: 'books',
  showBackButton: true,
}
BooksNavigator.navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
  headerShown: false,
})

ScriptureSongsNavigator.params = {
  title: 'Scripture_Songs',
}
ScriptureSongsNavigator.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const options: {[key: string]: any} = {}
  if (navigation.state.index > 0) {
    options.headerShown = false
  }
  return options
}

export const navigationOptionsFunction = ({ navigation }: NavigationInjectedProps) => ({
  headerTitle: navigation.state.params ? navigation.state.params.title  : '',
  title: navigation.state.params ? navigation.state.params.title  : '',
  headerTitleContainerStyle: {
    width: Platform.OS === 'ios' ? '60%' : '75%',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  }
  // WORKAROUND: https://github.com/react-navigation/react-navigation/issues/7057#issuecomment-593086348
})

const Navigator = createStackNavigator({
  Menu: {
    screen: Menu,
    params: {
      title: 'menu',
    },
  },
  Downloads: {
    screen: Downloads,
    params: {
      title: 'downloads',
    },
  },
  MyLists: MyListsNavigator,
  Bible: BibleNavigator,
  Books: BooksNavigator,
  ScriptureSongs: ScriptureSongsNavigator,
  Stories: {
    screen: Stories,
    params: {
      title: 'stories',
    },
  },
  Story: {
    screen: Story,
    navigationOptions: navigationOptionsFunction,
  },
  Presenters: {
    screen: Presenters,
    params: {
      title: 'presenters',
    },
  },
  Presenter: {
    screen: Presenter,
    navigationOptions: navigationOptionsFunction,
  },
  Conferences: {
    screen: Conferences,
    params: {
      title: 'conferences',
    },
  },
  Conference: {
    screen: Conference,
    navigationOptions: navigationOptionsFunction,
  },
  Sponsors: {
    screen: Sponsors,
    params: {
      title: 'sponsors',
    },
  },
  Sponsor: {
    screen: Sponsor,
    navigationOptions: navigationOptionsFunction,
  },
  Series: {
    screen: Series,
    params: {
      title: 'series',
    },
  },
  Serie: {
    screen: Serie,
    navigationOptions: navigationOptionsFunction,
  },
  Topics: {
    screen: Topics,
    params: {
      title: 'topics',
    },
  },
  Topic: {
    screen: Topic,
    navigationOptions: navigationOptionsFunction,
  },
  DownloadsQueue: {
    screen: DownloadsQueue,
    params: {
      title: 'download_queue',
    },
  },
  Settings: {
    screen: Settings,
    params: {
      title: 'settings',
    },
  },
  About: {
    screen: About,
    params: {
      title: 'about',
    },
  },
  SearchNavigator,
}, {
  defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: () => <HeaderTitle title={navigation.state.params ? navigation.state.params.title : ''} />,
    headerRight: () => <HeaderRight navigation={navigation} />,
  }),
})

export default Navigator
