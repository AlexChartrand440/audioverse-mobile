import { Track } from 'react-native-track-player'
import { all, call, put, select } from 'redux-saga/effects'

import { Queries } from '../constants'
import * as selectors from '../reducers/selectors'
import * as api from '../services'
import { addPlaylists, removePlaylists, setPlaylists, setPlaylistsItems } from '../store/lists/actions'
import { UserState } from '../store/user/types'
import { netInfoIsConnected } from '../utils'

import { LANGUAGE_MAP } from './api'

interface Playlist {
  [key: string]: any
}

interface PlaylistsIds {
  [key: string]: any
}

function* syncLocalToServer(user: UserState) {
  const local: Playlist[] = yield select(selectors.getLocalPlaylists)
  yield all(local.map(p => call(api.fetchGraphQLData, Queries.playlistAdd, p, (results) => ({ nodes: results.playlistAdd }), user)))
}

function* syncDeletedToServer(user: UserState) {
  const deleted: Playlist[] = yield select(selectors.getDeletedPlaylists)
  yield all(deleted.map(p => call(api.fetchGraphQLData, Queries.playlistDelete, { id: p.id }, (results) => ({ nodes: results.playlistDelete }), user)))
}

export function* deletePlaylistItems(playlistsIds: PlaylistsIds) {
  const allPlaylistsItems: Track[] = yield select(selectors.getAllPlaylistsItems)
  const playlistsItems = allPlaylistsItems.filter(el => !Object.prototype.hasOwnProperty.call(playlistsIds, el.playlistId))
  yield put(setPlaylistsItems(playlistsItems))
}

export function* sync() {
  const isConnected = yield call(netInfoIsConnected)
  const user = yield select(selectors.getUser)
  console.log('isConnected', isConnected)
  if (isConnected && user) {
    try {
      // sync local to server
      yield call(syncLocalToServer, user)
      // sync deleted to server
      yield call(syncDeletedToServer, user)
      // fetch all
      const language: keyof typeof LANGUAGE_MAP = yield select(selectors.getLanguage);
      const {result} = yield call(api.fetchGraphQLData, Queries.userPlaylists, { language: LANGUAGE_MAP[language] }, (results) => results.me.user.playlists, user)
      // add to the store
      if (result && result.length) {
        yield put(setPlaylists(result))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ item }: { type: string, item: Playlist }) {
  const lang: keyof typeof LANGUAGE_MAP = yield select(selectors.getLanguage)
  const playlist = {
    title: item.title,
    isPublic: !!item.public,
    language: LANGUAGE_MAP[lang]
  }
  
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const {result} = yield call(api.fetchGraphQLData, Queries.playlistAdd, playlist, (results) => ({ nodes: results.playlistAdd }), user)
      if (result) {
        yield put(addPlaylists([result]))
        // TODO: If provided, add item to new playlist
      } else {
        yield call(addLocally, playlist)
      }
    } catch (e) {
      yield call(addLocally, playlist)
    }
  } else {
    yield call(addLocally, playlist)
  }
}

export function* addLocally(item: Playlist) {
  const playlist = {
    ...item,
    id: `${new Date().getTime()}`,
    local: true
  }
  yield put(addPlaylists([playlist]))
}

export function* remove({ item }: { type: string, item: Playlist }) {
  if (item.local) { // is local
    yield put(removePlaylists(item))
    const playlistsIds: PlaylistsIds = {}
    playlistsIds[item.id] = 1
    yield call(deletePlaylistItems, playlistsIds)
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const {result} = yield call(api.fetchGraphQLData, Queries.playlistDelete, { id: item.id }, (results) => ({ nodes: results }), user)
      if (result) {
        yield put(removePlaylists(item))
        const playlistsIds: PlaylistsIds = {}
        playlistsIds[item.id] = 1
        yield call(deletePlaylistItems, playlistsIds)
      } else {
        yield call(markAsRemoved, item.id)
      }
    } catch (e) {
      yield call(markAsRemoved, item.id)
    }
  } else {
    yield call(markAsRemoved, item.id)
  }
}

export function* markAsRemoved(id: string) {
  let all: Playlist[] = yield select(selectors.getAllPlaylists)
  all = all.map(el => {
    if (el.id !== id) {
      return el
    } else {
      return {
        ...el,
        deleted: 1
      }
    }
  })
  yield put(setPlaylists(all))
  const playlistsIds: PlaylistsIds = {}
  playlistsIds[id] = 1
  yield call(deletePlaylistItems, playlistsIds)
}
