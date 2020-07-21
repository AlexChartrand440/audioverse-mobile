import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { resetAndPlayTrack } from '../../actions';

import List from './List';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	localActions: bindActionCreators(
		{
			resetAndPlayTrack,
		},
		dispatch
	),
});

export default connect(null, mapDispatchToProps)(List);
