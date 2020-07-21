import { connect } from 'react-redux';

import { getLanguage } from '../../reducers/selectors';
import { AppState } from '../../store';

import TabBarLabel from './TabBarLabel';

const mapStateToProps = (state: AppState) => ({
	language: getLanguage(state),
});

export default connect(mapStateToProps)(TabBarLabel);
