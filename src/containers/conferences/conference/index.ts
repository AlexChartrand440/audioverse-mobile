import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadConference } from '../../../actions';
import List from '../../../components/list';
import { getConference, getConferencePagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

const mapStateToProps = (state: AppState) => ({
	items: getConference(state),
	pagination: getConferencePagination(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadConference,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
