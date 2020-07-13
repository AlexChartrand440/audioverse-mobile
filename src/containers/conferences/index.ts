import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../store'
import { loadConferences } from '../../actions'
import { getConferences, getConferencesPagination } from '../../reducers/selectors'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state),
  avatarExtractor: (item: Item) => item.logoImage.url,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Conference',
    params: {
      url: item.id,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadConferences,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
