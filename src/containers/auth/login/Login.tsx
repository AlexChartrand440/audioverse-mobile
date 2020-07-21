import AsyncStorage from '@react-native-community/async-storage';
import React, { useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	Linking,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import { NavigationInjectedProps } from 'react-navigation';

import logo from '../../../../assets/av-logo-red-gray.png';
import I18n from '../../../../locales';
import { Queries } from '../../../constants';
import * as api from '../../../services';
import { setUser } from '../../../store/user/actions';
import { UserState } from '../../../store/user/types';

interface Props extends NavigationInjectedProps {
	language: string;
	actions: {
		setUser: typeof setUser;
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E9E9EF',
	},
	close: {
		zIndex: 10,
		position: 'absolute',
		left: 10,
		top: 40,
	},
	form: {
		width: 300,
	},
	logo: {
		width: undefined,
		marginBottom: 30,
	},
	inputWrap: {
		flexDirection: 'row',
		marginVertical: 10,
		height: 40,
		backgroundColor: 'transparent',
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
	},
	iconWrap: {
		paddingHorizontal: 7,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#D73352',
	},
	button: {
		backgroundColor: '#D73352',
		paddingVertical: 10,
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	fb: {
		backgroundColor: '#4E64B2',
	},
	buttonText: {
		color: '#FFF',
		fontSize: 16,
	},
	options: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-around',
	},
	forgotPassword: {
		color: '#337AB7',
	},
});

const Login: React.FC<Props> = ({ navigation, language, actions }) => {
	const [signin, setSignin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const passwordRef: any = useRef(null);

	const navigate = () => {
		navigation.navigate('Home');
		if (navigation.state.params && navigation.state.params.screen) {
			navigation.navigate(navigation.state.params.screen);
		}
	};

	const handleClose = async () => {
		await AsyncStorage.setItem('hideLogin', '1');
		navigate();
	};

	const handleChangeTextEmail = (text: string) => {
		setEmail(text);
		setFormValid();
	};

	const handleChangeTextPassword = (text: string) => {
		setPassword(text);
		setFormValid();
	};

	const setFormValid = () => {
		// eslint-disable-next-line no-useless-escape
		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordValidation = signin ? password !== '' : password.length >= 6;
		if (reg.test(email) && passwordValidation) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	};

	const handleSubmitEditingEmail = () => {
		passwordRef.current.focus();
	};

	const handleSignInUp = async () => {
		if (isFormValid) {
			if (signin) {
				signIn();
			} else {
				signUp();
			}
		}
	};

	const loginSocial = async (data: { [key: string]: any }, socialName: string) => {
		const { result } = await api.fetchGraphQLData(
			Queries.loginSocial,
			{
				socialId: data.id,
				socialName: socialName,
				givenName: data.first_name,
				surname: data.last_name,
				email: data.email,
			},
			(results) => ({
				nodes: results.loginSocial,
			})
		);
		if (result && result.authenticatedUser) {
			const user = formatUser(result.authenticatedUser);
			// set user
			actions.setUser(user);
			// firebase analytics
			firebase.analytics().setUserId(user!.userId ? user!.userId.toString() : null);
			firebase.analytics().logEvent('login', { sign_up_method: 'email' });
			// navigate to the main screen
			navigate();
		}
	};

	const handleLoginWithFB = async () => {
		try {
			LoginManager.logOut();
			const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
			if (!result.isCancelled) {
				const infoRequest = new GraphRequest(
					'/me',
					{ parameters: { fields: { string: 'name,email,first_name,last_name' } } },
					(error, result) => {
						if (error) {
							console.log('Error fetching data: ' + error.toString());
						} else {
							console.log('Success fetching data: ', result);
							loginSocial(result || {}, 'Facebook');
						}
					}
				);
				// Start the graph request
				new GraphRequestManager().addRequest(infoRequest).start();
			}
		} catch (err) {
			Toast.show(err);
		}
	};

	const formatUser = (authenticatedUser: any): UserState => {
		const { sessionToken, user } = authenticatedUser;
		const { id: userId } = user;
		return {
			sessionToken,
			userId,
		};
	};

	const signIn = async () => {
		setLoading(true);
		try {
			const { result } = await api.fetchGraphQLData(
				Queries.login,
				{
					email,
					password,
				},
				(results) => ({
					nodes: results.login,
				})
			);
			setLoading(false);
			if (result && result.authenticatedUser) {
				const user = formatUser(result.authenticatedUser);
				// set user
				actions.setUser(user);
				// firebase analytics
				firebase.analytics().setUserId(user!.userId ? user!.userId.toString() : null);
				firebase.analytics().logEvent('login', { sign_up_method: 'email' });
				// navigate to the main screen
				navigate();
			} else {
				Alert.alert(I18n.t('Invalid_username_or_password.'));
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	const signUp = async () => {
		setLoading(true);
		try {
			const { result } = await api.fetchGraphQLData(
				Queries.signup,
				{
					email,
					password,
				},
				(results) => ({
					nodes: results.signup,
				})
			);
			setLoading(false);
			if (result && result.authenticatedUser) {
				// firebase analytics
				firebase.analytics().logEvent('sign_up', { sign_up_method: 'email' });

				const user = formatUser(result.authenticatedUser);
				// set user
				actions.setUser(user);
				// firebase analytics
				firebase.analytics().setUserId(user!.userId ? user!.userId.toString() : null);
				firebase.analytics().logEvent('login', { sign_up_method: 'email' });
				// navigate to the main screen
				navigate();
			} else {
				Alert.alert(I18n.t('Email_exists.'));
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	const handleCreateAccount = () => {
		setSignin(!signin);
		setFormValid();
	};

	const handleForgotPassword = () => {
		Linking.openURL(`https://www.audioverse.org/${language}/registrar/help`).catch((err) => console.error(err));
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="default" animated />
			<Button
				icon={{
					type: 'feather',
					name: 'x-circle',
					size: 30,
				}}
				type="clear"
				containerStyle={styles.close}
				onPress={handleClose}
			/>
			<View style={styles.form}>
				<Image source={logo} style={styles.logo} resizeMode="contain" />
				<View style={styles.inputWrap}>
					<View style={styles.iconWrap}>
						<Icon type="feather" name="user" size={20} color="#FFF" />
					</View>
					<TextInput
						placeholder={I18n.t('Email')}
						value={email}
						onBlur={setFormValid}
						onChangeText={handleChangeTextEmail}
						autoCapitalize="none"
						style={styles.input}
						underlineColorAndroid="transparent"
						keyboardType="email-address"
						onSubmitEditing={handleSubmitEditingEmail}
					/>
				</View>
				<View style={styles.inputWrap}>
					<View style={styles.iconWrap}>
						<Icon type="feather" name="lock" size={20} color="#FFF" />
					</View>
					<TextInput
						placeholder={I18n.t('Password')}
						value={password}
						onBlur={setFormValid}
						onChangeText={handleChangeTextPassword}
						style={styles.input}
						underlineColorAndroid="transparent"
						ref={passwordRef}
						onSubmitEditing={handleSignInUp}
						secureTextEntry
					/>
				</View>
				<TouchableOpacity activeOpacity={isFormValid ? 1 : 0.5} onPress={handleSignInUp}>
					<View style={[styles.button, !isFormValid ? styles.buttonDisabled : {}]}>
						{!loading && <Text style={styles.buttonText}>{I18n.t(signin ? 'Sign_in' : 'Sign_up')}</Text>}
						{loading && <ActivityIndicator color="#FFF" />}
					</View>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.5} onPress={handleLoginWithFB}>
					<View style={[styles.button, styles.fb]}>
						<Text style={styles.buttonText}>{I18n.t(signin ? 'Sign_in_with_facebook' : 'Sign_up_with_facebook')}</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.options}>
					<TouchableOpacity activeOpacity={0.5} onPress={handleCreateAccount}>
						<Text>{I18n.t(signin ? 'Create_account' : 'Sign_in')}</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={handleForgotPassword}>
						<Text style={styles.forgotPassword}>{I18n.t('Forgot_your_password')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Login;
