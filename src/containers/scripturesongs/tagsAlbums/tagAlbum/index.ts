import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadTagAlbum } from '../../../../actions'
import List from '../../../../components/list'
import { getTagAlbum, getTagAlbumPagination } from '../../../../reducers/selectors'
import { AppState } from '../../../../store'

const mapStateToProps = (state: AppState) => ({
  items: getTagAlbum(state),
  pagination: getTagAlbumPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagAlbum,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
