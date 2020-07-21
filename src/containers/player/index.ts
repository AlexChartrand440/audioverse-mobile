import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import {
  addFavorite,
  download,
  forward,
  playPause,
  playVideo,
  removeFavorite,
  replay,
  setBitRateAndReset,
  setRate,
  skipToNext,
  skipToPrevious,
} from '../../actions'
import {
  getBitRate,
  getCurrentTrack,
  getLanguage,
  getRate,
  getUser,
  isFavorite,
} from '../../reducers/selectors'
import { AppState } from '../../store'

import Player from './Player'

const  mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
  rate: getRate(state),
  language: getLanguage(state),
  user: getUser(state),
  isFavorite: isFavorite(state),
  bitRate: getBitRate(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    playPause,
    skipToPrevious,
    skipToNext,
    replay,
    forward,
    download,
    setRate,
    addFavorite,
    removeFavorite,
    playVideo,
    setBitRateAndReset,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
