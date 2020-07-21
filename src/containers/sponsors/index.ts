import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { loadSponsors } from '../../actions'
import List from '../../components/list'
import { getSponsors, getSponsorsPagination } from '../../reducers/selectors'
import { AppState } from '../../store'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getSponsors(state),
  pagination: getSponsorsPagination(state),
  avatarExtractor: (item: Item) => item.photo86.url,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Sponsor',
    params: {
      url: item.id,
      title: item.title,
      description: item.description,
      image: item.logoImage256 && item.logoImage256.url
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSponsors,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
