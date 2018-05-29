/**
 * AudioVerse React Native App
 * https://github.com/avorg/audioverse-mobile
 * @flow
 */

import React, { PureComponent } from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'

import { setupPlayer, playbackUpdate } from './src/actions'
// react-navigation no redux
import AppNavigator from './src/navigators/AppNavigator'
// react-navigation with redux
// import AppNavigator from './src/navigators/ReduxNavigator'

class App extends PureComponent {
  
  componentDidMount() {
    AppState.addEventListener('change', this._handleStateChange.bind(this))
    this.props.store.dispatch(setupPlayer())
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleStateChange.bind(this))
  }

  _handleStateChange(appState) {
    if (appState == 'active') {
      // update the playback information when the app is back from background mode
      this.props.store.dispatch(playbackUpdate())
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <AppNavigator />
      </Provider>
    )
  }
  
}

export default function(store) {
  App.defaultProps = {
    store: store
  }
  return App
}
