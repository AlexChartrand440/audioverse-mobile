import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { Track } from 'react-native-track-player';
import { NavigationInjectedProps } from 'react-navigation';

import { PaginationState } from '../../store/paginate';
import { defaultImage, HTMLStyles } from '../../styles';

interface Item {
	[key: string]: any;
}

interface Props extends NavigationInjectedProps {
	items: any[];
	pagination: PaginationState;
	renderItem?: ListRenderItem<Item>;
	keyExtractor?: (item: Item) => string;
	avatarExtractor?: (item: Item) => string;
	titleExtractor?: (item: Item) => string;
	subtitleExtractor?: (item: Item) => string;
	playlist?: boolean;
	onPress?: (item: Item) => void;
	localActions: {
		resetAndPlayTrack: (tracks: Track[], id: string | null) => void;
	};
	actions: {
		loadData: (loadMore: boolean, refresh: boolean, url: string, id: string) => void;
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		padding: 20,
		backgroundColor: '#CCCCCC50',
		textAlign: 'center',
	},
	headerImageContainer: {
		alignItems: 'center',
	},
	headerImage: {
		width: 128,
		height: 128,
		borderRadius: 64,
	},
	headerText: {
		textAlign: 'justify',
		marginTop: 10,
	},
});

export const List: React.FC<Props> = ({
	navigation,
	items,
	pagination,
	renderItem,
	keyExtractor = (item) => item.id,
	avatarExtractor = (item) => item.artwork,
	titleExtractor = (item) => item.title,
	subtitleExtractor = (item) => item.artist + ' \u00B7 ' + item.durationFormatted,
	onPress,
	playlist = false,
	localActions,
	actions,
}) => {
	const onEndReachedCalledDuringMomentumRef = useRef(true);
	const _flatListRef = useRef<FlatList>(null);

	const [isFetching, setIsFetching] = useState(pagination.isFetching);
	if (pagination.isFetching !== isFetching) {
		setIsFetching(pagination.isFetching);
	}
	if (!pagination.isFetching) {
		setTimeout(() => _flatListRef.current?.flashScrollIndicators(), 0);
	}

	useEffect(() => {
		const { url, id } = navigation.state.params || { url: null, id: null };
		actions.loadData(false, false, url, id);
	}, []);

	if (!items.length && pagination.isFetching) {
		return <ActivityIndicator size="large" color="#03A9F4" style={{ margin: 50 }} />;
	}

	const handleEndReached = () => {
		console.log('end reached!!', onEndReachedCalledDuringMomentumRef.current);
		const shouldLoadMore = !!(!onEndReachedCalledDuringMomentumRef.current && pagination && pagination.nextAfterCursor);
		if (shouldLoadMore) {
			onEndReachedCalledDuringMomentumRef.current = true;
			const { url, id } = navigation.state.params || { url: null, id: null };
			actions.loadData(true, false, url, id);
		}
	};

	const handleRefresh = () => {
		const { url, id } = navigation.state.params || { url: null, id: null };
		actions.loadData(false, true, url, id);
	};

	const avatar = (item: Item) => {
		const avatar = avatarExtractor(item);
		return {
			source: avatar && avatar.toString().startsWith('http') ? { uri: avatar } : avatar ? avatar : defaultImage,
		};
	};

	const handlePress = (item: Item) => {
		if (onPress) {
			onPress(item);
		} else {
			if (playlist) {
				localActions.resetAndPlayTrack(items, item.id);
			} else {
				localActions.resetAndPlayTrack([item as Track], null);
			}
		}
	};

	const localRenderItem: ListRenderItem<Item> = ({ item }) => {
		return (
			<ListItem
				leftAvatar={avatar(item)}
				title={titleExtractor(item)}
				titleProps={{ numberOfLines: 1 }}
				subtitle={subtitleExtractor(item)}
				onPress={() => handlePress(item)}
				bottomDivider
			/>
		);
	};

	const { image, description } = navigation.state.params || { image: null, description: null };
	const Header = description ? (
		<View style={styles.headerContainer}>
			<View style={styles.headerImageContainer}>
				{image ? <Image style={styles.headerImage} source={{ uri: image }} /> : null}
			</View>
			<View style={styles.headerText}>
				<HTML html={description} tagsStyles={HTMLStyles} />
			</View>
		</View>
	) : null;

	const renderFooter = () => {
		return (
			<View>
				{pagination.nextAfterCursor ? (
					<ActivityIndicator color="black" style={{ margin: 15, marginBottom: 30 }} />
				) : null}
			</View>
		);
	};

	return (
		<View style={styles.container} testID="list-container">
			<FlatList
				ref={_flatListRef}
				ListHeaderComponent={Header}
				data={items}
				renderItem={renderItem || localRenderItem}
				keyExtractor={keyExtractor}
				refreshing={pagination.isFetching}
				onRefresh={handleRefresh}
				onEndReachedThreshold={0.5}
				onEndReached={handleEndReached}
				onMomentumScrollBegin={() => {
					onEndReachedCalledDuringMomentumRef.current = false;
				}}
				ListFooterComponent={renderFooter}
			/>
		</View>
	);
};

export default List;
