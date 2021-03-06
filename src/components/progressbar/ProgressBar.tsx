import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';

import flatDot from '../../../assets/flat_dot.png';
import I18n from '../../../locales';
import { formatTime } from '../../utils';

interface Props {
	rate: number;
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	slider: {
		width: '100%',
		marginBottom: Platform.OS === 'ios' ? -20 : -10,
		zIndex: 10,
	},
	info: {
		backgroundColor: '#E0E0E080',
		width: '100%',
		paddingTop: Platform.OS === 'ios' ? 10 : 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

const ProgressBar: React.FC<Props> = ({ rate }) => {
	const updateInterval = 100;
	/**
	 * At max rate (2x) we need to update the position timestamp every 500msecs. Using 100msec for the
	 * update interval should balance between keeping the timestamp ticking evenly (to the limit of
	 * human perception) and adding too much load to the device.
	 */
	const trackProgress = useProgress(updateInterval);

	const [lastTrackProgress, setLastTrackProgress] = useState(0);
	const [realProgress, setRealProgress] = useState(0);

	const roundedTrackProgress = Math.floor(trackProgress.position);
	if (lastTrackProgress != roundedTrackProgress) {
		setLastTrackProgress(roundedTrackProgress);
		setRealProgress(roundedTrackProgress);
	}

	const handleValueChange = async (value: number) => {
		await TrackPlayer.pause();
		await TrackPlayer.seekTo(value);
		setRealProgress(value);
	};

	const handleSlidingComplete = async () => {
		await TrackPlayer.play();
		// workaround on iOS play/pause resets the playback speed to 1
		// https://github.com/react-native-kit/react-native-track-player/issues/614
		if (Platform.OS === 'ios') {
			if (rate !== 1) {
				await TrackPlayer.setRate(rate);
			}
		}
	};
	const position = formatTime(Math.floor(realProgress));
	const duration = formatTime(Math.floor(trackProgress.duration));

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<Slider
					value={trackProgress.position}
					minimumValue={0}
					maximumValue={trackProgress.duration}
					step={1}
					minimumTrackTintColor="#E53935"
					thumbTintColor="#E53935"
					thumbImage={Platform.OS === 'ios' ? flatDot : null}
					style={styles.slider}
					onValueChange={handleValueChange}
					onSlidingComplete={handleSlidingComplete}
				/>
			</TouchableWithoutFeedback>
			<View style={styles.info}>
				<Text style={{ marginLeft: 10 }} accessibilityLabel={`${I18n.t('current_time')} ${position}`}>
					{position}
				</Text>
				<Text style={{ marginRight: 10 }} accessibilityLabel={`${I18n.t('duration')} ${duration}`}>
					{duration}
				</Text>
			</View>
		</View>
	);
};

export default ProgressBar;
