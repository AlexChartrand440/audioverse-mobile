import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadFeaturedRecordings } from '../../../actions'
import List from '../../../components/list'
import {
  getFeaturedRecordings,
  getFeaturedRecordingsPagination,
} from '../../../reducers/selectors'
import { AppState } from '../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getFeaturedRecordings(state),
  pagination: getFeaturedRecordingsPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadFeaturedRecordings,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
