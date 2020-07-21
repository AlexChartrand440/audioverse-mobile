import { Track } from 'react-native-track-player';
import { all, call, put, select } from 'redux-saga/effects';

import { Queries } from '../constants';
import * as selectors from '../reducers/selectors';
import * as api from '../services';
import { addPlaylistsItems, removePlaylistsItems, setPlaylistsItems } from '../store/lists/actions';
import { UserState } from '../store/user/types';
import { netInfoIsConnected } from '../utils';

function* syncLocalToServer(user: UserState, playlistId: string) {
	const local: Track[] = yield select(selectors.getLocalPlaylistItems, playlistId);
	yield all(
		local.map((el) =>
			call(
				api.fetchGraphQLData,
				Queries.playlistRecordingAdd,
				{ playlistId, recordingId: el.id },
				(results) => ({ nodes: results.playlistRecordingAdd }),
				user
			)
		)
	);
}

function* syncDeletedToServer(user: UserState, playlistId: string) {
	const deleted: Track[] = yield select(selectors.getDeletedPlaylistItems, playlistId);
	yield all(
		deleted.map((el) =>
			call(
				api.fetchGraphQLData,
				Queries.playlistRecordingRemove,
				{ playlistId, recordingId: el.id },
				(results) => ({ nodes: results.playlistRecordingRemove }),
				user
			)
		)
	);
}

export function* sync({ playlistId }: { type: string; playlistId: string }) {
	const isConnected = yield call(netInfoIsConnected);
	const user: UserState = yield select(selectors.getUser);
	console.log('isConnected', isConnected);
	if (isConnected && user) {
		try {
			// sync local to server
			yield call(syncLocalToServer, user, playlistId);
			// sync deleted to server
			yield call(syncDeletedToServer, user, playlistId);
			// fetch all
			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.userPlaylistItems,
				{ id: playlistId },
				(results) => results.me.user.playlist.recordings,
				user
			);
			// add to the store
			if (result && result.length) {
				const allPlaylistsItems: Track[] = yield select(selectors.getAllPlaylistsItems);
				const otherPlaylistsItems = allPlaylistsItems.filter((el) => el.playlistId !== playlistId);
				const newPlaylistsItems = [
					...otherPlaylistsItems,
					...result.reverse().map((el: Track) => ({
						...el,
						playlistId: playlistId,
					})),
				];
				yield put(setPlaylistsItems(newPlaylistsItems));
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export function* add({ playlistId, item }: { type: string; playlistId: string; item: Track }) {
	item.playlistId = playlistId;
	const isConnected = yield call(netInfoIsConnected);
	if (isConnected) {
		try {
			const user: UserState = yield select(selectors.getUser);
			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.playlistRecordingAdd,
				{ playlistId, recordingId: item.id },
				(results) => results.playlistRecordingAdd,
				user
			);
			if (result) {
				yield put(addPlaylistsItems([item]));
			} else {
				yield call(addLocally, item);
			}
		} catch (e) {
			yield call(addLocally, item);
		}
	} else {
		yield call(addLocally, item);
	}
}

export function* addLocally(item: Track) {
	const playlistItem = {
		...item,
		local: true,
	};
	yield put(addPlaylistsItems([playlistItem]));
}

export function* remove({ playlistId, id }: { type: string; playlistId: string; id: string }) {
	const item = yield select(selectors.getPlaylistItem, playlistId, id);
	if (item.local) {
		// is local
		yield put(removePlaylistsItems(item));
		return;
	}

	const isConnected = yield call(netInfoIsConnected);
	if (isConnected) {
		try {
			const user: UserState = yield select(selectors.getUser);
			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.playlistRecordingRemove,
				{ playlistId, recordingId: id },
				(results) => results.playlistRecordingRemove,
				user
			);
			if (result) {
				yield put(removePlaylistsItems(item));
			} else {
				yield call(markAsRemoved, item.playlistId, item.id);
			}
		} catch (e) {
			yield call(markAsRemoved, item.playlistId, item.id);
		}
	} else {
		yield call(markAsRemoved, item.playlistId, item.id);
	}
}

export function* markAsRemoved(playlistId: string, id: string) {
	let all: Track[] = yield select(selectors.getAllPlaylistsItems);
	all = all.map((el) => {
		if (!(el.playlistId === playlistId && el.id === id)) {
			return el;
		} else {
			return {
				...el,
				deleted: 1,
			};
		}
	});
	yield put(setPlaylistsItems(all));
}
