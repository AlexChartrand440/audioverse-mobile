import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../store'
import { loadSeries } from '../../actions'
import { getSeries, getSeriesPagination } from '../../reducers/selectors'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getSeries(state),
  pagination: getSeriesPagination(state),
  avatarExtractor: (item: Item) => item.logoImage.url,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Serie',
    params: {
      url: item.id,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSeries,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
