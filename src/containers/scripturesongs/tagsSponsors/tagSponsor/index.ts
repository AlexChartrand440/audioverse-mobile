import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadTagSponsor } from '../../../../actions'
import List from '../../../../components/list'
import { getTagSponsor, getTagSponsorPagination } from '../../../../reducers/selectors'
import { AppState } from '../../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getTagSponsor(state),
  pagination: getTagSponsorPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagSponsor,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
