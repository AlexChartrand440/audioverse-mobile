import { connect } from 'react-redux';

import { getLanguage } from '../../reducers/selectors';
import { AppState } from '../../store';

import Menu from './Menu';

const mapStateToProps = (state: AppState) => ({
	language: getLanguage(state),
});

export default connect(mapStateToProps)(Menu);
