import { connect } from 'react-redux'

import { getUser } from '../../../reducers/selectors'
import { AppState } from '../../../store'

import Loading from './Loading'

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
})

export default connect(mapStateToProps)(Loading)
