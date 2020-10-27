import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import { Track } from 'react-native-track-player';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import RNFetchBlob from 'rn-fetch-blob';

import * as ActionTypes from '../actions';
import { ContentTypes, Dirs } from '../constants';

import { BibleReducer as bible } from './Bible/reducers';
import customCreateMigrate from './customCreateMigrate';
import { downloadsQueueReducer as downloadsQueue } from './downloadsQueue/reducers';
import { listsReducer as lists } from './lists/reducers';
import { localFilesReducer as localFiles } from './localFiles/reducers';
import paginate from './paginate';
import { playbackReducer as playback } from './playback/reducers';
import { settingsReducer as settings } from './settings/reducers';
import { userReducer as user } from './user/reducers';

const rootReducer = combineReducers({
	settings,
	playback,
	bible,
	user,
	localFiles,
	lists,
	downloadsQueue,
	bibleBooks: paginate({
		types: [
			ActionTypes.BIBLE_BOOKS.REQUEST,
			ActionTypes.BIBLE_BOOKS.SUCCESS,
			ActionTypes.BIBLE_BOOKS.REFRESH,
			ActionTypes.BIBLE_BOOKS.FAILURE,
		],
	}),
	bibleChapters: paginate({
		types: [
			ActionTypes.BIBLE_CHAPTERS.REQUEST,
			ActionTypes.BIBLE_CHAPTERS.SUCCESS,
			ActionTypes.BIBLE_CHAPTERS.REFRESH,
			ActionTypes.BIBLE_CHAPTERS.FAILURE,
		],
	}),
	newRecordings: paginate({
		types: [
			ActionTypes.NEW_RECORDINGS.REQUEST,
			ActionTypes.NEW_RECORDINGS.SUCCESS,
			ActionTypes.NEW_RECORDINGS.REFRESH,
			ActionTypes.NEW_RECORDINGS.FAILURE,
		],
	}),
	trendingRecordings: paginate({
		types: [
			ActionTypes.TRENDING_RECORDINGS.REQUEST,
			ActionTypes.TRENDING_RECORDINGS.SUCCESS,
			ActionTypes.TRENDING_RECORDINGS.REFRESH,
			ActionTypes.TRENDING_RECORDINGS.FAILURE,
		],
	}),
	featuredRecordings: paginate(
		{
			types: [
				ActionTypes.FEATURED_RECORDINGS.REQUEST,
				ActionTypes.FEATURED_RECORDINGS.SUCCESS,
				ActionTypes.FEATURED_RECORDINGS.REFRESH,
				ActionTypes.FEATURED_RECORDINGS.FAILURE,
			],
		},
		true
	),
	books: paginate({
		types: [ActionTypes.BOOKS.REQUEST, ActionTypes.BOOKS.SUCCESS, ActionTypes.BOOKS.REFRESH, ActionTypes.BOOKS.FAILURE],
	}),
	book: paginate({
		types: [ActionTypes.BOOK.REQUEST, ActionTypes.BOOK.SUCCESS, ActionTypes.BOOK.REFRESH, ActionTypes.BOOK.FAILURE],
	}),
	stories: paginate({
		types: [
			ActionTypes.STORIES.REQUEST,
			ActionTypes.STORIES.SUCCESS,
			ActionTypes.STORIES.REFRESH,
			ActionTypes.STORIES.FAILURE,
		],
	}),
	story: paginate({
		types: [ActionTypes.STORY.REQUEST, ActionTypes.STORY.SUCCESS, ActionTypes.STORY.REFRESH, ActionTypes.STORY.FAILURE],
	}),
	presenters: paginate({
		types: [
			ActionTypes.PRESENTERS.REQUEST,
			ActionTypes.PRESENTERS.SUCCESS,
			ActionTypes.PRESENTERS.REFRESH,
			ActionTypes.PRESENTERS.FAILURE,
		],
	}),
	presenter: paginate({
		types: [
			ActionTypes.PRESENTER.REQUEST,
			ActionTypes.PRESENTER.SUCCESS,
			ActionTypes.PRESENTER.REFRESH,
			ActionTypes.PRESENTER.FAILURE,
		],
	}),
	conferences: paginate({
		types: [
			ActionTypes.CONFERENCES.REQUEST,
			ActionTypes.CONFERENCES.SUCCESS,
			ActionTypes.CONFERENCES.REFRESH,
			ActionTypes.CONFERENCES.FAILURE,
		],
	}),
	conference: paginate({
		types: [
			ActionTypes.CONFERENCE.REQUEST,
			ActionTypes.CONFERENCE.SUCCESS,
			ActionTypes.CONFERENCE.REFRESH,
			ActionTypes.CONFERENCE.FAILURE,
		],
	}),
	sponsors: paginate({
		types: [
			ActionTypes.SPONSORS.REQUEST,
			ActionTypes.SPONSORS.SUCCESS,
			ActionTypes.SPONSORS.REFRESH,
			ActionTypes.SPONSORS.FAILURE,
		],
	}),
	sponsor: paginate({
		types: [
			ActionTypes.SPONSOR.REQUEST,
			ActionTypes.SPONSOR.SUCCESS,
			ActionTypes.SPONSOR.REFRESH,
			ActionTypes.SPONSOR.FAILURE,
		],
	}),
	series: paginate({
		types: [
			ActionTypes.SERIES.REQUEST,
			ActionTypes.SERIES.SUCCESS,
			ActionTypes.SERIES.REFRESH,
			ActionTypes.SERIES.FAILURE,
		],
	}),
	serie: paginate({
		types: [ActionTypes.SERIE.REQUEST, ActionTypes.SERIE.SUCCESS, ActionTypes.SERIE.REFRESH, ActionTypes.SERIE.FAILURE],
	}),
	topics: paginate({
		types: [
			ActionTypes.TOPICS.REQUEST,
			ActionTypes.TOPICS.SUCCESS,
			ActionTypes.TOPICS.REFRESH,
			ActionTypes.TOPICS.FAILURE,
		],
	}),
	topic: paginate({
		types: [ActionTypes.TOPIC.REQUEST, ActionTypes.TOPIC.SUCCESS, ActionTypes.TOPIC.REFRESH, ActionTypes.TOPIC.FAILURE],
	}),
	tagsBooks: paginate({
		types: [
			ActionTypes.TAGS_BOOKS.REQUEST,
			ActionTypes.TAGS_BOOKS.SUCCESS,
			ActionTypes.TAGS_BOOKS.REFRESH,
			ActionTypes.TAGS_BOOKS.FAILURE,
		],
	}),
	tagBook: paginate({
		types: [
			ActionTypes.TAG_BOOK.REQUEST,
			ActionTypes.TAG_BOOK.SUCCESS,
			ActionTypes.TAG_BOOK.REFRESH,
			ActionTypes.TAG_BOOK.FAILURE,
		],
	}),
	tagsAlbums: paginate({
		types: [
			ActionTypes.TAGS_ALBUMS.REQUEST,
			ActionTypes.TAGS_ALBUMS.SUCCESS,
			ActionTypes.TAGS_ALBUMS.REFRESH,
			ActionTypes.TAGS_ALBUMS.FAILURE,
		],
	}),
	tagAlbum: paginate({
		types: [
			ActionTypes.TAG_ALBUM.REQUEST,
			ActionTypes.TAG_ALBUM.SUCCESS,
			ActionTypes.TAG_ALBUM.REFRESH,
			ActionTypes.TAG_ALBUM.FAILURE,
		],
	}),
	tagsSponsors: paginate({
		types: [
			ActionTypes.TAGS_SPONSORS.REQUEST,
			ActionTypes.TAGS_SPONSORS.SUCCESS,
			ActionTypes.TAGS_SPONSORS.REFRESH,
			ActionTypes.TAGS_SPONSORS.FAILURE,
		],
	}),
	tagSponsor: paginate({
		types: [
			ActionTypes.TAG_SPONSOR.REQUEST,
			ActionTypes.TAG_SPONSOR.SUCCESS,
			ActionTypes.TAG_SPONSOR.REFRESH,
			ActionTypes.TAG_SPONSOR.FAILURE,
		],
	}),
	tags: paginate({
		types: [ActionTypes.TAGS.REQUEST, ActionTypes.TAGS.SUCCESS, ActionTypes.TAGS.REFRESH, ActionTypes.TAGS.FAILURE],
	}),
	tag: paginate({
		types: [ActionTypes.TAG.REQUEST, ActionTypes.TAG.SUCCESS, ActionTypes.TAG.REFRESH, ActionTypes.TAG.FAILURE],
	}),
});

export type AppState = ReturnType<typeof rootReducer>;

const migrations: any = {
	1: async (state: { [key: string]: any }) => {
		// migration to add contentType since it was not coming on the API before
		const lists = Object.keys(state.lists).reduce((acc, curr) => {
			if (state.lists[curr] === 'playlists') {
				acc[curr] = state.lists[curr];
			} else {
				acc[curr] = state.lists[curr].map((el: {}) => ({
					...el,
					contentType: ContentTypes.sermon,
				}));
			}
			return acc;
		}, {} as { [key: string]: any });

		return {
			...state,
			playback: {
				...state.playback,
				tracks: state.playback.tracks.map((el: Track) => ({
					...el,
					contentType: (ContentTypes as any)[el.mediaType],
				})),
			},
			lists: lists,
		};
	},
	2: async (state: { [key: string]: any }) => {
		// change the default bitRate
		return {
			...state,
			settings: {
				...state.settings,
				bitRate: '48',
			},
		};
	},
	3: async (state: { [key: string]: any }) => {
		// Clear out pre-graphql data
		/**
		 * The files cached here don't have the same data shape as the new graphql responses
		 */
		const BIBLE_AND_BOOKS_DIR =
			Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`;
		for (const folder of [Dirs.bible, Dirs.audiobooks]) {
			const currentFolder = `${BIBLE_AND_BOOKS_DIR}/${folder}/`;
			if (!(await RNFetchBlob.fs.isDir(currentFolder))) {
				continue;
			}
			const files = await RNFetchBlob.fs.ls(currentFolder);
			for (const filename of files) {
				if (filename.split('.').pop() === 'mp3') {
					continue;
				}
				await RNFetchBlob.fs.unlink(`${currentFolder}/${filename}`);
			}
		}
		return { ...state, bible: undefined, presenters: undefined };
	},
	4: async (state: { [key: string]: any }) => {
		// reformat pre-graphql download data
		const oldDownloads = state.lists && state.lists.downloads ? state.lists.downloads : [];
		const downloads = oldDownloads.map((d: any) => ({
			...d,
			description: d.description && !d.description.includes('<') ? `<p>${d.description}</p>` : d.description,
			collection:
				(d.conference && d.conference.length !== undefined ? d.conference.pop() : d.conference) || d.collection,
			sequence: (d.series && d.series.length !== undefined ? d.series.pop() : d.series) || d.sequence,
			sponsor: d.sponsor && d.sponsor.length !== undefined ? d.sponsor.pop() : d.sponsor,
		}));
		return {
			...state,
			lists: {
				...state.lists,
				downloads,
			},
		};
	},
	5: async (state: { [key: string]: any }) => {
		// Clear out incorrectly cached audiobook recordings
		const BIBLE_AND_BOOKS_DIR =
			Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`;
		const folder = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/`;
		if (await RNFetchBlob.fs.isDir(folder)) {
			const files = await RNFetchBlob.fs.ls(folder);
			console.log('audiobook files', files);
			for (const filename of files) {
				if (filename.includes('audiobookRecording_')) {
					await RNFetchBlob.fs.unlink(`${folder}/${filename}`);
				}
			}
		}
		return state;
	},
};

// persist reducer
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['settings', 'playback', 'bible', 'user', 'lists', 'presenters'],
	timeout: 0, // disable timeout https://github.com/rt2zz/redux-persist/issues/717
	version: 5,
	migrate: customCreateMigrate(migrations, {
		debug: true,
		asyncMigrations: true,
	}),
};

export default persistReducer(persistConfig, rootReducer);
