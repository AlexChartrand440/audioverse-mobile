import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadTagBook } from '../../../../actions';
import List from '../../../../components/list';
import { getTagBook, getTagBookPagination } from '../../../../reducers/selectors';
import { AppState } from '../../../../store';

const mapStateToProps = (state: AppState) => ({
	items: getTagBook(state),
	pagination: getTagBookPagination(state),
	playlist: true,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadTagBook,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
