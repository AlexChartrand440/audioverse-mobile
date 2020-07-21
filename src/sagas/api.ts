import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import { call, put, select } from 'redux-saga/effects';
import RNFetchBlob from 'rn-fetch-blob';

import I18n from '../../locales';
import * as actions from '../actions';
import { ApiActionType } from '../actions';
import { Dirs, Endpoints, Queries } from '../constants';
import * as selectors from '../reducers/selectors';
import * as api from '../services';
import { bibleBook, bibleVerses } from '../store/Bible/actions';
import { BibleState } from '../store/Bible/types';
import { addLocalFiles, removeLocalFiles } from '../store/localFiles/actions';
import { PaginationState } from '../store/paginate';

const BIBLE_AND_BOOKS_DIR =
	Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`;

export const LANGUAGE_MAP = {
	de: 'GERMAN',
	en: 'ENGLISH',
	es: 'SPANISH',
	fr: 'FRENCH',
	ja: 'JAPANESE',
	ru: 'RUSSIAN',
	zh: 'CHINESE',
};

/**
 * Reusable fetch subroutine
 * @param {object} entity
 * @param {function} apiFn
 * @param {string} id
 * @param {string} url
 * @param {boolean} refresh
 */
function* fetchEntity(
	entity: ApiActionType,
	apiFn: (url: string) => void,
	id: string | null,
	url: string,
	refresh: boolean
) {
	yield put(entity.request(id));
	try {
		if (url) {
			const language = yield select(selectors.getLanguage);
			url += `${url.indexOf('?') > -1 ? '&' : '?'}lang=${language}`;
		}
		const response = yield call(apiFn, url || id || '');
		if (refresh) {
			yield put(entity.refresh(id, response));
		} else {
			yield put(entity.success(id, response));
		}
	} catch (e) {
		yield put(entity.failure(id, e.message));
		Toast.show(I18n.t('Unable_to_connect_to_the_server._Try_again_later.'));
	}
}

/**
 * Reusable fetch subroutine
 * @param {object} entity
 * @param {function} apiFn
 */
function* fetchGraphQLEntity(
	entity: ApiActionType,
	apiFn: (query: string, variables: { [key: string]: any }, keyMapper: (results: any) => any) => void,
	keyMapper: (results: any) => any, // Map from a graphql query key to a paginating list
	id: string | null,
	query: string,
	variables: { [key: string]: any },
	refresh: boolean
) {
	yield put(entity.request(id));
	try {
		const language: keyof typeof LANGUAGE_MAP = yield select(selectors.getLanguage);
		const response = yield call(apiFn, query, { ...variables, language: LANGUAGE_MAP[language] }, keyMapper);
		if (refresh) {
			yield put(entity.refresh(id, response));
		} else {
			yield put(entity.success(id, response));
		}
	} catch (e) {
		yield put(entity.failure(id, e.message));
		Toast.show(I18n.t('Unable_to_connect_to_the_server._Try_again_later.'));
	}
}

const fetchBibleBooks = fetchGraphQLEntity.bind(null, actions.bibleBooks, api.fetchGraphQLData, (results) => ({
	nodes: results.audiobible.books,
}));
const fetchBibleChapters = fetchGraphQLEntity.bind(null, actions.bibleChapters, api.fetchGraphQLData, (results) => ({
	nodes: results.audiobible.book.chapters,
}));
const fetchNewRecordings = fetchGraphQLEntity.bind(
	null,
	actions.newRecordings,
	api.fetchGraphQLData,
	(results) => results.sermons
);
const fetchTrendingRecordings = fetchGraphQLEntity.bind(
	null,
	actions.trendingRecordings,
	api.fetchGraphQLData,
	(results) => results.popularRecordings
);
const fetchFeaturedRecordings = fetchGraphQLEntity.bind(
	null,
	actions.featuredRecordings,
	api.fetchGraphQLData,
	(results) => results.featuredRecordings
);
const fetchBooks = fetchGraphQLEntity.bind(null, actions.books, api.fetchGraphQLData, (results) => results.audiobooks);
const fetchBook = fetchGraphQLEntity.bind(null, actions.book, api.fetchGraphQLData, (results) => results.recordings);
const fetchStories = fetchGraphQLEntity.bind(
	null,
	actions.stories,
	api.fetchGraphQLData,
	(results) => results.storySeasons
);
const fetchStory = fetchGraphQLEntity.bind(null, actions.story, api.fetchGraphQLData, (results) => results.stories);
const fetchPresenters = fetchGraphQLEntity.bind(
	null,
	actions.presenters,
	api.fetchGraphQLData,
	(results) => results.presenters
);
const fetchPresenter = fetchGraphQLEntity.bind(
	null,
	actions.presenter,
	api.fetchGraphQLData,
	(results) => results.recordings
);
const fetchConferences = fetchGraphQLEntity.bind(
	null,
	actions.conferences,
	api.fetchGraphQLData,
	(results) => results.conferences
);
const fetchConference = fetchGraphQLEntity.bind(
	null,
	actions.conference,
	api.fetchGraphQLData,
	(results) => results.recordings
);
const fetchSponsors = fetchGraphQLEntity.bind(
	null,
	actions.sponsors,
	api.fetchGraphQLData,
	(results) => results.sponsors
);
const fetchSponsor = fetchGraphQLEntity.bind(
	null,
	actions.sponsor,
	api.fetchGraphQLData,
	(results) => results.recordings
);
const fetchSeries = fetchGraphQLEntity.bind(null, actions.series, api.fetchGraphQLData, (results) => results.serieses);
const fetchSerie = fetchGraphQLEntity.bind(null, actions.serie, api.fetchGraphQLData, (results) => results.recordings);
const fetchTopics = fetchEntity.bind(null, actions.topics, api.fetchData);
const fetchTopic = fetchEntity.bind(null, actions.topic, api.fetchData);
const fetchTagsBooks = fetchGraphQLEntity.bind(
	null,
	actions.tagsBooks,
	api.fetchGraphQLData,
	(results) => results.musicBookTags
);
const fetchTagBook = fetchGraphQLEntity.bind(
	null,
	actions.tagBook,
	api.fetchGraphQLData,
	(results) => results.recordings
);
const fetchTagsAlbums = fetchGraphQLEntity.bind(
	null,
	actions.tagsAlbums,
	api.fetchGraphQLData,
	(results) => results.musicAlbums
);
const fetchTagAlbum = fetchGraphQLEntity.bind(
	null,
	actions.tagAlbum,
	api.fetchGraphQLData,
	(results) => results.recordings
);
const fetchTagsSponsors = fetchGraphQLEntity.bind(
	null,
	actions.tagsSponsors,
	api.fetchGraphQLData,
	(results) => results.sponsors
);
const fetchTagSponsor = fetchGraphQLEntity.bind(
	null,
	actions.tagSponsor,
	api.fetchGraphQLData,
	(results) => results.musicTracks
);
const fetchTags = fetchGraphQLEntity.bind(null, actions.tags, api.fetchGraphQLData, (results) => results.musicMoodTags);
const fetchTag = fetchGraphQLEntity.bind(null, actions.tag, api.fetchGraphQLData, (results) => results.musicTracks);

/**
 * Reusable fetch data subroutine
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {object} pagination
 * @param {function} fetchFn
 * @param {string}  url
 */
function* fetchData(
	loadMore = false,
	refresh = false,
	pagination: PaginationState,
	fetchFn: typeof fetchTopics,
	url: string
) {
	console.log('ACTION....', loadMore, refresh);
	if (!pagination || !pagination.pageCount || loadMore || refresh) {
		const nextAfterCursor = refresh ? null : pagination.nextAfterCursor;
		const response = yield call(fetchFn, null, nextAfterCursor || url, refresh);
	}
}

/**
 * Reusable fetch data subroutine
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {object} pagination
 * @param {function} fetchFn
 * @param {string}  url
 */
function* fetchDataGraphQL(
	loadMore = false,
	refresh = false,
	pagination: PaginationState | undefined,
	fetchFn: typeof fetchNewRecordings,
	query: string,
	variables: { [key: string]: any } = {}
) {
	console.log('ACTION GraphQL....', loadMore, refresh);
	if (!pagination || !pagination.pageCount || loadMore || refresh) {
		const nextAfterCursor = refresh ? null : pagination ? pagination.nextAfterCursor : null;
		const response = yield call(fetchFn, null, query, { ...variables, afterCursor: nextAfterCursor }, refresh);
	}
}

interface LoadAction {
	type: string;
	loadMore?: boolean;
	refresh?: boolean;
	url?: string;
}

interface LoadSingleAction {
	type: string;
	loadMore: boolean;
	refresh: boolean;
	url: string; // TODO: rename this since it's no longer just URLs
}

interface LoadBibleChaptersAction {
	type: string;
	loadMore: boolean;
	refresh: boolean;
	book: BibleState['book'];
}

interface LoadBookAction {
	type: string;
	loadMore: boolean;
	refresh: boolean;
	url: string;
	id: string;
}

/**
 * Load Bible books
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadBibleBooks({ loadMore, refresh }: LoadAction) {
	if (!loadMore && !refresh) {
		yield put(actions.bibleBooks.refresh(null, { result: [] }));
	}
	const { version } = yield select(selectors.getBible);
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}__books.json`;
	const exists = yield RNFetchBlob.fs.exists(file);
	console.log('exists', exists);
	if (refresh || !exists) {
		const pagination = yield select(selectors.getBibleBooksPagination);
		yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchBibleBooks, Queries.audiobible, {
			id: version.id,
		});
		// write to file system
		const bibleBooksPagination = yield select(selectors.getBibleBooksPagination);
		const data = JSON.stringify(bibleBooksPagination.data);
		yield RNFetchBlob.fs.writeFile(file, data);
	} else {
		const data = yield RNFetchBlob.fs.readFile(file, 'utf8');
		const result = JSON.parse(data);
		yield put(actions.bibleBooks.success(null, { result }));
	}
}

/**
 * Load Bible chapters
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {string}  book
 */
export function* loadBibleChapters({ loadMore, refresh, book }: LoadBibleChaptersAction) {
	if (!loadMore && !refresh) {
		yield put(actions.bibleChapters.refresh(null, { result: [] }));
	}
	yield put(bibleBook(book));
	const { version } = yield select(selectors.getBible);
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.id}__chapters.json`;
	const exists = yield RNFetchBlob.fs.exists(file);
	console.log('exists', exists);
	if (refresh || !exists) {
		const pagination = yield select(selectors.getBibleChaptersPagination);
		yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchBibleChapters, Queries.audiobibleChapters, {
			id: version.id,
			bookId: book.id,
		});
		// write to file system
		const bibleChaptersPagination = yield select(selectors.getBibleChaptersPagination);
		const data = JSON.stringify(bibleChaptersPagination.data);
		yield RNFetchBlob.fs.writeFile(file, data);
	} else {
		const data = yield RNFetchBlob.fs.readFile(file, 'utf8');
		yield put(actions.bibleChapters.success(null, { result: JSON.parse(data) }));
	}

	const items = yield select(selectors.getBibleChapters);
	const ids = [];
	for (const item of items) {
		const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${encodeURIComponent(item.fileName)}`;
		const exists = yield call(RNFetchBlob.fs.exists, file);
		if (exists) {
			ids.push(item.id);
		}
	}
	if (ids.length) {
		yield put(addLocalFiles(ids));
	}
}

/**
 * Remove local Bible chapter
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* removeLocalBibleChapter({ item }: { [key: string]: any }) {
	// remove mp3 file
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${encodeURIComponent(item.fileName)}`;
	const exists = yield call(RNFetchBlob.fs.exists, file);
	if (exists) {
		try {
			yield call(RNFetchBlob.fs.unlink, file);
		} catch (err) {
			console.log(err);
		}
	}

	// remove data file
	const { version, book } = yield select(selectors.getBible);
	const dataFile = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.id}_chapter_${item.id}.json`;
	const dataExists = yield call(RNFetchBlob.fs.exists, dataFile);
	if (dataExists) {
		try {
			yield call(RNFetchBlob.fs.unlink, dataFile);
		} catch (err) {
			console.log(err);
		}
	}

	yield put(removeLocalFiles(item.id));
}

/**
 * Load verses
 */
export function* loadBibleVerses() {
	const { version, book, chapter } = yield select(selectors.getBible);
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.id}_chapter_${chapter}.json`;
	const exists = yield RNFetchBlob.fs.exists(file);
	console.log('exists', exists);
	if (!exists) {
		const { result: data } = yield call(
			api.fetchGraphQLData,
			Queries.audiobibleChapterText,
			{ id: version.id, bookId: book.id, chapterId: chapter },
			(results) => ({ nodes: results.audiobible.book.chapter.text })
		);
		yield put(bibleVerses(data));
		yield RNFetchBlob.fs.writeFile(file, data);
	} else {
		let data = yield RNFetchBlob.fs.readFile(file, 'utf8');
		// the previous version of the old app stringified the data before saving it
		// so we need to parse it
		if (data.charAt(0) === '"') {
			data = JSON.parse(data);
		}
		yield put(bibleVerses(data));
	}
}

/**
 * Load new recordings
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadNewRecordings({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getNewRecordingsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchNewRecordings, Queries.newRecordings);
}

/**
 * Load trending recordings
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTrendingRecordings({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTrendingRecordingsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTrendingRecordings, Queries.trendingRecordings);
}

/**
 * Load featured recordings
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadFeaturedRecordings({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getFeaturedRecordingsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchFeaturedRecordings, Queries.featuredRecordings);
}

/**
 * Load books
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadBooks({ loadMore, refresh }: LoadAction) {
	const language = yield select(selectors.getLanguage);
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/audiobooks_${language}`;
	const exists = yield RNFetchBlob.fs.exists(file);
	console.log('exists', exists);
	if (refresh || !exists) {
		const pagination = yield select(selectors.getBooksPagination);
		yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchBooks, Queries.audiobooks);
		// write to file system
		const booksPagination = yield select(selectors.getBooksPagination);
		// backwards compat the data should be in a result property
		const data = JSON.stringify({ result: booksPagination.data });
		yield RNFetchBlob.fs.writeFile(file, data);
	} else if (!loadMore) {
		let data = yield RNFetchBlob.fs.readFile(file, 'utf8');
		data = JSON.parse(data).result;
		yield put(actions.books.success(null, { result: data }));
	}
}

/**
 * Load book
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadBook({ loadMore, refresh, url: sequenceId }: LoadBookAction) {
	if (!loadMore && !refresh) {
		yield put(actions.book.refresh(null, { result: [] }));
	}
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/audiobookRecording_${sequenceId}`;
	const exists = yield RNFetchBlob.fs.exists(file);
	console.log('exists', exists);
	if (refresh || !exists) {
		const pagination = yield select(selectors.getBookPagination);
		yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchBook, Queries.audiobookRecordings, { sequenceId });
		// write to file system
		const bookPagination = yield select(selectors.getBookPagination);
		// backwards compat the data should be in a result property
		const data = JSON.stringify({ result: bookPagination.data });
		yield RNFetchBlob.fs.writeFile(file, data);
	} else {
		let data = yield RNFetchBlob.fs.readFile(file, 'utf8');
		data = JSON.parse(data).result;
		yield put(actions.book.success(null, { result: data }));
	}

	const items = yield select(selectors.getBook);
	const ids = [];
	for (const item of items) {
		const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/${encodeURIComponent(item.mediaFiles[0].filename)}`;
		const exists = yield call(RNFetchBlob.fs.exists, file);
		if (exists) {
			ids.push(item.id);
		}
	}
	if (ids.length) {
		yield put(addLocalFiles(ids));
	}
}

/**
 * Remove local chapter
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* removeLocalChapter({ item }: { [key: string]: any }) {
	const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/${encodeURIComponent(item.mediaFiles[0].filename)}`;
	const exists = yield call(RNFetchBlob.fs.exists, file);
	if (exists) {
		try {
			yield call(RNFetchBlob.fs.unlink, file);
		} catch (err) {
			console.log(err);
		}
	}
	yield put(removeLocalFiles(item.id));
}

/**
 * Load stories
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadStories({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getStoriesPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchStories, Queries.storySeasons);
}

/**
 * Load story
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadStory({ loadMore, refresh, url: sequenceId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.story.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getStoryPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchStory, Queries.stories, { sequenceId });
}

/**
 * Load presenters
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadPresenters({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getPresentersPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchPresenters, Queries.presenters);
}

/**
 * Load presenter
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadPresenter({ loadMore, refresh, url: presenterId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.presenter.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getPresenterPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchPresenter, Queries.presenterRecordings, {
		presenterId,
	});
}

/**
 * Load conferences
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadConferences({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getConferencesPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchConferences, Queries.conferences);
}

/**
 * Load conference
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadConference({ loadMore, refresh, url: collectionId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.conference.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getConferencePagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchConference, Queries.collectionRecordings, {
		collectionId,
	});
}

/**
 * Load sponsors
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadSponsors({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getSponsorsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchSponsors, Queries.sponsors);
}

/**
 * Load sponsor
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadSponsor({ loadMore, refresh, url: sponsorId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.sponsor.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getSponsorPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchSponsor, Queries.sponsorRecordings, { sponsorId });
}

/**
 * Load series
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadSeries({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getSeriesPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchSeries, Queries.serieses);
}

/**
 * Load serie
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadSerie({ loadMore, refresh, url: sequenceId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.serie.refresh(null, { result: [] }));
	}
	console.log({ sequenceId });
	const pagination = yield select(selectors.getSeriePagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchSerie, Queries.sequenceRecordings, { sequenceId });
}

/**
 * Load topics
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTopics({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTopicsPagination);
	yield call(fetchData, loadMore, refresh, pagination, fetchTopics, Endpoints.topics);
}

/**
 * Load topic
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTopic({ loadMore, refresh, url }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.topic.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getTopicPagination);
	yield call(fetchData, loadMore, refresh, pagination, fetchTopic, url);
}

/**
 * Load tags books
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTagsBooks({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTagsBooksPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagsBooks, Queries.musicBookTags);
}

/**
 * Load tag book
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagBook({ loadMore, refresh, url: tagName }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.tagBook.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getTagBookPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagBook, Queries.tagRecordings, { tagName });
}

/**
 * Load tags albums
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTagsAlbums({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTagsAlbumsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagsAlbums, Queries.musicAlbums);
}

/**
 * Load tag album
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagAlbum({ loadMore, refresh, url: sequenceId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.tagAlbum.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getTagAlbumPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagAlbum, Queries.musicAlbumRecordings, {
		sequenceId,
	});
}

/**
 * Load tags sponsors
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTagsSponsors({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTagsSponsorsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagsSponsors, Queries.sponsorsWithMusic);
}

/**
 * Load tag sponsor
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagSponsor({ loadMore, refresh, url: sponsorId }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.tagSponsor.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getTagSponsorPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTagSponsor, Queries.musicTracks, { sponsorId });
}

/**
 * Load tags
 * @param {boolean} loadMore
 * @param {boolean} refresh
 */
export function* loadTags({ loadMore, refresh }: LoadAction) {
	const pagination = yield select(selectors.getTagsPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTags, Queries.musicMoodTags);
}

/**
 * Load tag
 * @param {boolean} loadMore
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTag({ loadMore, refresh, url: tagName }: LoadSingleAction) {
	if (!loadMore && !refresh) {
		yield put(actions.tag.refresh(null, { result: [] }));
	}
	const pagination = yield select(selectors.getTagPagination);
	yield call(fetchDataGraphQL, loadMore, refresh, pagination, fetchTag, Queries.musicTagRecordings, { tagName });
}
