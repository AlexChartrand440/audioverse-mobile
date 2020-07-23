import React from 'react';
import { View } from 'react-native';
import { useProgress } from 'react-native-track-player';

import { styleSheetFactory, useTheme } from '../../styles/theme';

const stylesheet = styleSheetFactory((theme) => ({
	container: {
		height: 2,
		backgroundColor: theme.primary,
	},
}));

const ProgressBarMini: React.FC = () => {
	const progress = useProgress();
	const { styles } = useTheme(stylesheet);

	return (
		<View
			style={[
				{ width: (progress.duration > 0 ? (progress.position / progress.duration) * 100 : 0) + '%' },
				styles.container,
			]}
		/>
	);
};

export default ProgressBarMini;
