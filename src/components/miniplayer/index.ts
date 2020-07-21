import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { playPause } from '../../actions'
import { getCurrentTrack } from '../../reducers/selectors'
import { AppState } from '../../store'

import MiniPlayer from './MiniPlayer'

const  mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    playPause,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)
