import React from 'react';
import { Platform } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Conference from '../containers/conferences/conference';
import Presenter from '../containers/presenters/presenter';
import Search from '../containers/search';
import Serie from '../containers/series/serie';
import Sponsor from '../containers/sponsors/sponsor';
import { GlobalStyles, headerTintColor } from '../styles';

export const navigationOptionsFunction = ({ navigation }: NavigationInjectedProps) => ({
	headerTitle: navigation.state.params ? navigation.state.params.title : '',
	title: navigation.state.params ? navigation.state.params.title : '',
	headerTitleContainerStyle: {
		width: Platform.OS === 'ios' ? '60%' : '75%',
		alignItems: Platform.OS === 'ios' ? ('center' as const) : ('flex-start' as const),
	},
	// WORKAROUND: https://github.com/react-navigation/react-navigation/issues/7057#issuecomment-593086348
});

const Navigator = createStackNavigator(
	{
		Search,
		Presenter: {
			screen: Presenter,
			navigationOptions: navigationOptionsFunction,
		},
		Conference: {
			screen: Conference,
			navigationOptions: navigationOptionsFunction,
		},
		Sponsor: {
			screen: Sponsor,
			navigationOptions: navigationOptionsFunction,
		},
		Serie: {
			screen: Serie,
			navigationOptions: navigationOptionsFunction,
		},
	},
	{
		navigationOptions: {
			headerShown: false,
		},
		defaultNavigationOptions: {
			headerStyle: GlobalStyles.header,
			headerTintColor: headerTintColor,
		},
	}
);

export default Navigator;
