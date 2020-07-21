import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { download } from '../../actions'
import { getBook } from '../../reducers/selectors'
import { AppState } from '../../store'
import { addLocalFiles } from '../../store/localFiles/actions'

import HeaderRightBook from './HeaderRightBook'

const mapStateToProps = (state: AppState) => ({
  items: getBook(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    download,
    addLocalFiles,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBook)
