import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import HTML from 'react-native-render-html';
import { NavigationInjectedProps } from 'react-navigation';

import { Queries } from '../../../constants';
import { fetchGraphQLData } from '../../../services';

interface Post {
	image: {
		url: string;
	};
	title: string;
	body: string;
}

const { width: viewportWidth } = Dimensions.get('window');

const htmlStyles = {
	p: {
		fontSize: 20,
		marginBottom: 20,
	},
	li: {
		fontSize: 20,
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flex: 1,
	},
	image: {
		width: viewportWidth,
		height: viewportWidth * 0.52,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		marginVertical: 20,
		paddingHorizontal: 20,
	},
	htmlContainer: {
		paddingHorizontal: 20,
	},
});

const Post: React.FC<NavigationInjectedProps> = ({ navigation }) => {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const { params } = navigation.state;
		const fetchPosts = async () => {
			const { result } = await fetchGraphQLData(Queries.blogPost, { id: params!.url }, (results) => ({
				nodes: results.blogPost,
			}));
			if (result) {
				setPost(result);
			}
			setLoading(false);
		};

		fetchPosts();
	}, []);

	const onLinkPress = (event: {}, href: string) => {
		let routeName = '';
		let hrefMatch: any = null;
		let id = null;

		if (href.match('/conferences/')) {
			routeName = 'Conference';
			hrefMatch = href.match(/\d+/);
			id = hrefMatch[0];
		} else if (href.match('/series/') || href.match('/seriess/')) {
			routeName = 'Serie';
			hrefMatch = href.match(/\d+/);
			id = hrefMatch[0];
		} else if (href.match('/sponsors/')) {
			routeName = 'Sponsor';
			hrefMatch = href.match(/\d+/);
			id = hrefMatch[0];
		}

		if (routeName !== '') {
			navigation.navigate({
				routeName: routeName,
				params: {
					id,
					url: id,
				},
			});
		} else {
			Linking.openURL(href).catch((err) => console.error(err));
		}
	};

	return (
		<ScrollView style={styles.container}>
			{loading && (
				<View style={styles.activityIndicator}>
					<ActivityIndicator size="large" color="#03A9F4" style={{ margin: 50 }} />
				</View>
			)}
			{!loading && post && (
				<View style={styles.card}>
					<Image style={styles.image} source={{ uri: post.image.url }} />
					<Text style={styles.title}>{post.title}</Text>
					<HTML
						html={post.body}
						containerStyle={styles.htmlContainer}
						tagsStyles={htmlStyles}
						onLinkPress={onLinkPress}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default Post;
