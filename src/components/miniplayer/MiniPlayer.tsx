import React, { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import {
	Event as PlayerEvent,
	State as PlayerState,
	Track,
	usePlaybackState,
	useTrackPlayerEvents,
} from 'react-native-track-player';
import { NavigationInjectedProps } from 'react-navigation';

import iconPlay from '../../../assets/ic_play.png';
import iconPause from '../../../assets/pause.png';
import I18n from '../../../locales';
import data from '../../constants/prompts';
import ImageButton from '../buttons/ImageButton';
import ProgressBarMini from '../progressbar/ProgressBarMini';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MarqueeText: any = require('react-native-marquee').default;

interface Props extends NavigationInjectedProps {
	track: Track | undefined;
	actions: {
		playPause: () => void;
	};
}

const styles = StyleSheet.create({
	container: {
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: '#000000',
		shadowOffset: { height: 0, width: 0 },
		elevation: 2,
		backgroundColor: '#E0E0E0',
	},
	playPause: {
		height: 42,
		width: 42,
		tintColor: '#000000',
	},
	title: {
		fontSize: Platform.OS === 'ios' ? 17 : 16,
	},
});

const MiniPlayer: React.FC<Props> = ({ navigation, track, actions }) => {
	const playbackState = usePlaybackState();
	const [loading, setLoading] = useState(false);
	// on iOS the Media Player library that we are using does not
	// enter the loading state until it has loaded/buffered the mp3 file, however
	// in order to let the user know that the file is being loaded we are
	// using our own loading state, it is set to true when the a track is changed
	// and is set to false when the playback-state change.
	useTrackPlayerEvents([PlayerEvent.PlaybackTrackChanged], (data) => {
		if (Platform.OS === 'ios' && data.nextTrack) {
			setLoading(true); // show activity indicator
		}
	});

	useTrackPlayerEvents([PlayerEvent.PlaybackState], (event) => {
		if (event.state === PlayerState.Playing && loading) {
			setLoading(false); // hide activity indicator
		}
	});

	if (!track) {
		return null;
	}

	const handlePress = () => {
		navigation.navigate({ routeName: 'Player' });
	};
	const isLoading = loading || playbackState === PlayerState.Buffering;
	const rightElement = isLoading ? (
		<ActivityIndicator size="large" color="black" />
	) : (
		<ImageButton
			source={playbackState === PlayerState.Playing ? iconPause : iconPlay}
			imageStyle={styles.playPause}
			onPress={actions.playPause}
			accessibilityLabel={I18n.t(playbackState === PlayerState.Playing ? 'pause' : 'play')}
		/>
	);

	return (
		<View style={styles.container} testID="mini-player">
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
						accessibilityHint={I18n.t('maximize_player')}>
						{track.title}
					</MarqueeText>
				}
				subtitle={track.artist}
				subtitleProps={{ numberOfLines: 1 }}
				onPress={handlePress}
				rightElement={rightElement}
				containerStyle={{ backgroundColor: 'transparent' }}
				underlayColor="#E0E0E0"
			/>
			<ProgressBarMini />
		</View>
	);
};

export default MiniPlayer;
