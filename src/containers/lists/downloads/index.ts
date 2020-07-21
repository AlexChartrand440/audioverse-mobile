import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { removeDownload, resetAndPlayTrack } from '../../../actions';
import { getDownloads } from '../../../reducers/selectors';
import { AppState } from '../../../store';

import Downloads from './Downloads';

const mapStateToProps = (state: AppState) => ({
	items: getDownloads(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			resetAndPlayTrack,
			remove: removeDownload,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
