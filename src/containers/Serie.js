import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/List'
import ListItem from '../components/ListItem'
import MiniPlayer from '../components/MiniPlayer'
import { loadSerie, resetAndPlayTrack } from '../actions'
import { getSerie, getSeriePagination } from '../reducers/selectors'

class Serie extends PureComponent {

  componentDidMount() {
    this.props.load(this.props.navigation.state.params.url)
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.resetAndPlayTrack(this.props.items, item)}
      />
    )
  }
  
  render() {
    const { items, pagination, loadMore, refresh } = this.props
    const url = this.props.navigation.state.params.url

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem.bind(this)} items={items} {...pagination} onEndReached={loadMore.bind(null, url)} onRefresh={refresh.bind(null, url)} />
        <MiniPlayer onPressMetaData={this.handlePressMetaData.bind(this)} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

Serie.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func,
  resetAndPlayTrack: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadSerie(false, false, url)),
  loadMore: (url) => dispatch(loadSerie(true, false, url)),
  refresh: (url) => dispatch(loadSerie(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Serie)
