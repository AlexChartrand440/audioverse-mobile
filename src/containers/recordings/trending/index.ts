import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadTrendingRecordings } from '../../../actions'
import List from '../../../components/list'
import {
  getTrendingRecordings,
  getTrendingRecordingsPagination,
} from '../../../reducers/selectors'
import { AppState } from '../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTrendingRecordings,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
