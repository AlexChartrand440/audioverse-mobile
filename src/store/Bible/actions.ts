import {
	BIBLE_BOOK,
	BIBLE_CHAPTER,
	BIBLE_VERSES,
	BIBLE_VERSION,
	BibleActionTypes,
	BibleState,
	SET_BIBLE_VERSION,
} from './types';

export const setBibleVersion = (version: BibleState['version'], bookId?: string): BibleActionTypes => {
	return {
		type: SET_BIBLE_VERSION,
		version,
		bookId,
	};
};

export const bibleVersion = (version: BibleState['version']): BibleActionTypes => {
	return {
		type: BIBLE_VERSION,
		version,
	};
};

export const bibleBook = (book: BibleState['book']): BibleActionTypes => {
	return {
		type: BIBLE_BOOK,
		book,
	};
};

export const bibleChapter = (chapter: string): BibleActionTypes => {
	return {
		type: BIBLE_CHAPTER,
		chapter,
	};
};

export const bibleVerses = (verses: string): BibleActionTypes => {
	return {
		type: BIBLE_VERSES,
		verses,
	};
};
