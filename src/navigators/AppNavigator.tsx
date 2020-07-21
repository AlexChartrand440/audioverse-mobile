import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator, NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Loading from '../containers/auth/loading';
import Login from '../containers/auth/login';
import Post from '../containers/blog/post';
import Conference from '../containers/conferences/conference';
import Discover from '../containers/discover';
import AddToPlaylist from '../containers/lists/playlists/addtoplaylist';
import NewPlaylist from '../containers/lists/playlists/newplaylist';
import Player from '../containers/player';
import Transcript from '../containers/player/transcript';
import VideoPlayer from '../containers/player/Video';
import Presenter from '../containers/presenters/presenter';
import Serie from '../containers/series/serie';
import Sponsor from '../containers/sponsors/sponsor';
import withPlayer from '../HOCs/withPlayer';
import { GlobalStyles, headerTintColor, primaryColor } from '../styles';

import BibleNavigator from './BibleNavigator';
import BooksNavigator from './BooksNavigator';
import BottomTabBarLabel from './bottomtabbarlabel';
import HeaderRight from './HeaderRight';
import HeaderTitle from './headertitle';
import MenuNavigator from './MenuNavigator';
import { navigationOptionsFunction } from './MenuNavigator';
import PresentationsNavigator from './PresentationsNavigator';
import SearchNavigator from './SearchNavigator';

const DiscoverNavigator = createStackNavigator(
	{
		Discover,
		SearchNavigator,
		Post,
		Conference,
		Sponsor,
		Serie,
	},
	{
		defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => ({
			headerStyle: GlobalStyles.header,
			headerTintColor: headerTintColor,
			headerTitle: () => <HeaderTitle title="discover" />,
			headerRight: () => <HeaderRight navigation={navigation} />,
		}),
	}
);

const WithPlayerPresentationsNavigator = withPlayer(PresentationsNavigator);
const WithPlayerDiscoverNavigator = withPlayer(DiscoverNavigator);
const WithPlayerBibleNavigator = withPlayer(BibleNavigator);
const WithPlayerBooksNavigator = withPlayer(BooksNavigator);
const WithPlayerMenuNavigator = withPlayer(MenuNavigator);

const screenNavigationOptions = (title: string, icon: string) => ({
	tabBarIcon: ({ focused, horizontal, tintColor }: { [key: string]: any }) => {
		return <Icon type="feather" name={icon} size={25} color={tintColor} />;
	},
	renderLabel: ({ tintColor }: { [key: string]: any }) => {
		return <BottomTabBarLabel tintColor={tintColor} title={title} />;
	},
});

const BottomTabNavigator = createBottomTabNavigator(
	{
		Presentations: {
			screen: WithPlayerPresentationsNavigator,
			navigationOptions: screenNavigationOptions('home', 'home'),
		},
		Discover: {
			screen: WithPlayerDiscoverNavigator,
			navigationOptions: screenNavigationOptions('discover', 'grid'),
		},
		Bible: {
			screen: WithPlayerBibleNavigator,
			navigationOptions: screenNavigationOptions('bible', 'book'),
		},
		Books: {
			screen: WithPlayerBooksNavigator,
			navigationOptions: screenNavigationOptions('books', 'book-open'),
		},
		Menu: {
			screen: WithPlayerMenuNavigator,
			navigationOptions: screenNavigationOptions('menu', 'menu'),
		},
	},
	{
		tabBarOptions: {
			activeTintColor: primaryColor,
		},
	}
);

const PlayerStackNavigator = createStackNavigator(
	{
		Player: {
			screen: Player,
			navigationOptions: {
				headerShown: false,
			},
		},
		Transcript,
		Sponsor: {
			screen: Sponsor,
			navigationOptions: navigationOptionsFunction,
		},
		Presenter: {
			screen: Presenter,
			navigationOptions: navigationOptionsFunction,
		},
		Conference: {
			screen: Conference,
			navigationOptions: navigationOptionsFunction,
		},
		Serie: {
			screen: Serie,
			navigationOptions: navigationOptionsFunction,
		},
	},
	{
		defaultNavigationOptions: {
			headerStyle: GlobalStyles.header,
			headerTintColor: headerTintColor,
		},
	}
);

const StackModalNavigator = createStackNavigator(
	{
		Home: BottomTabNavigator,
		Player: PlayerStackNavigator,
		VideoPlayer,
		AddToPlaylist,
		NewPlaylist,
	},
	{
		mode: 'modal',
		headerMode: 'none',
		defaultNavigationOptions: {
			gestureEnabled: true,
			cardStyle: { backgroundColor: 'transparent' },
			...TransitionPresets.ModalSlideFromBottomIOS,
		},
	}
);

const AppNavigator = createSwitchNavigator({
	Loading,
	Login,
	StackModalNavigator,
});

export default createAppContainer(AppNavigator);
