import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { getAutoPlay, getBitRate, getLanguage, getUser } from '../../reducers/selectors';
import { AppState } from '../../store';
import { changeBitRate, changeLanguage, logOut, setAutoPlay } from '../../store/settings/actions';

import Settings from './Settings';

const mapStateToProps = (state: AppState) => ({
	language: getLanguage(state),
	bitRate: getBitRate(state),
	autoPlay: getAutoPlay(state),
	user: getUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			changeLanguage,
			changeBitRate,
			setAutoPlay,
			logOut,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
