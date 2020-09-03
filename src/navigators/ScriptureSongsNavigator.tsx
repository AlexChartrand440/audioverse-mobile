import React from 'react';
import { Platform } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import I18n from '../../locales';
import Tags from '../containers/scripturesongs/tags';
import Tag from '../containers/scripturesongs/tags/tag';
import TagsAlbums from '../containers/scripturesongs/tagsAlbums';
import TagAlbum from '../containers/scripturesongs/tagsAlbums/tagAlbum';
import TagsBooks from '../containers/scripturesongs/tagsBooks';
import TagBook from '../containers/scripturesongs/tagsBooks/tagBook';
import TagsSponsors from '../containers/scripturesongs/tagsSponsors';
import TagSponsor from '../containers/scripturesongs/tagsSponsors/tagSponsor';
import { GlobalStyles, headerTintColor } from '../styles';

import TabBarLabel from './tabbarlabel';

interface TabBarLabelProps {
	tintColor: string;
}

const navigationOptionsFunction = ({ navigation }: NavigationInjectedProps) =>
	({
		title: navigation.state.params ? navigation.state.params.title : '',
		headerTitleContainerStyle: {
			width: Platform.OS === 'ios' ? '60%' : '75%',
			alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
		},
		// WORKAROUND: https://github.com/react-navigation/react-navigation/issues/7057#issuecomment-593086348
	} as const);

const ScriptureSongsTab = createMaterialTopTabNavigator(
	{
		TagsBooks: {
			screen: TagsBooks,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="books" />,
			},
		},
		TagsAlbums: {
			screen: TagsAlbums,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="Albums" />,
			},
		},
		TagsSponsors: {
			screen: TagsSponsors,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="sponsors" />,
			},
		},
		Tags: {
			screen: Tags,
			navigationOptions: {
				tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="Tags" />,
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

const ScriptureSongsStack = createStackNavigator(
	{
		ScriptureSongsTab,
		TagBook: {
			screen: TagBook,
			navigationOptions: navigationOptionsFunction,
		},
		TagAlbum: {
			screen: TagAlbum,
			navigationOptions: navigationOptionsFunction,
		},
		TagSponsor: {
			screen: TagSponsor,
			navigationOptions: navigationOptionsFunction,
		},
		Tag: {
			screen: Tag,
			navigationOptions: navigationOptionsFunction,
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
			options.headerBackTitle = I18n.t('Scripture_Songs');
			return options;
		},
	}
);

export default ScriptureSongsStack;
