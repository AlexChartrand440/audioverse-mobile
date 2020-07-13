import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationInjectedProps } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import { GlobalStyles, headerTintColor } from '../styles'
import Tags from '../containers/scripturesongs/tags'
import Tag from '../containers/scripturesongs/tags/tag'
import TagsBooks from '../containers/scripturesongs/tagsBooks'
import TagBook from '../containers/scripturesongs/tagsBooks/tagBook'
import TagsAlbums from '../containers/scripturesongs/tagsAlbums'
import TagAlbum from '../containers/scripturesongs/tagsAlbums/tagAlbum'
import TagsSponsors from '../containers/scripturesongs/tagsSponsors'
import TagSponsor from '../containers/scripturesongs/tagsSponsors/tagSponsor'
import { navigationOptionsFunction } from './MenuNavigator'
import I18n from '../../locales'

interface TabBarLabelProps {
  tintColor: string
}

const ScriptureSongsTab = createMaterialTopTabNavigator({
  TagsBooks: {
    screen: TagsBooks,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="books" />
    }
  },
  TagsAlbums: {
    screen: TagsAlbums,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="Albums" />
    }
  },
  TagsSponsors: {
    screen: TagsSponsors,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="sponsors" />
    }
  },
  Tags: {
    screen: Tags,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="Tags" />
    }
  },
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    scrollEnabled: true,
    indicatorStyle: GlobalStyles.tabIndicator,
  },
})

const ScriptureSongsStack = createStackNavigator({
  ScriptureSongsTab,
  TagBook: {
    screen: TagBook,
    navigationOptions: navigationOptionsFunction
  },
  TagAlbum: {
    screen: TagAlbum,
    navigationOptions: navigationOptionsFunction
  },
  TagSponsor: {
    screen: TagSponsor,
    navigationOptions: navigationOptionsFunction
  },
  Tag: {
    screen: Tag,
    navigationOptions: navigationOptionsFunction
  }
}, {
  defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => {
    const options: {[key: string]: any}  = {
      headerStyle: GlobalStyles.header,
      headerTintColor: headerTintColor,
    }
    if (navigation.state.index !== undefined) {
      options.headerShown = false
    }
    options.headerBackTitle = I18n.t('Scripture_Songs')
    return options
  },
})

export default ScriptureSongsStack
