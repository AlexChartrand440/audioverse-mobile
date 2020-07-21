import TrackPlayer from 'react-native-track-player';
import { call, put, select } from 'redux-saga/effects';

import ContentTypes from '../constants/contentTypes';
import * as selectors from '../reducers/selectors';
import { bibleVersion } from '../store/Bible/actions';
import { BibleState, SetBibleVersionAction } from '../store/Bible/types';

import * as api from './api';
import * as player from './player';

/**
 * Set Bible version
 */
export function* setBibleVersion({ version, bookId }: SetBibleVersionAction) {
	yield put(bibleVersion(version));
	const bible = yield select(selectors.getBible);
	// refresh books
	yield call(api.loadBibleBooks, { type: '', loadMore: false, refresh: false });

	if (bookId) {
		const books = yield select(selectors.getBibleBooks);
		const book = books.find((el: BibleState['book']) => el.id === bookId);
		if (book) {
			// refresh chapters
			yield call(api.loadBibleChapters, { type: '', loadMore: false, refresh: false, book: book });
		}
	} else {
		// refresh chapters
		yield call(api.loadBibleChapters, { type: '', loadMore: false, refresh: false, book: bible.book });
		const id = yield call(TrackPlayer.getCurrentTrack);
		if (id) {
			const tracks = yield select(selectors.getBibleChapters);
			const currentTrack = yield call(TrackPlayer.getTrack, id);
			const currentChapterNumber =
				currentTrack.contentType === ContentTypes.bible ? currentTrack.id.split('-').pop() : false;
			if (currentChapterNumber) {
				const track = tracks.find((el: { [key: string]: any }) => el.id.split('-').pop() == currentChapterNumber);
				yield call(player.resetAndPlayTrack, { type: '', tracks, id: track.id });
			}
		}
	}
}
