import React, { useState } from 'react';
import { ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import { Button, ListItem } from 'react-native-elements';
import { Track } from 'react-native-track-player';
import { NavigationInjectedProps } from 'react-navigation';

import imageBg from '../../../assets/bg.png';
import I18n from '../../../locales';
import {
	addFavorite,
	download,
	forward,
	playPause,
	playVideo,
	removeFavorite,
	replay,
	setBitRateAndReset,
	setRate,
	skipToNext,
	skipToPrevious,
} from '../../actions';
import ProgressBar from '../../components/progressbar/ProgressBar';
import { Dirs } from '../../constants';
import { UserState } from '../../store/user/types';

import PlayerContent from './PlayerContent';
import PlayerControls from './PlayerControls';
import PlayerOptions from './PlayerOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MarqueeText: any = require('react-native-marquee').default;

const getSize = (size: string) => (parseInt(size) > 0 ? `${Math.round(parseInt(size) / 8 / 100000)} MB` : '');

interface Bitrate {
	[key: string]: any;
}

interface Props extends NavigationInjectedProps {
	track: Track | undefined;
	rate: number;
	language: string;
	user: UserState;
	actions: {
		playPause: typeof playPause;
		skipToPrevious: typeof skipToPrevious;
		skipToNext: typeof skipToNext;
		replay: typeof replay;
		forward: typeof forward;
		download: typeof download;
		setRate: typeof setRate;
		addFavorite: typeof addFavorite;
		removeFavorite: typeof removeFavorite;
		playVideo: typeof playVideo;
		setBitRateAndReset: typeof setBitRateAndReset;
	};
	isFavorite: boolean;
	bitRate: string;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#DDDDDD',
	},
	bar: {
		elevation: 2,
		borderTopWidth: Platform.OS === 'ios' ? 30 : 0,
		borderTopColor: '#E0E0E080',
		borderBottomWidth: 1,
		borderBottomColor: '#CCCCCC',
	},
	title: {
		fontSize: Platform.OS === 'ios' ? 17 : 16,
	},
	bottomContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

const Player: React.FC<Props> = ({ navigation, track, rate, language, user, actions, isFavorite, bitRate }) => {
	const handleDownload = () => {
		const bitratesIndex: Bitrate[] = [];
		const options: string[] = [];

		if (!track) return;

		// audio
		for (let i = track.mediaFiles.length - 1; i >= 0; i--) {
			bitratesIndex.push(track.mediaFiles[i]);
			options.push(`${track.mediaFiles[i].bitrate} kbps - ${getSize(track.mediaFiles[i].filesize)}`);
		}

		// video
		if (track.videoFiles.length) {
			for (let i = track.videoFiles.length - 1; i >= 0; i--) {
				if (track.videoFiles[i].container !== 'm3u8_ios') {
					bitratesIndex.push(track.videoFiles[i]);
					options.push(
						`MP4 (${track.videoFiles[i].width} x ${track.videoFiles[i].height}) - ${getSize(
							track.videoFiles[i].filesize
						)}`
					);
				}
			}
		}

		options.push(I18n.t('Cancel', { locale: language }));

		ActionSheet.showActionSheetWithOptions(
			{
				title: I18n.t('Select_a_bitrate_to_download', { locale: language }),
				options: options,
				cancelButtonIndex: options.length - 1,
			},
			(buttonIndex) => {
				if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
					actions.download(
						track,
						Dirs.presentations,
						bitratesIndex[buttonIndex].downloadURL,
						bitratesIndex[buttonIndex].filename,
						bitratesIndex[buttonIndex].bitrate
					);
				}
			}
		);
	};

	const handleOnSetRate = () => {
		const options = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2', I18n.t('Cancel', { locale: language })];
		ActionSheet.showActionSheetWithOptions(
			{
				options: options,
				cancelButtonIndex: options.length - 1,
			},
			(buttonIndex) => {
				if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
					actions.setRate(parseFloat(options[buttonIndex]));
				}
			}
		);
	};

	const handlePlayVideo = () => {
		if (track) {
			actions.playVideo(track);
		}
	};

	const [showLightStatusBar, setShowLightStatusBar] = useState(true);

	const leavePlayer = () => {
		setShowLightStatusBar(false);
		(navigation as any).pop();
	};

	if (!track) {
		return <View />;
	}

	const rightElement = (
		<Button
			icon={{
				type: 'feather',
				name: 'chevron-down',
				size: 42,
			}}
			buttonStyle={{ padding: 0 }}
			type="clear"
			onPress={leavePlayer}
			accessibilityLabel={I18n.t('minimize_player')}
		/>
	);

	return (
		<ImageBackground source={imageBg} style={styles.container}>
			{showLightStatusBar ? <StatusBar barStyle="default" animated /> : null}
			<View style={styles.bar}>
				<ListItem
					leftAvatar={{
						source:
							track.artwork && track.artwork.toString().startsWith('http')
								? { uri: track.artwork }
								: (track.artwork as any),
					}}
					title={
						<MarqueeText
							marqueeOnStart
							duration={3500}
							loop
							style={styles.title}
							accessibilityHint={I18n.t('maximize_player')}
						>
							{track.title}
						</MarqueeText>
					}
					subtitle={track.artist}
					subtitleProps={{ numberOfLines: 1 }}
					rightElement={rightElement}
					containerStyle={{ backgroundColor: '#E0E0E080' }}
					onPress={leavePlayer}
					underlayColor="#E0E0E080"
				/>
			</View>
			<PlayerContent data={track} language={language} navigation={navigation} />
			<PlayerOptions
				navigation={navigation}
				track={track}
				onDownload={handleDownload}
				rate={rate}
				user={user}
				isFavorite={isFavorite}
				bitRate={bitRate}
				onSetRate={handleOnSetRate}
				onAddFavorite={actions.addFavorite}
				onRemoveFavorite={actions.removeFavorite}
				onPlayVideo={handlePlayVideo}
				onSetBitRateAndReset={actions.setBitRateAndReset}
			/>
			<View style={styles.bottomContainer}>
				<ProgressBar rate={rate} />
				<PlayerControls
					playPause={actions.playPause}
					skipToPrevious={actions.skipToPrevious}
					skipToNext={actions.skipToNext}
					replay={actions.replay}
					forward={actions.forward}
				/>
			</View>
		</ImageBackground>
	);
};

export default Player;
