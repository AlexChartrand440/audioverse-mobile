// Derived from https://www.npmjs.com/package/react-native-themed-styles

import { ImageStyle, TextStyle, useColorScheme, ViewStyle } from 'react-native';

type AppearanceProvider<T> = () => T;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

interface StyleSheetData<N extends string, T, S> {
	styles: Record<N, S>;
	themes: Record<N, T>;
	appearanceProvider: AppearanceProvider<N>;
}

interface IUseThemeResult<S, T, N> {
	styles: S;
	theme: T;
	resolvedName: N;
}

export function registerThemes<N extends string, T, R extends N>(
	themes: Record<N, T>,
	appearanceProvider: AppearanceProvider<R>
) {
	return <S extends NamedStyles<S> | NamedStyles<any>>(fn: (theme: T) => S): StyleSheetData<N, T, S> => {
		const styles: any = {};
		for (const [name, theme] of Object.entries(themes)) {
			styles[name] = fn(theme as T);
		}
		return { styles, themes, appearanceProvider };
	};
}

export function useTheme<T, N extends string, S extends NamedStyles<S> | NamedStyles<any>>(
	data: StyleSheetData<N, T, S>,
	name?: N
): IUseThemeResult<S, T, N> {
	const resolvedName = name || data.appearanceProvider();
	const theme = data.themes[resolvedName];
	if (!theme) {
		throw new Error(`Theme not defined: ${resolvedName}`);
	}
	const styles = data.styles[resolvedName];

	return { styles, theme, resolvedName };
}

export const globalColors = {
	brandPrimary: '#BC2102',
	brandPrimaryDark: '#B01F02', // -5 brightness from primary color
	buttonPrimary: '#D73352',
	black: '#000000',
	white: '#ffffff',
	grey100: '#F4F4F4',
	grey200: '#E9E9EF',
	grey250: '#E0E0E0',
	grey300: '',
	grey400: '#DDDDDD',
	grey500: '#CCCCCC',
	grey600: '#888888',
	grey617: '#9E9E9E',
	grey700: '#666666',
	grey800: '#242424',
	grey850: '#212121',
	grey875: '#1A1917',
	grey900: '#181818',
	grey950: '#121212',
	linkColor: '#337AB7',
	facebookBlue: '#4E64B2',
} as const;

export const styleSheetFactory = registerThemes(
	{
		light: {
			...globalColors,
			isDark: false,
			backgroundColor: 'white',
			textColor: 'black',
			primary: globalColors.brandPrimary,
		},
		dark: {
			...globalColors,
			isDark: true,
			backgroundColor: 'black',
			textColor: 'white',
			primary: globalColors.brandPrimaryDark,
		},
	},
	() => {
		const colorScheme = useColorScheme();
		console.log('styles', colorScheme);
		return colorScheme === 'dark' ? 'dark' : 'light';
	}
);
