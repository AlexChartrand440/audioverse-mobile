import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { download, loadBook, removeLocalChapter, resetAndPlayTrack } from '../../../actions'
import { getBook, getBookPagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'
import { addLocalFiles } from '../../../store/localFiles/actions'

import Book from './Book'

const mapStateToProps = (state: AppState) => ({
  items: getBook(state),
  pagination: getBookPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBook,
    addLocalFiles,
    removeLocalChapter,
    download,
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
