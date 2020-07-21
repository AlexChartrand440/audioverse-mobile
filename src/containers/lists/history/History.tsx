import React from 'react'
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native'
import {
  Button,
  ListItem,
} from 'react-native-elements'
import { Track } from 'react-native-track-player'

import I18n from '../../../../locales'
import {
  resetAndPlayTrack,
} from '../../../actions'
import { removeHistory } from '../../../store/lists/actions'

interface Props {
  items: Track[]
  actions: {
    resetAndPlayTrack: typeof resetAndPlayTrack
    remove: typeof removeHistory
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const History: React.FC<Props> = ({ items, actions }) => {

  const handleRemove = (item: Track) => {
    Alert.alert(
      I18n.t('Are_you_sure_you_want_to_delete_this'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {
          //
        }, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { actions.remove(item) }}
      ]
    )
  }

  const renderItem: ListRenderItem<Track> = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{
          source: item.artwork && item.artwork.toString().startsWith('http') ? 
          { uri: item.artwork } : item.artwork as any
        }}
        title={item.title}
        titleProps={{numberOfLines: 1}}
        subtitle={item.artist}
        onPress={() => actions.resetAndPlayTrack([item])}
        rightElement={<RightElement data={item} onPress={handleRemove} />}
        bottomDivider
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )

}

interface RightElementProps {
  data: Track
  onPress: (data: Track) => void
} 

const RightElement: React.FC<RightElementProps> = ({ data, onPress }) => {
  const _onPress = () => { onPress(data) }
  return (
    <Button
      icon={{
        type: 'feather',
        name: 'x',
        size: 24,
      }}
      buttonStyle={{padding: 0}}
      type="clear"
      onPress={_onPress}
      accessibilityLabel={I18n.t('delete')} />
  )
}

export default History
