import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { resetAndPlayTrack } from '../../actions';
import { getHistory, getLanguage } from '../../reducers/selectors';
import { AppState } from '../../store';

import Discover from './Discover';

const mapStateToProps = (state: AppState) => ({
	history: getHistory(state),
	language: getLanguage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			resetAndPlayTrack,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
