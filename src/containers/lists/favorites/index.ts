import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { removeFavorite, resetAndPlayTrack, syncFavorites } from '../../../actions';
import { getFavorites } from '../../../reducers/selectors';
import { AppState } from '../../../store';

import Favorites from './Favorites';

const mapStateToProps = (state: AppState) => ({
	items: getFavorites(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			resetAndPlayTrack,
			sync: syncFavorites,
			remove: removeFavorite,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
