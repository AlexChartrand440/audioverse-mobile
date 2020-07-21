import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadPresenter } from '../../../actions'
import List from '../../../components/list'
import { getPresenter, getPresenterPagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getPresenter(state),
  pagination: getPresenterPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadPresenter,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
