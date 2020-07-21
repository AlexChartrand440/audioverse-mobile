import firebase from 'react-native-firebase';
import { Track } from 'react-native-track-player';
import { all, call, put, select } from 'redux-saga/effects';

import { ContentTypes, Queries } from '../constants';
import * as selectors from '../reducers/selectors';
import * as api from '../services';
import { addFavorites, removeFavorites, setFavorites } from '../store/lists/actions';
import { UserState } from '../store/user/types';
import { netInfoIsConnected, typedKeys } from '../utils';

function* syncLocalToServer(user: UserState) {
	const local: Track[] = yield select(selectors.getLocalFavorites);
	yield all(
		local.map((r) =>
			call(api.fetchGraphQLData, Queries.favoriteRecording, { id: r.id }, (results) => ({ nodes: results }), user)
		)
	);
}

function* syncDeletedToServer(user: UserState) {
	const deleted: Track[] = yield select(selectors.getDeletedFavorites);
	yield all(
		deleted.map((r) =>
			call(api.fetchGraphQLData, Queries.unfavoriteRecording, { id: r.id }, (results) => ({ nodes: results }), user)
		)
	);
}

export function* sync() {
	const isConnected = yield call(netInfoIsConnected);
	const user: UserState = yield select(selectors.getUser);
	console.log('isConnected', isConnected);
	if (isConnected && user) {
		try {
			// sync local to server
			yield call(syncLocalToServer, user);
			// sync deleted to server
			yield call(syncDeletedToServer, user);
			// fetch all
			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.userFavoriteRecordings,
				{},
				(results) => results.me.user.favoriteRecordings,
				user
			);
			// add to the store
			if (result && result.length) {
				yield put(setFavorites(result.map((r: any) => ({ ...r, favoriteId: true }))));
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export function* add({ item }: { type: string; item: Track }) {
	const isConnected = yield call(netInfoIsConnected);
	if (isConnected) {
		try {
			const user: UserState = yield select(selectors.getUser);

			const fd = new FormData();
			fd.append('catalogId', item.id);
			fd.append('catalog', 'recording');
			fd.append('userId', user!.userId);
			fd.append('sessionToken', user!.sessionToken);

			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.favoriteRecording,
				{ id: item.id },
				(results) => ({ nodes: results }),
				user
			);
			if (result) {
				yield put(
					addFavorites([
						{
							...item,
							favoriteId: true, // This is the indicator of a favorite that's on the server too
						},
					])
				);
			} else {
				yield put(addFavorites([item]));
			}
		} catch (e) {
			yield put(addFavorites([item]));
		}
	} else {
		yield put(addFavorites([item]));
	}
	// analytics
	firebase.analytics().logEvent('favorite', {
		content_type: typedKeys(ContentTypes).find((key) => ContentTypes[key] === item.contentType),
		item_id: item.id,
		title: item.title,
	});
}

export function* remove({ id }: { type: string; id: string }) {
	const item = yield select(selectors.getFavorite, id);
	if (!item.favoriteId) {
		// is local
		yield put(removeFavorites(item));
		return;
	}

	const isConnected = yield call(netInfoIsConnected);
	if (isConnected) {
		try {
			const user: UserState = yield select(selectors.getUser);
			const { result } = yield call(
				api.fetchGraphQLData,
				Queries.unfavoriteRecording,
				{ id: item.id },
				(results) => ({ nodes: results }),
				user
			);
			if (result) {
				yield put(removeFavorites(item));
			} else {
				yield call(markAsRemoved, item.id);
			}
		} catch (e) {
			yield call(markAsRemoved, item.id);
		}
	} else {
		yield call(markAsRemoved, item.id);
	}
}

export function* markAsRemoved(id: string) {
	let all = yield select(selectors.getAllFavorites);
	all = all.map((el: Track) => {
		if (el.id !== id) {
			return el;
		} else {
			return {
				...el,
				deleted: 1,
			};
		}
	});
	yield put(setFavorites(all));
}
