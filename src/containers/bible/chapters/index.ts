import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import {
  download,
  loadBibleChapters,
  removeLocalBibleChapter,
  resetAndPlayTrack,
} from '../../../actions'
import { getBible, getBibleChapters, getBibleChaptersPagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'
import { bibleChapter } from '../../../store/Bible/actions'
import { addLocalFiles } from '../../../store/localFiles/actions'

import BibleChapters from './BibleChapters'

const mapStateToProps = (state: AppState) => ({
  items: getBibleChapters(state),
  pagination: getBibleChaptersPagination(state),
  bible: getBible(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    bibleChapter,
    loadBibleChapters,
    download,
    addLocalFiles,
    removeLocalBibleChapter,
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleChapters)
