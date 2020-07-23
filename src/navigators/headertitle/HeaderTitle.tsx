import React from 'react';
import { Platform, Text } from 'react-native';

import I18n from '../../../locales';
import { styleSheetFactory, useTheme } from '../../styles/theme';

interface Props {
	language: string;
	title: string;
}

const stylesheet = styleSheetFactory((theme) => ({
	title: {
		color: theme.white,
		fontWeight: 'bold',
		fontSize: 16,
		marginLeft: Platform.OS === 'android' ? 32 : 0,
	},
}));

const HeaderTitle: React.FC<Props> = ({ language, title }) => {
	const { styles } = useTheme(stylesheet);
	return <Text style={styles.title}>{title !== '' ? I18n.t(title, { locale: language }) : ''}</Text>;
};

export default HeaderTitle;
