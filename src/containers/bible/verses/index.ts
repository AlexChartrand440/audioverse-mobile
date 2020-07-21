import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadBibleVerses } from '../../../actions';
import { getBible } from '../../../reducers/selectors';
import { AppState } from '../../../store';

import BibleVerses from './BibleVerses';

const mapStateToProps = (state: AppState) => ({
	bible: getBible(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadBibleVerses,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(BibleVerses);
