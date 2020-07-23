import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { TabBar, TabView } from 'react-native-tab-view';
import { Track } from 'react-native-track-player';
import { NavigationInjectedProps, NavigationNavigatorProps } from 'react-navigation';
import SearchLayout from 'react-navigation-addon-search-layout';

import I18n from '../../../locales';
import { resetAndPlayTrack } from '../../actions';
import { Queries } from '../../constants';
import TabBarLabel from '../../navigators/tabbarlabel';
import { LANGUAGE_MAP } from '../../sagas/api';
import * as services from '../../services';
import { GlobalStylesheet } from '../../styles';
import { useTheme } from '../../styles/theme';
import { parseRecording } from '../../utils';

interface Item {
	[key: string]: any;
}

interface SearchResult {
	sermons: {
		nodes: Track[];
	};
	presenters: {
		nodes: Item[];
	};
	conferences: {
		nodes: Item[];
	};
	serieses: {
		nodes: Item[];
	};
	sponsors: {
		nodes: Item[];
	};
}

interface Props extends NavigationInjectedProps {
	actions: {
		resetAndPlayTrack: typeof resetAndPlayTrack;
	};
	language: keyof typeof LANGUAGE_MAP;
}

interface ResultsRouteI {
	data: any[];
	renderItem: ListRenderItem<Item>;
	onRefresh?: () => void;
}

const ResultsRoute: React.FC<ResultsRouteI> = ({ data, renderItem, onRefresh }) => {
	return (
		<FlatList
			renderItem={renderItem}
			data={data}
			keyExtractor={(item) => item.id}
			refreshing={false}
			onRefresh={onRefresh}
		/>
	);
};

const Search: React.FC<Props> & NavigationNavigatorProps = ({ navigation, actions, language }) => {
	const { styles, theme } = useTheme(GlobalStylesheet);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [presentations, setPresentations] = useState([] as Track[]);
	const [presenters, setPresenters] = useState([] as Item[]);
	const [conferences, setConferences] = useState([] as Item[]);
	const [series, setSeries] = useState([] as Item[]);
	const [sponsors, setSponsors] = useState([] as Item[]);
	const [tabViewNavigationState, setTabViewNavigationState] = useState({
		index: 0,
		routes: [
			{ key: 'presentations', title: 'presentations' },
			{ key: 'presenters', title: 'presenters' },
			{ key: 'conferences', title: 'conferences' },
			{ key: 'series', title: 'series' },
			{ key: 'sponsors', title: 'sponsors' },
		],
	});

	const handleSearch = async () => {
		if (search.trim() !== '') {
			// firebase analytics
			firebase.analytics().logEvent('search', { search_term: search });
			// search
			try {
				setLoading(true);
				const response = await services.fetchGraphQLData(
					Queries.search,
					{ language: LANGUAGE_MAP[language], term: search },
					(results) => ({ nodes: results })
				);
				setLoading(false);
				const data: SearchResult = response.result;
				setPresentations(data.sermons.nodes.map((item: any) => parseRecording(item)));
				setPresenters(data.presenters.nodes);
				setConferences(data.conferences.nodes);
				setSeries(data.serieses.nodes);
				setSponsors(data.sponsors.nodes);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		}
	};

	const renderPresentationItem: ListRenderItem<Item> = ({ item }) => (
		<ListItem
			leftAvatar={{
				source: item.artwork && item.artwork.toString().startsWith('http') ? { uri: item.artwork } : item.artwork,
			}}
			title={item.title}
			titleProps={{ numberOfLines: 1 }}
			subtitle={item.artist + ' \u00B7 ' + item.durationFormatted}
			onPress={() => actions.resetAndPlayTrack([item])}
			bottomDivider
		/>
	);

	const renderPresenterItem: ListRenderItem<Item> = ({ item }) => (
		<ListItem
			leftAvatar={{
				source: { uri: item.photo.url },
			}}
			title={item.name}
			onPress={() => {
				navigation.navigate({
					routeName: 'Presenter',
					params: {
						url: item.id,
						title: item.name,
						description: item.description,
						image: item.photo && item.photo.url,
					},
				});
			}}
			bottomDivider
		/>
	);

	const renderConferenceItem: ListRenderItem<Item> = ({ item }) => (
		<ListItem
			leftAvatar={{
				source: { uri: item.logoImage.url },
			}}
			title={item.title}
			onPress={() => navigation.navigate({ routeName: 'Conference', params: { url: item.id, title: item.title } })}
			bottomDivider
		/>
	);

	const renderSerieItem: ListRenderItem<Item> = ({ item }) => (
		<ListItem
			leftAvatar={{
				source: { uri: item.logoImage.url },
			}}
			title={item.title}
			onPress={() => navigation.navigate({ routeName: 'Serie', params: { url: item.id, title: item.title } })}
			bottomDivider
		/>
	);

	const renderSponsorItem: ListRenderItem<Item> = ({ item }) => (
		<ListItem
			leftAvatar={{
				source: { uri: item.logoImage.url },
			}}
			title={item.title}
			onPress={() => navigation.navigate({ routeName: 'Sponsor', params: { url: item.id, title: item.title } })}
			bottomDivider
		/>
	);

	return (
		<SearchLayout
			headerBackgroundColor={theme.isDark ? theme.grey950 : theme.primary}
			onChangeQuery={setSearch}
			onSubmit={handleSearch}
			cancelButtonText={I18n.t('Cancel')}
			headerTintColor={theme.white}
		>
			{loading && <ActivityIndicator size="large" color="#03A9F4" style={{ marginTop: 10 }} />}
			{!loading && (
				<TabView
					navigationState={tabViewNavigationState}
					renderScene={({ route }) => {
						switch (route.key) {
							case 'presentations':
								return (
									<ResultsRoute data={presentations} renderItem={renderPresentationItem} onRefresh={handleSearch} />
								);
							case 'presenters':
								return <ResultsRoute data={presenters} renderItem={renderPresenterItem} onRefresh={handleSearch} />;
							case 'conferences':
								return <ResultsRoute data={conferences} renderItem={renderConferenceItem} onRefresh={handleSearch} />;
							case 'series':
								return <ResultsRoute data={series} renderItem={renderSerieItem} onRefresh={handleSearch} />;
							case 'sponsors':
								return <ResultsRoute data={sponsors} renderItem={renderSponsorItem} onRefresh={handleSearch} />;
						}
					}}
					renderTabBar={(props) => (
						<TabBar
							{...props}
							indicatorStyle={styles.tabIndicator}
							style={styles.tab}
							scrollEnabled={true}
							renderLabel={({ route, focused, color }) => <TabBarLabel tintColor={color} title={route.title} />}
						/>
					)}
					onIndexChange={(index) => setTabViewNavigationState({ ...tabViewNavigationState, index })}
					initialLayout={{ width: Dimensions.get('window').width }}
				/>
			)}
		</SearchLayout>
	);
};

Search.navigationOptions = () => ({
	headerShown: false,
});

export default Search;
