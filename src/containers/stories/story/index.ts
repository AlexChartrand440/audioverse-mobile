import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadStory } from '../../../actions'
import List from '../../../components/list'
import { getStory, getStoryPagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getStory(state),
  pagination: getStoryPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadStory,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
