import I18n from '../../../locales';

import { AUTOPLAY, CHANGE_BITRATE, CHANGE_LANGUAGE, SettingsActionTypes, SettingsState } from './types';

const initialState: SettingsState = {
	language: I18n.locale.substr(0, 2),
	bitRate: '48',
	autoPlay: false,
};

export function settingsReducer(state = initialState, action: SettingsActionTypes): SettingsState {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return {
				...state,
				language: action.language,
			};
		case AUTOPLAY:
			return {
				...state,
				autoPlay: action.autoPlay,
			};
		case CHANGE_BITRATE:
			return {
				...state,
				bitRate: action.bitRate,
			};
		default:
			return state;
	}
}
