import React from 'react';
import {
	Dimensions,
	Image,
	ImageSourcePropType,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';

const colors = {
	black: '#1a1917',
	gray: '#888888',
};

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage: number) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const slideHeight = slideWidth * 0.52;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

interface Props {
	data: {
		illustration: ImageSourcePropType;
		title?: string;
		subtitle?: string;
	};
	onPress: () => void;
	even?: boolean;
	parallax?: boolean;
	parallaxProps?: {};
}

const styles = StyleSheet.create({
	slideInnerContainer: {
		width: itemWidth,
		paddingHorizontal: itemHorizontalMargin,
		paddingBottom: 18, // needed for shadow
	},
	shadow: {
		position: 'absolute',
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		backgroundColor: colors.black,
		shadowColor: colors.black,
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius,
	},
	imageContainer: {
		flex: 1,
		width: slideWidth,
		height: slideHeight,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: 'white',
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
	imageContainerNoTitle: {
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius,
	},
	imageContainerEven: {
		backgroundColor: colors.black,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
	// image's border radius is buggy on iOS let's hack it!
	radiusMask: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: entryBorderRadius,
		backgroundColor: 'white',
	},
	radiusMaskEven: {
		backgroundColor: colors.black,
	},
	textContainer: {
		justifyContent: 'center',
		paddingTop: 20 - entryBorderRadius,
		paddingBottom: 20,
		paddingHorizontal: 16,
		backgroundColor: 'white',
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius,
	},
	textContainerEven: {
		backgroundColor: colors.black,
	},
	title: {
		color: colors.black,
		fontSize: 13,
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
	titleEven: {
		color: 'white',
	},
	subtitle: {
		marginTop: 6,
		color: colors.gray,
		fontSize: 12,
		fontStyle: 'italic',
	},
	subtitleEven: {
		color: 'rgba(255, 255, 255, 0.7)',
	},
});

const SliderEntry: React.FC<Props> = ({ data, onPress, even, parallax, parallaxProps }) => {
	const image = () => {
		const { illustration, title } = data;

		return parallax ? (
			<ParallaxImage
				source={illustration}
				containerStyle={[
					styles.imageContainer,
					even ? styles.imageContainerEven : {},
					!title ? styles.imageContainerNoTitle : {},
				]}
				style={styles.image}
				parallaxFactor={0.35}
				showSpinner={true}
				spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
				{...parallaxProps}
			/>
		) : (
			<Image source={illustration} style={styles.image} />
		);
	};

	const { title, subtitle } = data;

	const uppercaseTitle = title ? (
		<Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
			{title.toUpperCase()}
		</Text>
	) : (
		false
	);

	return (
		<TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer} onPress={onPress}>
			<View style={styles.shadow} />
			<View
				style={[
					styles.imageContainer,
					even ? styles.imageContainerEven : {},
					!title ? styles.imageContainerNoTitle : {},
				]}>
				{image()}
				{title && <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />}
			</View>
			{title && (
				<View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
					{uppercaseTitle}
					{subtitle && (
						<Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>
							{subtitle}
						</Text>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
};

export default SliderEntry;
