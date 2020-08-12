import throttle from 'lodash.throttle';
import React from 'react';
import { Alert, Linking, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import Share from 'react-native-share';
import { Track } from 'react-native-track-player';
import { NavigationInjectedProps } from 'react-navigation';

import I18n from '../../../locales';
import { addFavorite, removeFavorite, setBitRateAndReset } from '../../actions';
import { ContentTypes } from '../../constants';
import { UserState } from '../../store/user/types';
import { typedKeys } from '../../utils';

interface Props extends NavigationInjectedProps {
	track: Track;
	rate: number;
	user: UserState;
	isFavorite: boolean;
	bitRate: string;
	onDownload: () => void;
	onSetRate: () => void;
	onAddFavorite: typeof addFavorite;
	onRemoveFavorite: typeof removeFavorite;
	onPlayVideo: () => void;
	onSetBitRateAndReset: typeof setBitRateAndReset;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 20,
	},
	icon: {
		paddingHorizontal: 15,
	},
	text: {
		fontSize: 20,
		width: 86,
		textAlign: 'center',
		color: '#FFFFFF',
	},
});

const PlayerOptions: React.FC<Props> = ({
	navigation,
	track,
	onDownload,
	rate,
	user,
	isFavorite,
	bitRate,
	onSetRate,
	onAddFavorite,
	onRemoveFavorite,
	onPlayVideo,
	onSetBitRateAndReset,
}) => {
	const logIn = () => {
		Alert.alert(I18n.t('Would_you_like_to_log_in'), '', [
			{
				text: I18n.t('Cancel'),
				onPress: () => {
					//
				},
				style: 'cancel',
			},
			{
				text: I18n.t('Yes'),
				onPress: () => {
					navigation.navigate('Login', { screen: 'Player' });
				},
			},
		]);
	};

	const throttledOnAddFavorite = throttle(onAddFavorite, 5000, { trailing: false });
	const throttledOnRemoveFavorite = throttle(onRemoveFavorite, 5000, { trailing: false });

	const handlePressFavorite = () => {
		if (user) {
			if (!isFavorite) {
				throttledOnAddFavorite(track);
			} else {
				throttledOnRemoveFavorite(track.id);
			}
		} else {
			logIn();
		}
	};

	const handleStreamingQuality = () => {
		const options = [...track.mediaFiles].reverse().map((el) => {
			return el.bitrate + (el.bitrate === bitRate ? ' ✓' : '');
		});
		options.push(I18n.t('Cancel'));

		ActionSheet.showActionSheetWithOptions(
			{
				title: I18n.t('streaming_quality'),
				options: options,
				cancelButtonIndex: options.length - 1,
			},
			(buttonIndex) => {
				if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
					onSetBitRateAndReset(options[buttonIndex]);
				}
			}
		);
	};

	const handleAttachments = () => {
		const options = [];

		for (let i = 0; i < track.attachments.length; i++) {
			options.push(track.attachments[i].filename);
		}

		options.push(I18n.t('Cancel'));

		ActionSheet.showActionSheetWithOptions(
			{
				title: I18n.t('attachments'),
				options: options,
				cancelButtonIndex: options.length - 1,
			},
			(buttonIndex) => {
				if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
					Linking.openURL(track.attachments[buttonIndex].url).catch((err) => console.error(err));
				}
			}
		);
	};

	const handleAddToPlaylist = () => {
		if (user) {
			navigation.navigate({ routeName: 'AddToPlaylist' });
		} else {
			logIn();
		}
	};

	const handleShare = () => {
		// firebase analytics
		firebase.analytics().logEvent('share', {
			content_type: typedKeys(ContentTypes).find((key) => ContentTypes[key] === track.contentType),
			item_id: track.id,
		});
		// share
		const title = `${track.title} – AudioVerse`;
		const url = track.shareUrl;
		const options = Platform.select({
			ios: {
				activityItemSources: [
					{
						// For sharing url with custom title.
						placeholderItem: {
							type: 'text' as const,
							content: title,
						},
						item: {
							default: {
								type: 'url' as const,
								content: url,
							},
							mail: {
								type: 'text' as const,
								content: `${track.title} – ${track.artist}\n\n${url}`,
							},
						},
						subject: {
							default: title,
						},
						linkMetadata: {
							originalUrl: url,
							url,
							title,
						},
					},
				],
			},
			default: {
				url,
				message: I18n.t('share_this_blessing_with_you.'),
				title,
				subject: title,
			},
		});
		StatusBar.setBarStyle('light-content');
		Share.open(options).finally(() => StatusBar.setBarStyle('dark-content'));
	};

	const handleMore = () => {
		const options: string[] = [];

		if (track.mediaFiles && track.mediaFiles.length > 1) {
			options.push(I18n.t('streaming_quality'));
		}

		if (track.contentType === ContentTypes.sermon) {
			options.push(I18n.t('transcript'));
			if (track.attachments && track.attachments.length) {
				options.push(I18n.t('attachments'));
			}
		}

		options.push(I18n.t('Cancel'));

		ActionSheet.showActionSheetWithOptions(
			{
				title: I18n.t('more_options'),
				options: options,
				cancelButtonIndex: options.length - 1,
			},
			(buttonIndex) => {
				if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
					switch (options[buttonIndex]) {
						case I18n.t('streaming_quality'):
							handleStreamingQuality();
							break;
						case I18n.t('transcript'):
							navigation.navigate({ routeName: 'Transcript' });
							break;
						case I18n.t('attachments'):
							handleAttachments();
							break;
					}
				}
			}
		);
	};

	return (
		<View style={styles.container}>
			{(!track.downloadDisabled || track.downloadDisabled === '0') && track.contentType === ContentTypes.sermon && (
				<Button
					icon={{
						type: 'feather',
						name: 'download',
						size: 24,
						color: '#FFFFFF',
					}}
					type="clear"
					containerStyle={styles.icon}
					onPress={onDownload}
					accessibilityLabel={I18n.t('download_file')}
				/>
			)}
			{track.contentType === ContentTypes.sermon && (
				<Button
					icon={{
						type: 'feather',
						name: 'heart',
						size: 24,
						color: isFavorite ? '#E53935' : '#FFFFFF',
					}}
					type="clear"
					containerStyle={styles.icon}
					onPress={handlePressFavorite}
					accessibilityLabel={I18n.t('add_to_favorites')}
				/>
			)}
			{track.videoFiles && track.videoFiles.length > 0 && (
				<Button
					icon={{
						type: 'feather',
						name: 'video',
						size: 24,
						color: '#FFFFFF',
					}}
					type="clear"
					containerStyle={styles.icon}
					onPress={onPlayVideo}
					accessibilityLabel={I18n.t('play_video')}
				/>
			)}
			<Text style={[styles.icon, styles.text]} onPress={onSetRate} accessibilityLabel={I18n.t('select_speed')}>
				{`${rate}X`}
			</Text>
			{track.contentType === ContentTypes.sermon && (
				<Button
					icon={{
						type: 'feather',
						name: 'folder',
						size: 24,
						color: '#FFFFFF',
					}}
					type="clear"
					containerStyle={styles.icon}
					onPress={handleAddToPlaylist}
					accessibilityLabel={I18n.t('add_to_playlists')}
				/>
			)}
			{(track.contentType === ContentTypes.sermon || track.contentType === ContentTypes.book) && track.shareUrl && (
				<Button
					icon={{
						type: 'feather',
						name: 'share-2',
						size: 24,
						color: '#FFFFFF',
					}}
					type="clear"
					containerStyle={styles.icon}
					onPress={handleShare}
					accessibilityLabel={I18n.t('share')}
				/>
			)}
			<Button
				icon={{
					type: 'feather',
					name: 'more-vertical',
					size: 24,
					color: '#FFFFFF',
				}}
				type="clear"
				containerStyle={styles.icon}
				onPress={handleMore}
				accessibilityLabel={I18n.t('more_options')}
			/>
		</View>
	);
};

export default PlayerOptions;
