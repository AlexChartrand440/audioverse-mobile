import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getDownloadsQueueItems } from '../../reducers/selectors'
import { AppState } from '../../store'
import { removeFromDownloadsQueue } from '../../store/downloadsQueue/actions'

import DownloadsQueue from './DownloadsQueue'

const mapStateToProps = (state: AppState) => ({
  items: getDownloadsQueueItems(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    removeFromDownloadsQueue,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsQueue)
