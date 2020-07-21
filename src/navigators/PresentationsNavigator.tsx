import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Featured from '../containers/recordings/featured';
import New from '../containers/recordings/new';
import Trending from '../containers/recordings/trending';
import { GlobalStyles, headerTintColor } from '../styles';

import HeaderRight from './HeaderRight';
import HeaderTitle from './headertitle';
import SearchNavigator from './SearchNavigator';
import TabBarLabel from './tabbarlabel';

interface TabBarLabelProps {
	tintColor: string;
}

const PresentationsTabNavigator = createMaterialTopTabNavigator(
	{
		New: {
			screen: New,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => (
					<TabBarLabel tintColor={tintColor} title="new_presentations" />
				),
			},
		},
		Trendings: {
			screen: Trending,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => (
					<TabBarLabel tintColor={tintColor} title="trending_presentations" />
				),
			},
		},
		Featured: {
			screen: Featured,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => (
					<TabBarLabel tintColor={tintColor} title="featured_presentations" />
				),
			},
		},
	},
	{
		lazy: true,
		tabBarOptions: {
			style: GlobalStyles.tab,
			indicatorStyle: GlobalStyles.tabIndicator,
		},
	}
);

const Navigator = createStackNavigator(
	{
		PresentationsTabNavigator,
		SearchNavigator,
	},
	{
		defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => ({
			headerStyle: GlobalStyles.header,
			headerTintColor: headerTintColor,
			headerTitle: () => <HeaderTitle title="presentations" />,
			headerRight: () => <HeaderRight navigation={navigation} />,
		}),
	}
);

export default Navigator;
