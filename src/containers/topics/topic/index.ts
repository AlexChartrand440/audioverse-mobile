import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadTopic } from '../../../actions';
import List from '../../../components/list';
import { getTopic, getTopicPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

const mapStateToProps = (state: AppState) => ({
	items: getTopic(state),
	pagination: getTopicPagination(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadTopic,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
