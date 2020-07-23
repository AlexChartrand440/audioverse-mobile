import React, { useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import VideoControls from 'react-native-video-controls';
import { NavigationInjectedProps } from 'react-navigation';

import { styleSheetFactory, useTheme } from '../../styles/theme';

const stylesheet = styleSheetFactory((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.black,
	},
}));

const VideoPlayer: React.FC<NavigationInjectedProps> = ({ navigation }) => {
	const { styles } = useTheme(stylesheet);
	const [paddingTop, setPaddingTop] = useState(0);

	const onLayout = () => {
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
			/>
		</View>
	);
};

export default VideoPlayer;
