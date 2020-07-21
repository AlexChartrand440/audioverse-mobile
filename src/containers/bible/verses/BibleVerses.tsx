import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

import {
  loadBibleVerses
} from '../../../actions'
import { BibleState } from '../../../store/Bible/types'

interface Props {
  bible: BibleState
  actions: {
    loadBibleVerses: typeof loadBibleVerses
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const BibleVerses: React.FC<Props> = ({ bible, actions }) => {

  useEffect(() => {
    if (bible.verses === '') {
      actions.loadBibleVerses()
    }
  }, [])

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: bible.verses }} />
    </View>
  )

}

export default BibleVerses
