/**
 * AudioVerse React Native App
 * https://github.com/avorg/audioverse-mobile
 */

import React, { useEffect } from 'react'
import {Linking, StatusBar} from 'react-native'
import { NavigationState, NavigationRoute } from 'react-navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'

import AppNavigator from './src/navigators/AppNavigator'
import NavigationService from './src/utils/navigation-service'
import * as actions from './src/actions'
import { setBibleVersion } from './src/store/Bible/actions'
import { fetchGraphQLData } from "./src/services"
import { Bibles, Queries } from "./src/constants"
import { parseRecording } from "./src/utils"
import { legacyBibleIdsMap } from './src/constants/bibles'

interface Props {
  store: any
  persistor: any
}

export const App: React.FC<Props> = ({ store, persistor }) => {

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL)
    Linking.getInitialURL().then((url) => {
      if (url) {
        openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))

    return function cleanup() {
      Linking.removeEventListener('url', handleOpenURL)
    }
  })

  const handleOpenURL = (event: {url: string}) => {
    openURL(event.url)
  }

  const openURL = async (url: string) => {
    if (url.match("/sermons/recordings/")) { // recording
      const urlMatch = url.match(/\d+/) || []
      const id = urlMatch[0]
      
      const { result } = await fetchGraphQLData(Queries.recording, { id }, (results) => ({ nodes: results.recording}))
      if (result) {
        const item = parseRecording(result)
        store.dispatch(actions.resetAndPlayTrack([item]))
      }
      return
    }
  
    let routeName = ''
    let id = null
    let params = {}
    
    if (url.match("/music/browse")) { // music
      routeName = 'ScriptureSongs'
    } else if (url.match(/audiobibles\/books\/\w+\/\w+\/\w+\/\d+/)) { // Bible
      routeName = 'Chapters'
      const parts = url.split('/')
      const versionId = legacyBibleIdsMap[parts[parts.length - 4] + parts[parts.length - 1]]
      const version = Bibles.find(el => el.id === versionId)
      const bookId = versionId + '-' + parts[parts.length - 2]
      if (version && bookId) {
        store.dispatch(setBibleVersion(version, bookId))
      }
    } else if (url.match("/audiobooks/books/")) { // book
      routeName = 'Book'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
        id,
      }
    } else if (url.match("/audiobooks/books")) { // books
      routeName = 'Books'
    } else if (url.match("/conferences/")) { // conference
      routeName = 'Conference'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
      }
    } else if (url.match("/conferences")) { // conferences
      routeName = 'Conferences'
    } else if (url.match("/presenters/")) { // presenter
      routeName = 'Presenter'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
      }
    } else if (url.match("/presenters")) { // presenters
      routeName = 'Presenters'
    } else if (url.match("/topics/")) { // topic
      routeName = 'Topic'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
      }
    } else if (url.match("/topics")) { // topics
      routeName = 'Topics'
    } else if (url.match("/sponsors/")) { // sponsor
      routeName = 'Sponsor'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
      }
    } else if (url.match("/sponsors")) { // sponsors
      routeName = 'Sponsors'
    } else if (url.match("/seriess/")) { // serie
      routeName = 'Serie'
      const urlMatch = url.match(/\d+/) || []
      id = urlMatch[0]
      params = {
        url: id,
      }
    } else if (url.match("/seriess")) { // series
      routeName = 'Series'
    }
  
    if (routeName !== '') {
      NavigationService.navigate(routeName, params)
    } else {
      Linking.openURL(url).catch(err => console.error(err))
    }
  }

  // callback executed once the persited state has been rehydrated into the redux store
  const onBeforeLift = () => {
    store.dispatch(actions.startup())
  }

  function getActiveRouteName(navigationState: NavigationState): null | string {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index] as NavigationRoute
    // Dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route as NavigationState)
    }
    return route.routeName
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* PersistGate delays the rendering of the UI until the persisted state has been retrieved and saved to redux */}
        <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
          <StatusBar
            backgroundColor="#000000"
            barStyle="light-content"
            animated
          />
          <AppNavigator
            ref={(navigatorRef: any) => { NavigationService.setTopLevelNavigator(navigatorRef) }}
            onNavigationStateChange={(prevState: NavigationState, currentState: NavigationState) => {
              const currentScreen = getActiveRouteName(currentState)
              const prevScreen = getActiveRouteName(prevState)
              if (prevScreen !== currentScreen) {
                firebase.analytics().setCurrentScreen(currentScreen)
              }
            }}
          />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default function(store: any, persistor: any) {
  App.defaultProps = {
    store,
    persistor
  }
  return App
}
