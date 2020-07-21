import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadSerie } from '../../../actions'
import List from '../../../components/list'
import { getSerie, getSeriePagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSerie,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
