import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import VideoControls from 'react-native-video-controls';
import { NavigationInjectedProps } from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});

const VideoPlayer: React.FC<NavigationInjectedProps> = ({ navigation }) => {
	const [paddingTop, setPaddingTop] = useState(0);

	const onLayout = (e: {}) => {
		const { width, height } = Dimensions.get('window');
		if (Platform.OS === 'ios' && height > width) {
			// on iOS when is in portrait mode
			setPaddingTop(12);
		} else {
			setPaddingTop(0);
		}
	};

	return (
		<View style={[styles.container, { paddingTop: paddingTop }]} onLayout={onLayout}>
			<VideoControls
				source={{ uri: navigation.state.params!.uri }}
				onBack={() => {
					navigation.goBack();
				}}
				scrubbing={1}
				ignoreSilentSwitch="ignore"
			/>
		</View>
	);
};

export default VideoPlayer;
