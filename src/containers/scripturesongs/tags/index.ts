import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadTags } from '../../../actions'
import List from '../../../components/list'
import { getTags, getTagsPagination } from '../../../reducers/selectors'
import { AppState } from '../../../store'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getTags(state),
  pagination: getTagsPagination(state),
  titleExtractor: (item: Item) => item.name,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Tag',
    params: {
      url: item.name,
      title: item.name,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTags,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
