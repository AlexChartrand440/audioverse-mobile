import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { resetAndPlayTrack } from '../../actions'
import { getBible } from '../../reducers/selectors'
import { AppState } from '../../store'
import { setBibleVersion } from '../../store/Bible/actions'

import HeaderRightBibleVerses from './HeaderRightBibleVerses'

const mapStateToProps = (state: AppState) => ({
  bible: getBible(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    setBibleVersion,
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBibleVerses)
