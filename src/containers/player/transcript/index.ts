import { connect } from 'react-redux'

import { getCurrentTrack } from '../../../reducers/selectors'
import { AppState } from '../../../store'

import Transcript from './Transcript'

const mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
})

export default connect(mapStateToProps)(Transcript)
