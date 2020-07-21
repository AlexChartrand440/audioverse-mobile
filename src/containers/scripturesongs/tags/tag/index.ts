import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadTag } from '../../../../actions'
import List from '../../../../components/list'
import { getTag, getTagPagination } from '../../../../reducers/selectors'
import { AppState } from '../../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getTag(state),
  pagination: getTagPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTag,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
