import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { getLanguage } from '../../../reducers/selectors';
import { AppState } from '../../../store';
import { setUser } from '../../../store/user/actions';

import Login from './Login';
const mapStateToProps = (state: AppState) => ({
	language: getLanguage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			setUser,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
