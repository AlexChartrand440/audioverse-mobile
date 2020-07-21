import React from 'react';
import { FlatList, Image, Linking, Platform, Share, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import logo from '../../../assets/av-logo-red-gray.png';
import I18n from '../../../locales';
import packageJson from '../../../package.json';

interface Props {
	language: string;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		width: 300,
	},
	logo: {
		width: undefined,
	},
	support: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
	},
});

const handleDonate = () => {
	Linking.openURL('https://donorbox.org/audioverse-give').catch((err) => console.error(err));
};

const handleSubmitTestimony = (language: string) => {
	Linking.openURL(`https://www.audioverse.org/${language}/feedback/testimonial`).catch((err) => console.error(err));
};

const handleShareApp = () => {
	let url = '';
	if (Platform.OS === 'ios') {
		url = 'https://itunes.apple.com/us/app/audioverse/id726998810';
	} else {
		url = 'https://play.google.com/store/apps/details?id=org.audioverse.exodus';
	}
	Share.share({ message: url });
};

const handleRateUs = () => {
	let url = '';
	if (Platform.OS === 'ios') {
		url = 'https://itunes.apple.com/app/id726998810?action=write-review';
	} else {
		url = 'https://play.google.com/store/apps/details?id=org.audioverse.exodus';
	}
	Linking.openURL(url).catch((err) => console.error(err));
};

const handleGitHub = () => {
	Linking.openURL('https://github.com/avorg/audioverse-mobile').catch((err) => console.error(err));
};

const handleFacebook = () => {
	Linking.openURL('https://www.facebook.com/AudioVerse').catch((err) => console.error(err));
};

const handleInstagram = () => {
	Linking.openURL('https://www.instagram.com/audioverse').catch((err) => console.error(err));
};

const About: React.FC<Props> = ({ language }) => {
	const data = [
		{
			title: I18n.t('donate'),
			onPress: handleDonate,
		},
		{
			title: I18n.t('submit_testimony'),
			onPress: handleSubmitTestimony.bind(null, language),
		},
		{
			title: I18n.t('share_app'),
			onPress: handleShareApp,
		},
		{
			title: I18n.t('rate_us'),
			onPress: handleRateUs,
		},
		{
			title: I18n.t('GitHub'),
			onPress: handleGitHub,
		},
		{
			title: I18n.t('Facebook'),
			onPress: handleFacebook,
		},
		{
			title: I18n.t('Instagram'),
			onPress: handleInstagram,
		},
		{
			title: `${I18n.t('version')} ${packageJson.version}`,
		},
	];

	const header = (
		<View>
			<Image source={logo} style={styles.logo} resizeMode="contain" />
			<Text style={styles.support}>{I18n.t('support_av_text')}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<FlatList
					ListHeaderComponent={header}
					data={data}
					keyExtractor={(item) => item.title}
					renderItem={({ item }) => (
						<ListItem title={item.title} onPress={item.onPress} chevron={item.onPress ? true : false} bottomDivider />
					)}
				/>
			</View>
		</View>
	);
};

export default About;
