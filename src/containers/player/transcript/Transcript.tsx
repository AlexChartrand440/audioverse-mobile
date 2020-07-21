import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Track } from 'react-native-track-player';
import { WebView } from 'react-native-webview';

import I18n from '../../../../locales';
import { Queries } from '../../../constants';
import { fetchGraphQLData } from '../../../services';

interface Props {
	track: Track | undefined;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	webView: {
		marginTop: 10,
		marginHorizontal: 10,
	},
});

const Transcript: React.FC<Props> = ({ track }) => {
	const [transcript, setTranscript] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTranscript = async () => {
			const { result } = await fetchGraphQLData(Queries.recordingTranscript, { recordingId: track!.id }, (results) => ({
				nodes: results.recording.transcript,
			}));
			if (result.text) {
				setTranscript(result.text);
			}
			setLoading(false);
		};

		fetchTranscript();
	}, []);

	return (
		<View style={styles.container}>
			{loading && (
				<View style={styles.activityIndicator}>
					<ActivityIndicator size="large" color="#03A9F4" style={{ margin: 50 }} />
				</View>
			)}
			{!loading && (
				<WebView
					style={styles.webView}
					source={{
						html: `<p style="font-size:${
							Platform.OS === 'ios' ? '58' : '29'
						}px;text-align:center">${transcript}<br><br>${I18n.t('note_transcript', {
							email: 'media@audioverse.org',
						})}</p>`,
					}}
				/>
			)}
		</View>
	);
};

export default Transcript;
