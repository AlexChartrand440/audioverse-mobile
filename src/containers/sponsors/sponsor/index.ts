import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadSponsor } from '../../../actions';
import List from '../../../components/list';
import { getSponsor, getSponsorPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

const mapStateToProps = (state: AppState) => ({
	items: getSponsor(state),
	pagination: getSponsorPagination(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadSponsor,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
