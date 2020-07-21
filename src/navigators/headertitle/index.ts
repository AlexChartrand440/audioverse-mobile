import { connect } from 'react-redux'

import { getLanguage } from '../../reducers/selectors'
import { AppState } from '../../store'

import HeaderTitle from './HeaderTitle'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

export default connect(mapStateToProps)(HeaderTitle)
