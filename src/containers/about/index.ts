import { connect } from 'react-redux';

import { getLanguage } from '../../reducers/selectors';
import { AppState } from '../../store';

import About from './About';

const mapStateToProps = (state: AppState) => ({
	language: getLanguage(state),
});

export default connect(mapStateToProps)(About);
