import React, { useState } from 'react';
import { ActivityIndicator, Platform, useColorScheme, View } from 'react-native';
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
import { styleSheetFactory, useTheme } from '../../styles/theme';
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

const stylesheet = styleSheetFactory((theme) => ({
	container: {
		shadowOpacity: 0.75,
		shadowRadius: 3,
		shadowColor: theme.black,
		shadowOffset: { height: 0, width: 0 },
		elevation: 2,
		backgroundColor: theme.isDark ? theme.grey800 : theme.grey250,
	},
	playPause: {
		paddingLeft: 8,
		paddingRight: 8,
		height: 24,
		width: 24,
		tintColor: theme.isDark ? theme.white : theme.black,
	},
	title: {
		fontSize: Platform.OS === 'ios' ? 17 : 16,
		color: theme.isDark ? theme.white : theme.black,
	},
}));

const MiniPlayer: React.FC<Props> = ({ navigation, track, actions }) => {
	const playbackState = usePlaybackState();
	const [loading, setLoading] = useState(false);
	const { styles } = useTheme(stylesheet);
	const isDarkMode = useColorScheme() === 'dark';

	// on iOS the Media Player library that we are using does not
	// enter the loading state until it has loaded/buffered the mp3 file, however
	// in order to let the user know that the file is being loaded we are
	// using our own loading state, it is set to true when the a track is changed
	// and is set to false when the playback-state change.
	useTrackPlayerEvents([PlayerEvent.PlaybackTrackChanged], () => {
		if (Platform.OS === 'ios') {
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
		<ActivityIndicator size={24} color={isDarkMode ? 'white' : 'black'} />
	) : (
		<ImageButton
			source={playbackState === PlayerState.Playing ? iconPause : iconPlay}
			imageStyle={styles.playPause}
			onPress={actions.playPause}
			accessibilityLabel={I18n.t(playbackState === PlayerState.Playing ? 'pause' : 'play')}
		/>
	);

	return (
		<View style={styles.container}>
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
				onPress={handlePress}
				rightElement={rightElement}
				containerStyle={{ backgroundColor: 'transparent' }}
				underlayColor={styles.container.backgroundColor}
			/>
			<ProgressBarMini />
		</View>
	);
};

export default MiniPlayer;
