import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { removePlaylist, syncPlaylists } from '../../../actions';
import { getPlaylists } from '../../../reducers/selectors';
import { AppState } from '../../../store';

import Playlists from './Playlists';

const mapStateToProps = (state: AppState) => ({
	items: getPlaylists(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			sync: syncPlaylists,
			remove: removePlaylist,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
