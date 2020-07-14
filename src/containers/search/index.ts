import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from '../../actions'
import { AppState } from '../../store'

import Search from './Search'
import { getLanguage } from '../../reducers/selectors'


const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
