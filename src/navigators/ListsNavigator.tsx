import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import I18n from '../../locales';
import Favorites from '../containers/lists/favorites';
import History from '../containers/lists/history';
import Playlists from '../containers/lists/playlists';
import PlaylistItems from '../containers/lists/playlists/playlistitems';
import { GlobalStyles, headerTintColor } from '../styles';

import HeaderRight from './HeaderRight';
import HeaderTitle from './headertitle';
import TabBarLabel from './tabbarlabel';

interface TabBarLabelProps {
	tintColor: string;
}

const ListsTab = createMaterialTopTabNavigator(
	{
		Favorites: {
			screen: Favorites,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="favorites" />,
			},
		},
		Playlists: {
			screen: Playlists,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="playlists" />,
			},
		},
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="history" />,
			},
		},
	},
	{
		lazy: true,
		tabBarOptions: {
			style: GlobalStyles.tab,
			scrollEnabled: true,
			indicatorStyle: GlobalStyles.tabIndicator,
		},
	}
);

const Navigator = createStackNavigator(
	{
		ListsTab: {
			screen: ListsTab,
			navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
				headerTitle: () => <HeaderTitle title="my_lists" />,
				headerRight: () => <HeaderRight navigation={navigation} />,
			}),
		},
		PlaylistItems: {
			screen: PlaylistItems,
			navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
				headerBackTitle: I18n.t('playlists'),
				title: navigation.state.params ? navigation.state.params.title : '',
			}),
		},
	},
	{
		defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => {
			const options: { [key: string]: any } = {
				headerStyle: GlobalStyles.header,
				headerTintColor: headerTintColor,
			};
			if (navigation.state.index !== undefined) {
				options.headerShown = false;
			}
			return options;
		},
	}
);

export default Navigator;
