import { StyleSheet } from 'react-native';

import image from '../../assets/default.png';

import { globalColors, styleSheetFactory } from './theme';

export const primaryColor = globalColors.brandPrimary;

export const GlobalStyles = StyleSheet.create({
	header: {
		backgroundColor: globalColors.grey950,
		elevation: 0,
		borderBottomWidth: 0,
		shadowOpacity: 0,
	},
	tab: {
		backgroundColor: globalColors.grey950,
	},
	tabIndicator: {
		backgroundColor: globalColors.brandPrimaryDark,
	},
});

export const GlobalStylesheet = styleSheetFactory((theme) => ({
	header: {
		backgroundColor: theme.isDark ? theme.grey950 : theme.brandPrimary,
		elevation: 0,
		borderBottomWidth: 0,
		shadowOpacity: 0,
	},
	tab: {
		backgroundColor: theme.isDark ? theme.grey950 : theme.brandPrimary,
	},
	tabIndicator: {
		backgroundColor: theme.isDark ? theme.brandPrimaryDark : theme.white,
	},
}));

export const headerTintColor = globalColors.white;
export const defaultImage = image;

const htmlTextStyle = {
	fontSize: 18,
	textAlign: 'center',
};
export const HTMLStyles = {
	p: {
		...htmlTextStyle,
		marginBottom: 20,
	},
	div: htmlTextStyle,
	li: {
		fontSize: 20,
	},
};
