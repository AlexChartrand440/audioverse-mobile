import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { UserState } from '../../../store/user/types';

interface Props extends NavigationInjectedProps {
	user: UserState;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E9E9EF',
	},
});

const Loading: React.FC<Props> = ({ navigation, user }) => {
	useEffect(() => {
		const navigate = async () => {
			const hideLogin = await AsyncStorage.getItem('hideLogin');
			navigation.navigate({ routeName: !user && !hideLogin ? 'Login' : 'Home' });
		};

		navigate();
	}, []);

	return (
		<View style={styles.container}>
			<ActivityIndicator />
		</View>
	);
};

export default Loading;
