import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { resetAndPlayTrack } from '../../../actions';
import { getHistory } from '../../../reducers/selectors';
import { AppState } from '../../../store';
import { removeHistory } from '../../../store/lists/actions';

import History from './History';

const mapStateToProps = (state: AppState) => ({
	items: getHistory(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			resetAndPlayTrack,
			remove: removeHistory,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
