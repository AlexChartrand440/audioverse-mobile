import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { resetAndPlayTrack } from '../../actions'
import { getLanguage } from '../../reducers/selectors'
import { AppState } from '../../store'

import Search from './Search'


const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
